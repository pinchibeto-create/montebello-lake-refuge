# Sección de hospedaje: "Elige tu cabaña"

Reemplazar los cuatro bloques largos en scroll por un selector visual de cuatro opciones + un panel de detalle que cambia en el mismo lugar.

## Qué verá el visitante

1. Encabezado de la sección: "Elige tu cabaña" con una línea corta de contexto.
2. Selector con las cuatro opciones, cada tarjeta con: foto representativa, nombre, capacidad, "Desde $___ MXN por noche" e indicador visual de que es tocable (flecha/chevron y estado hover/activo).
   - Cabañas pequeñas — Hasta 5 personas — Desde $750 MXN
   - Cabaña de cristal — 2 personas — Desde $1,200 MXN
   - Cabaña grande — Hasta 8 personas — Desde $1,200 MXN
   - Cabaña mayor — Hasta 8 personas — Desde $1,300 MXN
3. Debajo de las tarjetas, en texto pequeño y discreto: "Las tarifas pueden variar según temporada, fechas y disponibilidad."
4. Panel de detalle de la cabaña seleccionada (inicia en "Cabañas pequeñas"), con:
   - Nombre, capacidad y precio desde
   - Galería deslizable con las fotos reales que ya tiene esa cabaña (con lightbox, como hoy)
   - Descripción actual de la cabaña
   - Lista de características actuales (baño privado, terraza/balcón, vista al lago, distribución de camas según lo ya documentado en la página)
   - Botón "Consultar disponibilidad" que abre WhatsApp con: "Hola, estoy interesado en consultar disponibilidad para la {Cabaña} de Cinco Lagos."

No se inventan fotos, amenidades ni características: solo se reorganiza lo existente y se añaden los precios indicados.

## Comportamiento

- Al tocar otra tarjeta, cambia solo el panel de detalle; sin navegación ni scroll obligado.
- La tarjeta activa se distingue con borde turquesa, fondo ligeramente elevado y un punto/etiqueta de "Seleccionada", respetando la identidad actual (verde profundo, blanco, turquesa).
- Se conserva la accesibilidad de pestañas (roles tab/tabpanel, foco visible, navegación con teclado).

## Desktop

- Cuadrícula de cuatro tarjetas en una fila, con la fotografía como protagonista (imagen grande arriba, texto compacto abajo).
- Panel de detalle en dos columnas: galería a un lado, datos y botón al otro.

## Móvil

- Carrusel horizontal con scroll-snap: se ve una tarjeta completa y un adelanto de la siguiente.
- Ayuda visual: "Desliza para ver las opciones →" y puntos de posición.
- Panel de detalle en una columna, con galería deslizable horizontal y textos breves.
- Orden de lectura: foto → nombre → capacidad → precio → selección.

## Fuera de alcance

- No se toca el hero, el buscador de disponibilidad, galería general, servicios, ubicación, visita responsable, CTA final ni footer.
- El buscador de disponibilidad existente se mantiene tal cual; más adelante se puede enlazar la cabaña seleccionada con ese módulo.

## Detalles técnicos

- Datos de cabañas (nombre, capacidad, precio desde, descripción, features, fotos) siguen centralizados en un solo arreglo, ahora con campo `priceFrom`, para editar precios en un solo lugar.
- Nuevo componente `CabinSelector` (tarjetas + carrusel móvil) y `CabinDetail` (panel), reemplazando el uso de `CabinBlock` en la sección de hospedaje; se reutiliza `PhotoGallery`/lightbox y los iconos SVG existentes.
- Nuevo helper de WhatsApp por cabaña en `src/lib/site.ts`.
- Estado local con `useState` (sin backend), CSS puro para el carrusel (scroll-snap), sin librerías nuevas.
- Publicación: el proyecto es una app TanStack Start pensada para el hosting de Lovable; para Netlify se documentará el build (`npm run build`) y se añadirá la configuración de despliegue en un paso aparte si confirmas que quieres publicar ahí en lugar de usar el dominio de Lovable.
