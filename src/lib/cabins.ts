import { photos, type Photo } from "@/lib/photos";

export type Cabin = {
  id: string;
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
    name: "Cabañas pequeñas",
    capacity: "Hasta 5 personas",
    priceFrom: "$750",
    intro:
      "Cabañas tipo A-frame con fachadas de colores, interiores de madera y balcón con vista al lago. Ideales para parejas o familias pequeñas.",
    features: ["Baño privado", "Balcón con vista al lago", "Interiores de madera", "Camas matrimoniales e individual"],
    hero: photos.p02,
    gallery: [photos.p03, photos.p04, photos.p05, photos.p06, photos.p07, photos.p08],
  },
  {
    id: "cabana-cristal",
    name: "Cabaña de cristal",
    capacity: "2 personas",
    priceFrom: "$1,200",
    intro:
      "Ventanales de piso a techo frente al agua: el lago entra a la habitación. La opción más íntima del complejo.",
    features: ["Vista panorámica al lago", "Terraza privada", "Baño privado", "Para dos personas"],
    hero: photos.p09,
    gallery: [photos.p10, photos.p11, photos.p12],
  },
  {
    id: "cabana-grande",
    name: "Cabaña grande",
    capacity: "Hasta 8 personas",
    priceFrom: "$1,200",
    intro:
      "Dos plantas con habitaciones amplias de madera, terraza cubierta y baño privado con acabados en gris y negro.",
    features: ["Dos plantas", "Varias habitaciones matrimoniales", "Terraza cubierta", "Baño privado"],
    hero: photos.p13,
    gallery: [photos.p14, photos.p15, photos.p16, photos.p17, photos.p18],
  },
  {
    id: "cabana-mayor",
    name: "Cabaña mayor",
    capacity: "Hasta 8 personas",
    priceFrom: "$1,300",
    intro:
      "La más amplia: sala con vista al lago, escalera a planta alta, terraza para ver el atardecer y baño privado.",
    features: ["Sala con vista al lago", "Terraza amplia", "Planta alta con habitaciones", "Baño privado"],
    hero: photos.p19,
    gallery: [photos.p20, photos.p21, photos.p22, photos.p23, photos.p24],
  },
];

export const PRICE_NOTE =
  "Las tarifas pueden variar según temporada, fechas y disponibilidad.";
