import { createFileRoute } from "@tanstack/react-router";
import { SeoGuidePage, makeSeoHead, type SeoPageConfig } from "@/components/SeoGuidePage";
import { photos } from "@/lib/photos";

const config: SeoPageConfig = {
  path: "/donde-hospedarse-lagunas-de-montebello",
  title: "Dónde hospedarse en Lagunas de Montebello | Cinco Lagos",
  description: "Guía para elegir dónde hospedarte en Lagunas de Montebello: qué revisar antes de reservar, ventajas de quedarte en la zona y opciones de Cinco Lagos frente al paisaje.",
  keywords: "dónde hospedarse Lagunas de Montebello, hospedaje Montebello Chiapas, hotel Montebello, cabañas Montebello, dormir Lagunas de Montebello",
  eyebrow: "Planea tu estancia",
  heading: "Dónde hospedarse en Lagunas de Montebello y qué conviene revisar antes de reservar",
  intro: "La mejor ubicación depende del viaje que quieres hacer. Si tu prioridad es vivir Montebello con calma, conviene valorar cercanía al parque, capacidad, vista, acceso y comunicación directa con el alojamiento, no únicamente el precio por noche.",
  hero: photos.p27,
  sections: [
    {
      title: "Quedarte en Montebello o hacer una visita de un día",
      text: "Dormir en la zona te permite repartir la visita entre varias horas o incluso varios días. Eso da margen para recorrer lagos, detenerte en miradores, visitar Chinkultic y regresar al alojamiento sin tener que volver a una ciudad más lejana al terminar la jornada.",
      bullets: [
        "Más tiempo para explorar sin concentrarlo todo en unas horas",
        "Posibilidad de disfrutar el paisaje temprano y al final del día",
        "Menos traslados repetidos durante la visita",
        "Mayor flexibilidad para adaptar el plan al clima y al ritmo del grupo",
      ],
    },
    {
      title: "Qué revisar antes de reservar",
      text: "Compara alojamientos por lo que realmente importa para tu grupo: ubicación, capacidad real, distribución de camas, baño privado, estacionamiento, fotografías recientes y un canal claro para confirmar la reserva.",
      bullets: [
        "Ubicación exacta en Google Maps",
        "Capacidad y distribución de camas",
        "Fotografías reales del alojamiento",
        "Políticas de reserva y cancelación",
        "Forma de contacto y confirmación",
      ],
    },
    {
      title: "Cinco Lagos como base para explorar",
      text: "Cinco Lagos se encuentra en Lagunas de Montebello, La Trinitaria, y ofrece opciones para parejas, familias y grupos. La propuesta es sencilla: hospedarte cerca del paisaje que viniste a conocer y usar la cabaña como punto de descanso entre recorridos.",
      bullets: [
        "Cabaña Cristal para 2 personas",
        "Cabañas pequeñas para hasta 5 personas",
        "Cabañas Grande y Mayor para hasta 8 personas",
        "Consulta de disponibilidad directamente por WhatsApp",
      ],
    },
    {
      title: "Reserva directa con información clara",
      text: "Antes de transferir o confirmar una estancia, revisa que el número, las fechas, la cabaña y el importe coincidan. En Cinco Lagos puedes consultar disponibilidad directamente y, una vez confirmada la reserva, utilizar el sitio oficial para verificar los datos de tu estancia.",
    },
  ],
  gallery: [photos.p27, photos.p01, photos.p09, photos.p02, photos.p22, photos.p14],
  faq: [
    {
      question: "¿Conviene dormir dentro de la zona de Montebello?",
      answer: "Si quieres dedicar más tiempo a los lagos, los miradores y los alrededores, hospedarte en la zona reduce la necesidad de hacer un viaje de ida y vuelta el mismo día.",
    },
    {
      question: "¿Qué debo revisar antes de reservar una cabaña?",
      answer: "Ubicación, capacidad, distribución de camas, fotografías reales, servicios incluidos, políticas y un canal verificable para confirmar la reservación.",
    },
    {
      question: "¿Cinco Lagos tiene opciones para distintos tamaños de grupo?",
      answer: "Sí. Hay una opción para dos personas, cabañas pequeñas para hasta cinco y dos cabañas para grupos de hasta ocho personas.",
    },
  ],
  related: [
    { href: "/cabanas-lagunas-de-montebello", label: "Cabañas en Lagunas de Montebello" },
    { href: "/cabana-cristal-montebello", label: "Cabaña Cristal" },
    { href: "/cabanas-familiares-montebello", label: "Cabañas familiares" },
    { href: "/que-hacer-lagunas-de-montebello", label: "Qué hacer en Montebello" },
    { href: "/como-llegar-a-lagunas-de-montebello", label: "Cómo llegar" },
    { href: "/chinkultic-y-montebello", label: "Chinkultic y Montebello" },
  ],
  ctaTitle: "Haz de Montebello tu destino, no solo una parada",
  ctaText: "Consulta qué cabañas están libres en tus fechas y elige según el número de personas que viajan.",
  ctaMessage: "Hola, estoy planeando hospedarme en Lagunas de Montebello y quiero conocer las opciones disponibles en Cinco Lagos.",
};

export const Route = createFileRoute("/donde-hospedarse-lagunas-de-montebello")({
  head: () => makeSeoHead(config),
  component: () => <SeoGuidePage config={config} />,
});
