import { photos, type Photo } from "@/lib/photos";

export type Cabin = {
  id: string;
  hash: `#cabana-${string}`;
  name: string;
  capacity: string;
  priceFrom: string;
  intro: string;
  features: string[];
  hero: Photo;
  gallery: Photo[];
};

export const cabins: Cabin[] = [
  {
    id: "cabanas-pequenas",
    hash: "#cabana-pequena",
    name: "Cabañas pequeñas",
    capacity: "Hasta 5 personas",
    priceFrom: "$750",
    intro:
      "Cabañas acogedoras de dos niveles situadas frente al lago. En la planta baja hay una cama matrimonial, televisión y baño privado; arriba, una cama matrimonial y una individual con salida directa al balcón y vista a la laguna.",
    features: ["Hasta 5 personas", "Dos niveles", "2 camas matrimoniales y 1 individual", "Balcón con vista al lago", "Baño privado", "Televisión"],
    hero: photos.p02,
    gallery: [photos.p03, photos.p04, photos.p05, photos.p06, photos.p07, photos.p08],
  },
  {
    id: "cabana-cristal",
    hash: "#cabana-cristal",
    name: "Cabaña Cristal",
    capacity: "2 personas",
    priceFrom: "$1,200",
    intro:
      "La estrella de Cinco Lagos: un solo ambiente con dos paredes de cristal orientadas directamente hacia el lago. Permite disfrutar una cercanía espectacular con el paisaje conservando la comodidad, privacidad y protección del interior.",
    features: ["Exclusiva para 2 personas", "Un solo ambiente", "Dos paredes de cristal", "Vista directa al lago", "Baño privado", "Ideal para una escapada romántica"],
    hero: photos.p09,
    gallery: [photos.p10, photos.p11, photos.p12],
  },
  {
    id: "cabana-grande",
    hash: "#cabana-grande",
    name: "Cabaña Grande",
    capacity: "Hasta 8 personas",
    priceFrom: "$1,200",
    intro:
      "La opción más cómoda para grupos grandes. Arriba tiene una habitación amplia con dos camas matrimoniales; abajo, dos habitaciones con una cama matrimonial cada una, conectadas por una pequeña sala de estar. Es privada, está rodeada de vegetación y tiene terraza techada y balcón con vista indirecta a la laguna.",
    features: ["3 habitaciones", "4 camas matrimoniales", "Sala con dos sofás", "Televisión", "Cafetera y microondas", "Terraza techada", "Balcón superior", "Vista indirecta a la laguna"],
    hero: photos.p13,
    gallery: [photos.p14, photos.p15, photos.p16, photos.p17, photos.p18],
  },
  {
    id: "cabana-mayor",
    hash: "#cabana-mayor",
    name: "Cabaña Mayor",
    capacity: "Hasta 8 personas",
    priceFrom: "$1,300",
    intro:
      "Destaca por su terraza con una hermosa vista directa al lago. Al entrar hay un espacio interior compacto y optimizado con sofá cama y frigobar; desde ahí se accede a dos habitaciones y a las escaleras que llevan al tapanco con espacios adicionales para dormir.",
    features: ["Hasta 8 personas", "Terraza con vista directa al lago", "2 habitaciones", "Sofá cama", "Frigobar", "Tapanco con espacios para dormir", "Baño privado"],
    hero: photos.p22,
    gallery: [photos.p19, photos.p20, photos.p21, photos.p23, photos.p24],

  },
];

export const PRICE_NOTE =
  "Las tarifas pueden variar según temporada, fechas y disponibilidad.";
