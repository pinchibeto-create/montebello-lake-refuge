import { photos, type Photo } from "@/lib/photos";

export type Cabin = {
  id: string;
  name: string;
  capacity: string;
  priceFrom: string;
  badge?: string;
  tagline: string;
  intro: string;
  description: string;
  distribution: string[];
  features: string[];
  hero: Photo;
  gallery: Photo[];
};

const newPhotos = {
  smallGroundTv: {
    url: "/images/cabanas/pequenas/cabanas-pequenas-planta-baja-cama-tv.webp",
    alt: "Planta baja de una cabaña pequeña con cama matrimonial y televisión.",
    w: 360,
    h: 480,
  },
  smallBathroom: {
    url: "/images/cabanas/pequenas/cabanas-pequenas-bano-inodoro-regadera.webp",
    alt: "Baño privado de una cabaña pequeña con inodoro y regadera.",
    w: 360,
    h: 480,
  },
  smallDoubleBed: {
    url: "/images/cabanas/pequenas/cabanas-pequenas-cama-matrimonial-planta-baja.webp",
    alt: "Cama matrimonial en la planta baja de una cabaña pequeña.",
    w: 360,
    h: 480,
  },
  smallRoomTv: {
    url: "/images/cabanas/pequenas/cabanas-pequenas-habitacion-baja-cama-tv.webp",
    alt: "Habitación de planta baja con cama matrimonial y televisión.",
    w: 360,
    h: 480,
  },
  smallUpperBeds: {
    url: "/images/cabanas/pequenas/cabanas-pequenas-planta-alta-dos-camas.webp",
    alt: "Planta alta de una cabaña pequeña con una cama matrimonial y una cama individual.",
    w: 480,
    h: 360,
  },
  smallWoodInterior: {
    url: "/images/cabanas/pequenas/cabanas-pequenas-interior-madera-cama-escalera.webp",
    alt: "Interior de madera de una cabaña pequeña con cama y escalera hacia la planta alta.",
    w: 480,
    h: 320,
  },
  smallBalconyLake: {
    url: "/images/cabanas/pequenas/cabanas-pequenas-balcon-vista-lago-desde-interior.webp",
    alt: "Vista de la laguna desde el balcón de una cabaña pequeña.",
    w: 480,
    h: 320,
  },
  largeCoveredTerrace: {
    url: "/images/cabanas/grande/cabana-grande-terraza-techada-mesa-vista-indirecta.webp",
    alt: "Terraza techada de la Cabaña Grande con mesa y vista indirecta a la laguna.",
    w: 320,
    h: 180,
  },
  mayorLakeTerrace: {
    url: "/images/cabanas/mayor/cabana-mayor-terraza-vista-lago-huespedes.webp",
    alt: "Terraza de la Cabaña Mayor con vista directa al lago.",
    w: 320,
    h: 213,
  },
} satisfies Record<string, Photo>;

export const cabins: Cabin[] = [
  {
    id: "cabanas-pequenas",
    name: "Cabañas pequeñas",
    capacity: "Hasta 5 personas",
    priceFrom: "$750",
    tagline: "Dos niveles y un balcón frente al lago.",
    intro: "Cabañas acogedoras de dos niveles situadas frente al lago.",
    description:
      "En la planta baja encontrarás una cama matrimonial, baño privado al fondo y una pequeña televisión. Subiendo las escaleras se llega a la planta alta, donde hay una cama matrimonial y una cama individual, con salida directa a un balcón desde donde se puede contemplar la laguna.",
    distribution: [
      "Planta baja: 1 cama matrimonial, baño privado y TV.",
      "Planta alta: 1 cama matrimonial + 1 cama individual.",
      "Balcón con salida directa desde la planta alta y vista a la laguna.",
    ],
    features: ["Frente al lago", "Baño privado", "Balcón con vista al lago", "Interiores de madera"],
    hero: photos.p02,
    gallery: [
      newPhotos.smallGroundTv,
      newPhotos.smallUpperBeds,
      newPhotos.smallBalconyLake,
      newPhotos.smallDoubleBed,
      newPhotos.smallBathroom,
      newPhotos.smallWoodInterior,
      newPhotos.smallRoomTv,
      photos.p03,
      photos.p04,
      photos.p05,
      photos.p06,
      photos.p07,
      photos.p08,
    ],
  },
  {
    id: "cabana-cristal",
    name: "Cabaña Cristal",
    capacity: "2 personas",
    priceFrom: "$1,200",
    badge: "Ideal para parejas",
    tagline: "Dormir frente al lago, detrás del cristal.",
    intro: "La cabaña estrella de Cinco Lagos, exclusiva para dos personas.",
    description:
      "Es una cabaña de un solo ambiente con dos paredes de cristal orientadas directamente hacia el lago. La sensación es de estar muy cerca del agua y rodeado por el paisaje, pero conservando la comodidad, la privacidad y la protección del interior. Cuenta con baño privado y una vista espectacular, ideal para una escapada romántica.",
    distribution: [
      "Un solo ambiente exclusivo para 2 personas.",
      "Dos paredes de cristal orientadas directamente hacia el lago.",
      "Baño privado.",
    ],
    features: ["Vista directa al lago", "Dos paredes de cristal", "Baño privado", "Escapada romántica"],
    hero: photos.p09,
    gallery: [photos.p11, photos.p10, photos.p12],
  },
  {
    id: "cabana-grande",
    name: "Cabaña Grande",
    capacity: "Hasta 8 personas",
    priceFrom: "$1,200",
    tagline: "Más espacio para disfrutar Cinco Lagos en grupo.",
    intro: "Nuestra opción más cómoda para grupos grandes.",
    description:
      "En la planta superior hay un cuarto amplio con dos camas matrimoniales. En la planta baja hay dos habitaciones independientes, cada una con una cama matrimonial. Estos espacios se conectan mediante una pequeña sala de estar con sofá para dos personas, sillón individual, televisión, cafetera y microondas. La terraza techada y el pequeño balcón superior tienen vista indirecta a la laguna, entre vegetación, en un entorno privado y cómodo.",
    distribution: [
      "Planta alta: 1 habitación con 2 camas matrimoniales.",
      "Planta baja: 2 habitaciones, cada una con 1 cama matrimonial.",
      "Total: 4 camas matrimoniales · capacidad máxima de 8 personas.",
    ],
    features: [
      "3 habitaciones",
      "Sala de estar",
      "Sofá de dos plazas y sillón individual",
      "TV",
      "Cafetera y microondas",
      "Terraza techada",
      "Balcón superior",
      "Vista indirecta a la laguna",
      "Rodeada de vegetación",
    ],
    hero: photos.p13,
    gallery: [
      newPhotos.largeCoveredTerrace,
      photos.p17,
      photos.p15,
      photos.p16,
      photos.p14,
      photos.p18,
    ],
  },
  {
    id: "cabana-mayor",
    name: "Cabaña Mayor",
    capacity: "Hasta 8 personas",
    priceFrom: "$1,300",
    tagline: "Una terraza para quedarse mirando el lago.",
    intro: "Hasta 8 personas y una terraza con una hermosa vista directa al lago.",
    description:
      "Al entrar encontrarás un espacio interior compacto y optimizado con sofá cama y frigobar. Desde esta área se accede a dos habitaciones y a una escalera que lleva al tapanco, con espacios adicionales para dormir. La combinación de habitaciones, sofá cama y tapanco permite alojar hasta ocho personas. Su gran protagonista es la terraza frente al lago, pensada para sentarse, descansar y contemplar la laguna.",
    distribution: [
      "2 habitaciones.",
      "Sofá cama en el área central compacta.",
      "Tapanco con espacios adicionales para dormir.",
      "Capacidad total: hasta 8 personas.",
    ],
    features: [
      "Terraza con vista directa al lago",
      "2 habitaciones",
      "Sofá cama",
      "Frigobar",
      "Tapanco",
      "Baño privado",
      "Espacio interior compacto y optimizado",
    ],
    hero: newPhotos.mayorLakeTerrace,
    gallery: [photos.p22, photos.p19, photos.p20, photos.p24, photos.p23, photos.p21],
  },
];

export const PRICE_NOTE =
  "Las tarifas pueden variar según temporada, fechas y disponibilidad.";
