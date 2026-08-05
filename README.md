# Lakeside Sanctuary SPA

# ROLE & CONTEXT

You are an expert Frontend Developer and UX/UI Designer. Your task is to build a professional, modern, high-converting, and fully responsive Single Page Application (SPA) / Landing Page for "Cabañas 5 Lagos de Montebello", a rustic-chic cabin complex located right in front of the Cinco Lagos viewpoint within the Lagunas de Montebello National Park, Chiapas, Mexico.

# TARGET AUDIENCE & TONE

- Target Audience: Nature lovers, eco-tourists, couples, and families looking for an authentic, peaceful, and premium (but accessible) lakefront refuge. They value stunning landscapes, misty mornings, soft adventure (kayak, rafts), and disconnection from urban noise.

- Tone: Warm, trustworthy, inspiring, and deeply connected to nature. Avoid corporate or cold hotel vocabulary; use terms like "refugio natural", "despierta frente al lago", and "experiencia auténtica".

# VISUAL SYSTEM (Tailwind CSS)

- Palette: 

  * Primary/Lago: Deep Lake Blue (`#0B4F6C` / `bg-cyan-900`) and Turquoise/Water (`#01BAEF` / `text-sky-500`)

  * Secondary/Bosque: Forest Green (`#1F4E5B` or deep emerald)

  * Neutrals: Warm White (`#FAFAFA`), Sand/Beige (`#F4F1EA`), and Charcoal for text.

- Typography: Elegant, clean, and editorial headers (e.g., Playfair Display or Montserrat style) with highly legible body text (Inter/Geist).

- UI Components: Use Radix UI / Shadcn style components (smooth accordions, elegant grids, clear cards, micro-interactions, and beautiful Lucide Icons).

# ARCHITECTURE & SECTIONS

## 0. NAVIGATION (Sticky Header)

- Semi-transparent blur background (`backdrop-blur-md`).

- Logo/Text: "Cabañas 5 Lagos"

- Desktop Links: Inicio, Cabañas, Amenidades, Experiencias, Ubicación, FAQ.

- Mobile: Elegant hamburger menu.

- CTA Button: "Reservar por WhatsApp" (Green or accent color, prominent).

## 1. HERO SECTION (High-Impact Impression)

- Full-screen or large immersive layout with a placeholder for a breathtaking mist/lakefront dawn view.

- Main Heading: "Despierta frente a Cinco Lagos" (H1, bold, inspiring).

- Subheading: "Cabañas rodeadas de bosque, vistas naturales y la tranquilidad del Parque Nacional Lagunas de Montebello."

- CTAs (Flex row on desktop, stacked on mobile):

  1. Primary Button: "Reservar por WhatsApp" (with Lucide WhatsApp icon).

  2. Secondary Button: "Ver cabañas" (smooth scroll to sections).

- Feature Chips/Badges (Icon + Text): 

  * [🌲 Frente al Lago] * [🚗 Estacionamiento Privado] * [🍲 Restaurante] * [🥾 Senderismo] * [⛰️ Vista a la Montaña]

## 2. BRAND STORY / INTRODUCTION

- Clean, split-screen or centered elegant block.

- Text: "Cabañas 5 Lagos de Montebello es un refugio natural ubicado frente a una de las vistas más hermosas del Parque Nacional Lagunas de Montebello. Aquí puedes descansar lejos del ruido, despertar con el canto de las aves, caminar entre bosque y disfrutar de la cercanía con los lagos de colores que hacen único a este destino de Chiapas."

## 3. ACCOMMODATION CARDS (Cabañas)

- Responsive Grid (1 col mobile, 2-3 cols desktop).

- UI Element: Clean cards with image placeholders, badge for features, and flexible copy (NO hardcoded prices).

- Card Content:

  * Title: "Cabaña Vista al Lago", "Cabaña Familiar", or "Cabaña con Terraza/Balcón".

  * Feature list with checkmarks: Baño privado, TV, Toallas, Minibar o área de descanso, Estacionamiento.

  * Price Tag Placeholder: "Tarifas sujetas a temporada y disponibilidad."

  * Card CTA: Button "Cotizar Capacidad por WhatsApp".

## 4. AMENITIES (Icon-Rich Grid)

- Clean grid showing badges with Lucide Icons:

  * 🌅 Vista al lago | 🏡 Jardín & Terraza | 🍲 Restaurante | 🚗 Estacionamiento privado | 📶 WiFi (Sujeto a disponibilidad de la zona) | 🚿 Baño privado | 📺 TV | 🗺️ Atención local.

- **Critical UX Callout Box** (Alert/Warning style):

  * "Nota: Estamos dentro de una zona natural protegida; la señal de celular e internet pueden variar. Te recomendamos descargar tu mapa y comprobantes antes de ingresar al parque."

## 5. EXPERIENCES & DESTINATION (The "Montebello" Hook)

- Title: "Vive Montebello desde Cinco Lagos"

- Paragraph: "Cinco Lagos es uno de los puntos más impresionantes del parque. Desde aquí puedes explorar lagunas conectadas, caminar por senderos y disfrutar de los tonos azules, verdes y turquesas que hacen famoso a Montebello."

- Interactive or Grid Cards for activities with beautiful icons/images:

  * Paseos en balsa tradicional | Kayak en zonas permitidas | Senderismo y miradores | Fotografía de paisaje | Nado y Pesca (zonas reguladas) | Ciclismo.

- Nearby Attractions Badges: Lago Pojoj, Lago Tziscao, Lago Internacional, Zona Arqueológica de Chinkultic, Comitán Pueblo Mágico.

## 6. MEDIA GALLERY

- Elegant masonry grid or filterable gallery layout.

- Use placeholders or high-quality Unsplash nature/cabin/lake images.

- Leave explicit code comments (`<!-- REPLACE WITH REAL IMAGE PATH -->`) for: Fachada, Interiores, Vista al lago, Terraza, Restaurante, Senderos, Amanecer.

- Reference Source for look&feel: https://www.instagram.com/5lagosmontebello/

## 7. LOCATION & LOGISTICS (Cómo Llegar)

- Title: "Cómo llegar a Cabañas 5 Lagos"

- Address: Carretera a Cinco Lagos Km 2, frente al lago, Santiago, 30160, Chiapas, México.

- Left column: Detailed route text blocks:

  * **Desde Comitán:** Tomar rumbo a La Trinitaria y seguir señalamientos hacia Lagunas de Montebello.

  * **Desde San Cristóbal de Las Casas:** Salir hacia Comitán, continuar a La Trinitaria y después al Parque Nacional.

  * **Transporte público:** Opciones desde Comitán hacia la zona de lagos y uso de mototaxis locales.

- Right column: Clean Map Container placeholder with a prominent styled button: "Abrir ubicación en Google Maps".

## 8. INTERACTIVE FAQ (Shadcn-style Accordion)

Implement an interactive accordion component for the following QA pairs:

1. **¿Dónde están ubicadas las cabañas?** -> Estamos en Carretera a Cinco Lagos Km 2, justo frente al lago, en la comunidad de Santiago, Chiapas, dentro del entorno del Parque Nacional.

2. **¿Cómo puedo reservar?** -> Puedes reservar directamente haciendo clic en nuestros botones de WhatsApp. Te confirmaremos disponibilidad, tarifa y el proceso de depósito/transferencia.

3. **¿Hay internet o señal celular?** -> Al ser una zona natural y boscosa, la señal es variable. Contamos con WiFi intermitente en áreas comunes. Recomendamos descargar mapas e información importante previamente.

4. **¿Hay estacionamiento y restaurante?** -> Sí, contamos con estacionamiento privado para huéspedes y servicio de restaurante (se sugiere consultar horarios y disponibilidad al hacer check-in).

5. **¿Se puede nadar en los lagos?** -> Solo en las zonas específicamente permitidas por las autoridades del Parque Nacional y siguiendo las indicaciones de los guías locales. Está prohibido el uso de bloqueadores químicos en el agua.

6. **¿Qué ropa debo llevar?** -> Recomendamos chamarra ligera o impermeable, calzado cómodo para senderismo, repelente de insectos amigable con el ambiente y efectivo (no hay cajeros en la zona).

7. **¿Aceptan mascotas / Emiten factura?** -> Por favor, consulta directamente nuestras políticas vigentes y disponibilidad de comprobantes fiscales vía WhatsApp antes de consolidar tu reserva.

## 9. FINAL CALL TO ACTION (CTA)

- Immersive section with dark overlay over a beautiful lake mist background image.

- Title: "Reserva tu descanso frente a Cinco Lagos"

- Subtext: "Escríbenos y cotiza tu cabaña según fecha, número de personas y tipo de estancia."

- Massive, centered pulsating button: "Cotizar por WhatsApp" (with icon).

## 10. FOOTER & COMPLIANCE

- 3-column layout (Brand & Location | Quick Links | Social & Contact placeholder inputs).

- Dynamic copyright year.

- Links: Instagram placeholder (`https://www.instagram.com/5lagosmontebello/`), Facebook input placeholder.

- Disclaimer text: "Sitio informativo. Todas las tarifas, servicios y disponibilidad están sujetos a confirmación directa vía WhatsApp."

# TECHNICAL SPECIFICATIONS & PERSISTENCE

- **Mobile-First Responsiveness:** Ensure typography scales down nicely on mobile phones and tap targets are minimum 48px.

- **Floating Widget:** Include a sticky/floating WhatsApp button in the bottom-right corner with a subtle pulsing ping animation.

- **SEO & Metadata Structure:** Prepare semantic HTML tags (`<header>`, `<main>`, `<section>`, `<footer>`, proper `<h1>`-`<h3>` hierarchy). Use keywords in alt tags and headings: "Cabañas Cinco Lagos", "Cabañas en Lagunas de Montebello", "Hospedaje en Cinco Lagos Chiapas", "Cabañas frente al lago en Montebello".

- **Data Safety:** Do NOT invent prices, phone numbers, or emails. Use clear, styled placeholders or state variables (e.g., `const WHATSAPP_NUMBER = "YOUR_NUMBER_HERE"`) so they can be edited effortlessly in the code.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://montebello-lake-refuge.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9b364451-3171-4578-8ca4-82a78d57ad91).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
