# Rediseño editorial inmersivo — CINCO LAGOS

Reconstruir la landing con una identidad visual nueva: revista turística premium, fondo verde oscuro casi negro, tipografía blanca grande, acentos turquesa y fotografía como protagonista.

## Identidad visual

- Fondo base verde oscuro profundo (casi negro verdoso), superficies de tarjeta ligeramente más claras.
- Acento turquesa brillante para etiquetas, separadores delgados, botones y detalles.
- Texto principal blanco, secundario gris claro.
- Fotografías siempre con overlay oscuro y degradado para legibilidad.
- Mucho aire visual, encabezados grandes y limpios, botones suavemente redondeados.
- Mobile-first, animaciones suaves de entrada al hacer scroll.

## Estructura (reemplaza la actual)

1. **Menú fijo transparente** que se oscurece al hacer scroll: Inicio, Cabañas, Galería, Servicios, Ubicación, Disponibilidad + botón destacado "Consulta disponibilidad". Menú lateral en móvil.
2. **Hero pantalla completa** con foto del lago desde terraza, marca arriba (CINCO LAGOS / CABAÑAS · MONTEBELLO · CHIAPAS), eyebrow "A ORILLAS DE CINCO LAGOS", título "La vista es parte del viaje.", subtítulo "Cabañas para detener el tiempo entre agua y bosque.", botones "Consulta disponibilidad" y "Ver cabañas". Todo alineado a la izquierda.
3. **Introducción** en verde oscuro con el texto de "A orillas de Cinco Lagos" y frase destacada "Elige tu forma de mirar el lago."
4. **Cuatro formas de hospedarte** — 4 bloques con imagen, capacidad, nombre, descripción, servicios (baño privado con agua caliente, Wi-Fi) y texto de apoyo, con los nombres y datos exactos entregados. Incluye botón "Consulta disponibilidad".
5. **Galería inmersiva "La vista también se habita"** — recorrido visual asimétrico (imágenes grandes + miniaturas) con bordes sutiles: vista desde terraza, interiores de madera, camas, baños, exteriores, cabaña de cristal, vistas al lago, terrazas.
6. **Servicios** — solo Wi-Fi, Estacionamiento, Restaurante, Vista al lago, Baño privado con agua caliente. Nota "Servicios sujetos a disponibilidad."
7. **Encuéntranos** — dirección exacta tal cual, texto de entorno natural, botón "Cómo llegar" y espacio reservado para mapa (marcador editable, sin coordenadas inventadas).
8. **Franja de visita responsable** con los tres textos indicados, incluido el aviso pequeño de julio de 2026.
9. **CTA final** con fondo fotográfico: "Elige tu forma de mirar el lago." + botones "Consulta disponibilidad" y "Ver opciones de hospedaje".
10. **Footer** sobrio con marca, ubicación, redes existentes y campos editables para los datos que faltan.

Se eliminan las secciones que no forman parte de esta estructura (razones, experiencias, FAQ, testimonios) para mantener el tono editorial y no saturar.

## Datos y contenido

- Sin precios, teléfonos ni horarios inventados; todo CTA lleva a "Consulta disponibilidad".
- Nombres de cabañas, capacidades, descripciones, servicios y dirección exactamente como fueron entregados.
- Fotografías: se mantienen imágenes de referencia de stock (lago, bosque, interiores de madera) como marcadores, fáciles de sustituir por fotos reales del complejo.

## Detalles técnicos

- Reescribir `src/routes/index.tsx` (una página, componentes internos pequeños: `Nav`, `Hero`, `Intro`, `Cabins`, `Gallery`, `Services`, `Location`, `Responsible`, `FinalCta`, `Footer`).
- Actualizar tokens en `src/styles.css`: nuevos valores oscuros para `--background`, `--foreground`, superficies, borde turquesa y acento; utilidades para separador turquesa y overlays. Sin colores hardcodeados en componentes.
- Constantes editables al inicio del archivo: `WHATSAPP_NUMBER`, `GOOGLE_MAPS_URL`, `MAP_EMBED_URL`, `EMAIL`, `FACEBOOK_URL`.
- CTA "Consulta disponibilidad" apunta al enlace de WhatsApp con la constante editable; si aún no hay número, el botón queda claramente marcado en el código.
- `head()` de la ruta actualizado: título, descripción, og/twitter con el nuevo concepto.
- HTML semántico, un solo `<h1>`, alt descriptivos con palabras clave ("Cabañas Cinco Lagos", "Lagunas de Montebello").
