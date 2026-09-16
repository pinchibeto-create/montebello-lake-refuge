import { createFileRoute } from "@tanstack/react-router";
import { SeoGuidePage, makeSeoHead, type SeoPageConfig } from "@/components/SeoGuidePage";
import { photos } from "@/lib/photos";

const config: SeoPageConfig = {
  path: "/como-llegar-a-lagunas-de-montebello",
  title: "Cómo llegar a Lagunas de Montebello | Cinco Lagos",
  description: "Cómo llegar a Lagunas de Montebello desde Comitán: ruta por La Trinitaria, acceso al parque, recomendaciones prácticas y ubicación de Cabañas Cinco Lagos.",
  keywords: "cómo llegar Lagunas de Montebello, ruta Comitán Montebello, carretera Lagunas de Montebello, cómo llegar a Cinco Lagos Chiapas",
  eyebrow: "Ruta y ubicación",
  heading: "Cómo llegar a Lagunas de Montebello y a Cabañas Cinco Lagos",
  intro: "La referencia más práctica para llegar a Montebello es Comitán de Domínguez. Desde ahí la ruta continúa hacia La Trinitaria y después hacia el Parque Nacional Lagunas de Montebello. Antes de salir, guarda la ubicación exacta de Cinco Lagos en tu teléfono.",
  hero: photos.p27,
  sections: [
    {
      title: "Desde Comitán de Domínguez",
      text: "La CONANP indica como ruta de referencia salir de Comitán por la Carretera Federal 190 con dirección a La Trinitaria y tomar después la Carretera Federal 307 rumbo a Lagunas de Montebello. La referencia oficial señala aproximadamente 59 km desde Comitán hasta el parque.",
      bullets: [
        "Comitán de Domínguez como punto de referencia",
        "Carretera Federal 190 hacia La Trinitaria",
        "Entronque con la Carretera Federal 307 hacia Montebello",
        "Continúa siguiendo señalización y la ubicación guardada de Cinco Lagos",
      ],
    },
    {
      title: "Transporte y movilidad en la zona",
      text: "La información oficial del parque señala que se puede llegar en transporte público, vehículo privado o mediante prestadores de servicios turísticos. Dentro del área existen caminos pavimentados, tramos de terracería y senderos, por lo que conviene conducir con calma y adaptar el recorrido a las condiciones del camino.",
    },
    {
      title: "Antes de salir",
      text: "Guarda el mapa y la ubicación del alojamiento mientras tengas buena conexión, lleva suficiente combustible y revisa el clima. Montebello tiene un clima templado y puede presentar lluvia, así que una chamarra o impermeable suele ser útil incluso cuando el día inicia despejado.",
      bullets: [
        "Guarda la ubicación en Google Maps",
        "Descarga o conserva una captura de la ruta",
        "Revisa combustible antes de entrar a la zona",
        "Lleva ropa para frío o lluvia",
      ],
    },
    {
      title: "Llegar directamente a Cinco Lagos",
      text: "Una vez en la zona de Lagunas de Montebello, utiliza el enlace oficial de Google Maps de Cinco Lagos para llegar al alojamiento. Si tienes dudas durante el trayecto, puedes escribir por WhatsApp antes de continuar.",
      bullets: [
        "Ubicación: Lagunas de Montebello, La Trinitaria, Chiapas",
        "Contacto directo por WhatsApp",
        "Estacionamiento disponible en el alojamiento",
      ],
    },
  ],
  gallery: [photos.p27, photos.p01, photos.p02, photos.p10, photos.p22, photos.p23],
  faq: [
    {
      question: "¿Cuál es la ciudad de referencia para llegar a Montebello?",
      answer: "Comitán de Domínguez es una de las referencias más prácticas. La ruta oficial continúa hacia La Trinitaria y luego por la Carretera Federal 307 hacia Lagunas de Montebello.",
    },
    {
      question: "¿Se puede llegar en transporte público?",
      answer: "Sí. La CONANP contempla transporte público, privado y prestadores de servicios turísticos como formas de acceso al parque. Los horarios y recorridos pueden cambiar, así que conviene confirmarlos localmente.",
    },
    {
      question: "¿Cómo encuentro exactamente Cabañas Cinco Lagos?",
      answer: "Usa el enlace de Google Maps disponible en el sitio oficial de Cinco Lagos y guarda la ubicación antes de entrar a la zona.",
    },
  ],
  related: [
    { href: "/cabanas-lagunas-de-montebello", label: "Cabañas en Montebello" },
    { href: "/donde-hospedarse-lagunas-de-montebello", label: "Dónde hospedarte" },
    { href: "/que-hacer-lagunas-de-montebello", label: "Qué hacer en Montebello" },
    { href: "/chinkultic-y-montebello", label: "Chinkultic y Montebello" },
    { href: "/cabanas-familiares-montebello", label: "Cabañas familiares" },
  ],
  sourceLinks: [
    { label: "CONANP · Cómo llegar", href: "https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=96" },
  ],
  ctaTitle: "Guarda tu cabaña antes de salir",
  ctaText: "Consulta disponibilidad y recibe la información de tu estancia directamente por WhatsApp.",
  ctaMessage: "Hola, estoy planeando mi ruta a Lagunas de Montebello y quiero consultar disponibilidad en Cinco Lagos.",
};

export const Route = createFileRoute("/como-llegar-a-lagunas-de-montebello")({
  head: () => makeSeoHead(config),
  component: () => <SeoGuidePage config={config} />,
});
