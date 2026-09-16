import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.116.0";
import { createMcpHandler, McpServer } from "npm:@modelcontextprotocol/server@2.0.0";
import { z } from "npm:zod@4.3.6";

const CLIENT_SLUG = "cinco-lagos";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const dateSchema = z.string().regex(DATE_RE, "Use YYYY-MM-DD");

function toolResult(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
}

async function getClientId() {
  const { data, error } = await supabase
    .from("clientes")
    .select("id")
    .eq("slug", CLIENT_SLUG)
    .eq("activo", true)
    .single();

  if (error || !data) throw new Error(error?.message || "Cinco Lagos client not found");
  return data.id as string;
}

const handler = createMcpHandler(() => {
  const server = new McpServer({ name: "cinco-lagos-operador", version: "0.1.0" });

  server.registerTool(
    "list_cabins",
    {
      title: "Listar cabañas",
      description:
        "Lista las cabañas activas de Cinco Lagos con tipo, capacidad y precio base. No devuelve datos personales de huéspedes.",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true },
    },
    async () => {
      const clienteId = await getClientId();
      const [{ data: cabins, error: cabinsError }, { data: types, error: typesError }] =
        await Promise.all([
          supabase
            .from("cabins")
            .select("id,cabin_type_id,nombre,codigo,orden")
            .eq("cliente_id", clienteId)
            .eq("activa", true)
            .order("orden", { ascending: true }),
          supabase
            .from("cabin_types")
            .select("id,nombre,capacidad,precio_base")
            .eq("cliente_id", clienteId)
            .eq("activa", true),
        ]);

      if (cabinsError) throw new Error(cabinsError.message);
      if (typesError) throw new Error(typesError.message);

      const typeMap = new Map((types || []).map((t: any) => [t.id, t]));
      return toolResult(
        (cabins || []).map((c: any) => {
          const t: any = typeMap.get(c.cabin_type_id);
          return {
            code: c.codigo,
            name: c.nombre,
            type: t?.nombre ?? null,
            capacity: t?.capacidad ?? null,
            base_price_mxn: t?.precio_base == null ? null : Number(t.precio_base),
          };
        }),
      );
    },
  );

  server.registerTool(
    "check_availability",
    {
      title: "Consultar disponibilidad",
      description:
        "Consulta disponibilidad real entre dos fechas usando las reservaciones sincronizadas. No devuelve nombres, teléfonos ni otros datos personales.",
      inputSchema: z.object({
        check_in: dateSchema,
        check_out: dateSchema,
        guests: z.number().int().min(1).max(30),
        cabin_type: z.string().min(1).max(40).nullable().optional(),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ check_in, check_out, guests, cabin_type }) => {
      if (check_in >= check_out) throw new Error("check_out must be after check_in");
      const { data, error } = await supabase.rpc("bot_check_availability", {
        p_check_in: check_in,
        p_check_out: check_out,
        p_guests: guests,
        p_cabin_type: cabin_type ?? null,
      });
      if (error) throw new Error(error.message);
      return toolResult(data || []);
    },
  );

  server.registerTool(
    "quote_stay",
    {
      title: "Cotizar estancia",
      description:
        "Cotiza una estancia noche por noche usando las tarifas vigentes de Cinco Lagos y devuelve total y anticipo del 50%.",
      inputSchema: z.object({
        cabin_type: z.enum(["Pequeña", "Cristal", "Grande", "Mayor"]),
        check_in: dateSchema,
        check_out: dateSchema,
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ cabin_type, check_in, check_out }) => {
      if (check_in >= check_out) throw new Error("check_out must be after check_in");
      const { data, error } = await supabase.rpc("bot_quote_stay", {
        p_cabin_type: cabin_type,
        p_check_in: check_in,
        p_check_out: check_out,
      });
      if (error) throw new Error(error.message);
      return toolResult(data || []);
    },
  );

  server.registerTool(
    "find_available_segments",
    {
      title: "Buscar segmentos disponibles",
      description:
        "Busca tramos continuos disponibles dentro de la estancia solicitada para proponer alternativas cuando una cabaña no está libre todas las noches.",
      inputSchema: z.object({
        check_in: dateSchema,
        check_out: dateSchema,
        guests: z.number().int().min(1).max(30),
        cabin_type: z.string().min(1).max(40).nullable().optional(),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ check_in, check_out, guests, cabin_type }) => {
      if (check_in >= check_out) throw new Error("check_out must be after check_in");
      const { data, error } = await supabase.rpc("bot_find_available_segments", {
        p_check_in: check_in,
        p_check_out: check_out,
        p_guests: guests,
        p_cabin_type: cabin_type ?? null,
      });
      if (error) throw new Error(error.message);
      return toolResult(data || []);
    },
  );

  return server;
});

Deno.serve((req) => handler.fetch(req));
