import { createFileRoute } from "@tanstack/react-router";
import { SeoGuidePage, makeSeoHead, type SeoPageConfig } from "@/components/SeoGuidePage";
import { photos } from "@/lib/photos";

const config: SeoPageConfig = {
  path: "/que-hacer-lagunas-de-montebello",
  title: "Qué hacer en Lagunas de Montebello | Guía Cinco Lagos",
  description: "Qué hacer en Lagunas de Montebello: caminatas, kayak, paseos en embarcación, fotografía, observación de aves y una visita sin prisas desde Cinco Lagos.",
  keywords: "qué hacer Lagunas de Montebello, actividades Montebello Chiapas, kayak Montebello, senderismo Montebello, visitar Lagunas de Montebello",
  eyebrow: "Guía de viaje",
  heading: "Qué hacer en Lagunas de Montebello cuando tienes tiempo para disfrutarlo",
  intro: "Montebello no es un solo lago ni una sola fotografía. El parque reúne paisajes, senderos y actividades de naturaleza que se disfrutan mejor cuando el itinerario deja espacio para detenerse, caminar y mirar.",
  hero: photos.p01,
  sections: [
    {
      title: "Caminar y recorrer senderos",
      text: "La CONANP incluye la caminata, el senderismo y los senderos interpretativos entre las actividades del Parque Nacional Lagunas de Montebello. Lleva calzado cómodo y utiliza los caminos habilitados para reducir el impacto sobre el entorno.",
      bullets: [
        "Caminatas entre bosque y lagos",
        "Senderos interpretativos",
        "Miradores y puntos de contemplación",
        "Ropa adecuada para clima templado y lluvioso",
      ],
    },
    {
      title: "Disfrutar el agua",
      text: "Entre las actividades registradas por la CONANP se encuentran el kayak y los recorridos en embarcaciones. La disponibilidad depende del lago, el clima y los prestadores de servicios de cada zona, por lo que conviene preguntar localmente antes de planear el día alrededor de una actividad específica.",
      bullets: [
        "Kayakismo",
        "Paseos en lancha o balsa",
        "Recorridos con prestadores locales",
        "Respeto a las indicaciones del área protegida",
      ],
    },
    {
      title: "Fotografía y observación de naturaleza",
      text: "Montebello es un sitio especialmente atractivo para fotografía de paisaje, observación de aves y contemplación de flora y fauna. La luz cambia durante el día y el bosque modifica por completo la sensación de cada lago.",
      bullets: [
        "Fotografía de naturaleza",
        "Observación de aves",
        "Observación de flora y fauna",
        "Momentos tranquilos al amanecer y al final de la tarde",
      ],
    },
    {
      title: "Combinar naturaleza y patrimonio",
      text: "Si dispones de más tiempo, una visita a la Zona Arqueológica de Chinkultic puede complementar muy bien el recorrido por los lagos. Está en la misma región y permite sumar historia, arquitectura maya y vistas elevadas a un viaje centrado en naturaleza.",
    },
    {
      title: "Una forma sencilla de organizar el día",
      text: "Empieza temprano, elige pocos puntos en lugar de intentar recorrer todo, deja tiempo para comer y regresa a Cinco Lagos antes de convertir el paseo en una carrera. Al hospedarte en la zona puedes continuar explorando al día siguiente.",
    },
  ],
  gallery: [photos.p01, photos.p27, photos.p22, photos.p10, photos.p02, photos.p23],
  faq: [
    {
      question: "¿Qué actividades reconoce oficialmente la CONANP en Montebello?",
      answer: "La información oficial incluye caminata y senderismo, contemplación del paisaje, fotografía de naturaleza, kayak, observación de aves y flora y fauna, paseos a caballo, recorridos en embarcaciones y senderos interpretativos, entre otras actividades.",
    },
    {
      question: "¿Se puede hacer todo en un solo día?",
      answer: "Puedes conocer varios puntos en un día, pero Montebello tiene suficientes lagos, senderos y actividades para dedicarle más tiempo. Hospedarte en la zona permite repartir el recorrido y viajar con menos prisa.",
    },
    {
      question: "¿Las actividades acuáticas están disponibles todos los días?",
      answer: "No conviene darlo por hecho. La disponibilidad puede cambiar por clima, condiciones del lago o prestadores de servicio. Pregunta en la zona y sigue siempre las indicaciones oficiales.",
    },
  ],
  related: [
    { href: "/cabanas-lagunas-de-montebello", label: "Cabañas en Montebello" },
    { href: "/donde-hospedarse-lagunas-de-montebello", label: "Dónde hospedarte" },
    { href: "/como-llegar-a-lagunas-de-montebello", label: "Cómo llegar a Montebello" },
    { href: "/chinkultic-y-montebello", label: "Ruta Chinkultic y Montebello" },
    { href: "/cabana-cristal-montebello", label: "Cabaña Cristal para dos" },
  ],
  sourceLinks: [
    { label: "CONANP · Lagunas de Montebello", href: "https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=96" },
    { label: "CONANP · Parque Nacional", href: "https://www.gob.mx/conanp/documentos/parque-nacional-lagunas-de-montebello-209454" },
  ],
  ctaTitle: "Explora de día y vuelve al lago a descansar",
  ctaText: "Consulta una cabaña en Cinco Lagos y usa Montebello como destino para quedarte, no solo como una parada de unas horas.",
  ctaMessage: "Hola, estoy planeando visitar Lagunas de Montebello y quiero hospedarme en Cinco Lagos. ¿Qué opciones tienen para mis fechas?",
};

export const Route = createFileRoute("/que-hacer-lagunas-de-montebello")({
  head: () => makeSeoHead(config),
  component: () => <SeoGuidePage config={config} />,
});
