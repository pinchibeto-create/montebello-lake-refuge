import { createFileRoute } from "@tanstack/react-router";
import { SeoGuidePage, makeSeoHead, type SeoPageConfig } from "@/components/SeoGuidePage";
import { photos } from "@/lib/photos";

const config: SeoPageConfig = {
  path: "/chinkultic-y-montebello",
  title: "Chinkultic y Lagunas de Montebello | Ruta Cinco Lagos",
  description: "Combina Chinkultic y Lagunas de Montebello en una misma ruta: qué ver en la zona arqueológica, cómo organizar el día y dónde hospedarte para viajar sin prisa.",
  keywords: "Chinkultic y Montebello, zona arqueológica Chinkultic, ruta Chinkultic Lagunas de Montebello, hospedaje cerca de Chinkultic",
  eyebrow: "Naturaleza + patrimonio",
  heading: "Chinkultic y Lagunas de Montebello: una ruta para hacer sin prisa",
  intro: "La zona arqueológica de Chinkultic y las Lagunas de Montebello pueden formar parte del mismo viaje. Una aporta arquitectura e historia maya; la otra, bosque, agua y paisaje. Hospedarte en la región permite combinar ambas sin convertir el recorrido en una carrera.",
  hero: photos.p01,
  sections: [
    {
      title: "Qué encontrarás en Chinkultic",
      text: "El INAH describe Chinkultic como un asentamiento maya cuya arquitectura se adaptó a un terreno irregular y elevado. El sitio incluye la Acrópolis y El Mirador, una Plaza Hundida, un Juego de Pelota y la Plataforma de las Lajas.",
      bullets: [
        "Arquitectura adaptada a colinas y desniveles",
        "Acrópolis y zona conocida como El Mirador",
        "Plaza Hundida y Juego de Pelota",
        "Plataforma de las Lajas",
      ],
    },
    {
      title: "Un sitio con larga historia",
      text: "La información del INAH señala que la ocupación del área comenzó siglos antes de nuestra era y que Chinkultic tuvo uno de sus periodos de mayor desarrollo entre los años 750 y 900. Su ubicación entre montañas, lagos y cenotes ayuda a entender por qué el paisaje forma parte esencial de la visita.",
    },
    {
      title: "Cómo combinar Chinkultic con Montebello",
      text: "Una forma práctica es visitar Chinkultic temprano y continuar después hacia los lagos, o hacer el recorrido en sentido contrario dependiendo del clima y de tu punto de partida. No es necesario intentar conocer todos los lagos el mismo día; elegir pocos puntos deja más tiempo para caminar y disfrutar cada parada.",
      bullets: [
        "Empieza temprano",
        "Reserva tiempo para caminar en Chinkultic",
        "Elige pocos lagos en lugar de intentar verlos todos",
        "Deja el final del día para volver a descansar a Cinco Lagos",
      ],
    },
    {
      title: "Acceso a Chinkultic",
      text: "El INAH señala el acceso desde Comitán hacia La Trinitaria y después por el desvío a Lagunas de Montebello. En el ejido Miguel Hidalgo se toma el camino hacia la zona arqueológica. Los horarios y condiciones pueden cambiar, así que verifica la ficha oficial antes de salir.",
    },
    {
      title: "Dormir cerca para aprovechar mejor la ruta",
      text: "Quedarte en Lagunas de Montebello permite separar naturaleza y patrimonio en dos medios días o incluso dedicar un día completo a cada experiencia. Cinco Lagos cuenta con opciones para dos personas, familias y grupos de hasta ocho personas.",
    },
  ],
  gallery: [photos.p01, photos.p27, photos.p22, photos.p02, photos.p09, photos.p23],
  faq: [
    {
      question: "¿Chinkultic está cerca de Lagunas de Montebello?",
      answer: "Sí. El acceso a Chinkultic se encuentra en la misma región de La Trinitaria y el INAH lo describe como un sitio muy cercano a Lagunas de Montebello.",
    },
    {
      question: "¿Cuánto cuesta entrar a Chinkultic?",
      answer: "La ficha oficial del INAH consultada para esta guía indica entrada libre. Como tarifas y horarios pueden cambiar, conviene verificar la información oficial antes de la visita.",
    },
    {
      question: "¿Cuál es el horario de Chinkultic?",
      answer: "La ficha oficial del INAH consultada indica horario de lunes a domingo de 08:00 a 17:00. Revisa nuevamente la fuente oficial antes de salir por si hubiera cambios temporales.",
    },
  ],
  related: [
    { href: "/que-hacer-lagunas-de-montebello", label: "Qué hacer en Montebello" },
    { href: "/como-llegar-a-lagunas-de-montebello", label: "Cómo llegar a Montebello" },
    { href: "/donde-hospedarse-lagunas-de-montebello", label: "Dónde hospedarte" },
    { href: "/cabanas-lagunas-de-montebello", label: "Cabañas en Montebello" },
    { href: "/cabanas-familiares-montebello", label: "Cabañas para familias y grupos" },
  ],
  sourceLinks: [
    { label: "INAH · Zona Arqueológica de Chinkultic", href: "https://www.inah.gob.mx/zonas/zona-arqueologica-de-chinkultic" },
    { label: "INAH · Información para la visita", href: "https://lugares.inah.gob.mx/es/node/5670" },
  ],
  ctaTitle: "Haz la ruta y quédate en Montebello",
  ctaText: "Consulta una cabaña para dormir en la zona y repartir Chinkultic y los lagos con más calma.",
  ctaMessage: "Hola, quiero visitar Chinkultic y Lagunas de Montebello y estoy buscando hospedaje en Cinco Lagos. ¿Qué tienen disponible?",
};

export const Route = createFileRoute("/chinkultic-y-montebello")({
  head: () => makeSeoHead(config),
  component: () => <SeoGuidePage config={config} />,
});
