import { createFileRoute } from "@tanstack/react-router";
import { SeoGuidePage, makeSeoHead, type SeoPageConfig } from "@/components/SeoGuidePage";
import { photos } from "@/lib/photos";

const config: SeoPageConfig = {
  path: "/cabanas-familiares-montebello",
  title: "Cabañas familiares en Montebello | Cinco Lagos",
  description: "Cabañas familiares en Lagunas de Montebello, Chiapas, con opciones para hasta 5 y 8 personas. Conoce las cabañas pequeñas, Grande y Mayor de Cinco Lagos.",
  keywords: "cabañas familiares Montebello, hospedaje familiar Lagunas de Montebello, cabañas para grupos Chiapas, cabañas grandes Montebello",
  eyebrow: "Familias y grupos",
  heading: "Cabañas en Montebello para viajar juntos",
  intro: "Si viajan en familia o con amigos, Cinco Lagos cuenta con opciones de distintas capacidades para que el grupo pueda quedarse en la zona de Montebello y disfrutar el paisaje sin hacer un viaje de ida y vuelta el mismo día.",
  hero: photos.p02,
  sections: [
    {
      title: "Cabañas pequeñas: hasta cinco personas",
      text: "Las cabañas pequeñas están distribuidas en dos niveles. En planta baja cuentan con cama matrimonial, televisión y baño privado; en planta alta tienen una cama matrimonial y una individual, además de balcón con vista al lago.",
      bullets: [
        "Hasta 5 personas",
        "Dos niveles",
        "Baño privado",
        "Balcón con vista al lago",
      ],
    },
    {
      title: "Cabaña Grande: hasta ocho personas",
      text: "La Cabaña Grande ofrece más espacio para grupos. En la planta alta tiene un cuarto amplio con dos camas matrimoniales; en planta baja cuenta con dos cuartos, cada uno con cama matrimonial, además de sala y terraza techada.",
      bullets: [
        "Hasta 8 personas",
        "Tres espacios para dormir",
        "Sala con sofás",
        "Terraza techada",
      ],
    },
    {
      title: "Cabaña Mayor: hasta ocho personas",
      text: "La Cabaña Mayor combina una terraza frente al lago con habitaciones y un tapanco. Es una opción para grupos que quieren permanecer cerca del agua y aprovechar al máximo el espacio interior.",
      bullets: [
        "Hasta 8 personas",
        "Terraza frente al lago",
        "Dos cuartos",
        "Tapanco con colchones",
      ],
    },
    {
      title: "Elige por capacidad y tipo de estancia",
      text: "Para una familia pequeña, las cabañas pequeñas suelen ser la opción más sencilla. Para grupos mayores conviene revisar la distribución de la Grande y la Mayor. Si viajan solo dos personas y buscan una estancia más íntima, también pueden considerar la Cabaña Cristal.",
    },
  ],
  gallery: [photos.p02, photos.p05, photos.p14, photos.p17, photos.p22, photos.p23],
  faq: [
    {
      question: "¿Cuál es la capacidad de las cabañas familiares?",
      answer: "Las cabañas pequeñas alojan hasta cinco personas. Las cabañas Grande y Mayor alojan hasta ocho personas cada una.",
    },
    {
      question: "¿Cuál conviene para un grupo de seis a ocho personas?",
      answer: "La Cabaña Grande y la Cabaña Mayor están pensadas para grupos de hasta ocho personas. Puedes revisar su distribución y consultar cuál está disponible para tus fechas.",
    },
    {
      question: "¿Todas tienen baño privado?",
      answer: "Sí. Las opciones de hospedaje de Cinco Lagos cuentan con baño privado.",
    },
  ],
  related: [
    { href: "/cabanas-lagunas-de-montebello", label: "Ver todas las cabañas" },
    { href: "/cabana-cristal-montebello", label: "Cabaña Cristal para dos" },
    { href: "/donde-hospedarse-lagunas-de-montebello", label: "Dónde hospedarse en Montebello" },
    { href: "/que-hacer-lagunas-de-montebello", label: "Qué hacer en Montebello" },
    { href: "/como-llegar-a-lagunas-de-montebello", label: "Cómo llegar" },
  ],
  ctaTitle: "Viajen juntos y quédense en Montebello",
  ctaText: "Envíanos cuántas personas viajan y tus fechas. Te ayudamos a elegir entre las cabañas pequeñas, Grande o Mayor.",
  ctaMessage: "Hola, viajo con mi familia o grupo y quiero consultar una cabaña en Cinco Lagos. ¿Me ayudan a elegir según el número de personas?",
};

export const Route = createFileRoute("/cabanas-familiares-montebello")({
  head: () => makeSeoHead(config),
  component: () => <SeoGuidePage config={config} />,
});
