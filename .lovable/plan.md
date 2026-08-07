# Módulo "Consulta disponibilidad" (estilo buscador tipo Skyscanner)

Nueva barra de búsqueda de hospedaje que no consulta inventario: recopila los datos del visitante y abre WhatsApp con el mensaje ya redactado.

## Dónde aparece

1. Sobrepuesta en la parte baja del hero (en escritorio flota sobre el borde inferior de la foto; en móvil queda como tarjeta justo debajo del hero).
2. Repetida como CTA después de la sección de las cuatro cabañas, con el mismo componente.

## Campos y comportamiento

- **Fecha de llegada** y **Fecha de salida**: selector de fecha con placeholder "Agregar fecha", ícono de calendario, formato en español (p. ej. "12 ago 2026"). No se permiten fechas pasadas; la salida no puede ser anterior ni igual a la llegada.
- **Tipo de cabaña**: desplegable con las cuatro opciones (pequeñas hasta 5, cristal 2, grande hasta 8, mayor hasta 8), ícono de cabaña.
- **Personas**: stepper con − y +, mínimo 1, máximo según la cabaña elegida. Al cambiar de cabaña, si el número excede el máximo se ajusta y se muestra "Esta cabaña permite hasta X personas."

### Validaciones (mensajes bajo el campo correspondiente)

- "Selecciona tu fecha de llegada."
- "Selecciona tu fecha de salida."
- "Selecciona el tipo de cabaña."
- "Indica cuántas personas se hospedarán."
- "Selecciona una fecha de salida posterior a la llegada."

Nunca se muestra "Disponible" ni "No disponible", ni precios ni horarios.

## Botón y mensaje

Botón "Checar disponibilidad por WhatsApp" (turquesa, ancho completo en móvil). Abre en pestaña nueva `https://wa.me/529612559561` con el mensaje:

```text
Hola, quiero consultar disponibilidad en Cinco Lagos.
Fecha de llegada: ...
Fecha de salida: ...
Cabaña: ...
Número de personas: ...
¿Me pueden confirmar si está disponible y compartirme más información para reservar?
Gracias.
```

Debajo del botón: "La disponibilidad se confirma directamente por WhatsApp. Servicios sujetos a disponibilidad."

## Estilo

Tarjeta sobre fondo verde bosque profundo con campos en blanco/claro para máximo contraste, bordes redondeados, sombra suave y acento turquesa. En escritorio una sola fila: `[Llegada] [Salida] [Cabaña] [Personas] [Botón]` con separadores verticales sutiles, como buscador de vuelos. En móvil se apila en tarjeta vertical con título, subtítulo y botón grande.

Título "Consulta disponibilidad" · subtítulo "Elige tu fecha, cabaña y número de personas. Te responderemos por WhatsApp."

## Detalles técnicos

- Nuevo componente `src/components/AvailabilitySearch.tsx` (cliente, estado local con `useState`), reutilizado en las dos ubicaciones mediante una prop de variante (`hero` / `section`).
- Fechas con el `Calendar` de shadcn dentro de `Popover` (`pointer-events-auto` en el calendario) y formato con `date-fns` en español; cabaña con el `Select` de shadcn; stepper con botones propios y `aria-live` para el aviso de aforo.
- Los máximos por cabaña se derivan de los datos existentes en `src/components/CabinBlock.tsx` (una sola fuente de verdad para nombres y capacidades).
- El armado del enlace se agrega como helper en `src/lib/site.ts`, junto al `whatsappLink` actual; se conserva el número `529612559561`.
- Íconos nuevos (calendario, cabaña, personas, +/−) se añaden a `src/components/Icons.tsx` como SVG inline, sin `lucide-react`.
- Solo tokens semánticos de `src/styles.css`; se agregan tokens claros para los campos si hacen falta, sin colores hardcodeados.
