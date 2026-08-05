# Cinco Lagos — rediseño editorial con fotos reales

Rediseño completo de la landing con estilo editorial (verde bosque profundo, textos grandes en blanco, acentos turquesa) usando las 28 fotos reales del paquete y el logo de la marca.

## Estructura de la página (8 secciones)

1. **Hero a pantalla completa** — foto `01_hero_vista_lago_terraza_sillas.png` (vertical, alta resolución) con overlay verde oscuro, logo, título grande y "La vista es parte del viaje." + CTA "Consulta disponibilidad".
2. **Intro editorial** — párrafo de texto grande, centrado, sobre fondo verde profundo.
3. **Cuatro formas de hospedarte** — un bloque por tipo de cabaña, cada uno con su foto hero y galería de apoyo:
   - Cabañas pequeñas (5 pax): hero `02`, apoyo `03`–`08`
   - Cabaña de cristal (2 pax): hero `09`, apoyo `10`–`12`
   - Cabaña grande (8 pax): hero `13`, apoyo `14`–`18`
   - Cabaña mayor (8 pax): hero `19`, apoyo `20`–`24`
4. **Galería inmersiva** — mosaico con las mejores tomas de lago, terrazas y baños privados (`25`–`28` más selección de las anteriores), con lightbox al hacer clic.
5. **Servicios** — íconos y lista (baño privado, agua caliente, vista al lago, estacionamiento, etc.).
6. **Ubicación** — Lagunas de Montebello, Chiapas, con texto de ruta y botón a Google Maps.
7. **Visita responsable** — nota breve sobre cuidar el entorno natural.
8. **CTA final** — bloque turquesa con "Consulta disponibilidad" por WhatsApp; el QR (`29`) se muestra como opción secundaria para escanear desde móvil.

## Manejo de imágenes

- Las 29 imágenes se suben al CDN de Lovable como assets del proyecto (no quedan binarios en el repo) y se referencian por sus punteros.
- Se respetan los nombres del manifiesto; cada imagen recibe un `alt` en español tomado de la descripción del manifiesto.
- Las fotos de apoyo son de baja resolución (365×180 / 365×273), así que se usan solo en tamaños pequeños: miniaturas, mosaico y galería, nunca a ancho completo. Las de 1285 px de ancho se usan como heroes de sección.
- Carga diferida (`lazy`) en todo lo que no sea el hero, para que la página abra rápido.

## Marca

- Logo **CINCO LAGOS** en header y footer (versión blanca sobre verde oscuro) y como favicon del sitio.
- Tipografía editorial: titulares serif de alto contraste, cuerpo sans limpio.

## Detalles técnicos

- Tokens de color en `src/styles.css` (verde bosque profundo de fondo, blanco de texto, turquesa de acento) — sin colores hardcodeados en componentes.
- Reescritura de `src/routes/index.tsx` en secciones componentizadas bajo `src/components/`.
- SEO por ruta: `head()` con título, descripción, `og:*` y `og:image` apuntando a la foto del hero.
- Se corrige el error actual de runtime de los íconos (`lucide-react`) usando importaciones nombradas válidas.
- Sin precios, teléfonos ni horarios inventados: todo CTA lleva a "Consulta disponibilidad" por WhatsApp.

## Pendiente por confirmar

- Número de WhatsApp real y enlace de Google Maps (mientras tanto quedan como constantes editables en un solo archivo).
