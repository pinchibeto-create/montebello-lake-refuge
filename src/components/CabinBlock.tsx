import { photos, type Photo } from "@/lib/photos";
import { PhotoGrid } from "@/components/PhotoGallery";
import { whatsappLink } from "@/lib/site";
import { IconArrow } from "@/components/Icons";

export type Cabin = {
  id: string;
  name: string;
  capacity: string;
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
    intro:
      "Cabañas tipo A-frame con fachadas de colores, interiores de madera y balcón con vista al lago. Ideales para parejas o familias pequeñas.",
    features: ["Baño privado", "Balcón con vista al lago", "Interiores de madera", "Camas matrimoniales e individual"],
    hero: photos.p02,
    gallery: [photos.p03, photos.p04, photos.p05, photos.p06, photos.p07, photos.p08],
  },
  {
    id: "cabana-cristal",
    name: "Cabaña de cristal",
    capacity: "Hasta 2 personas",
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
    intro:
      "La más amplia: sala con vista al lago, escalera a planta alta, terraza para ver el atardecer y baño privado.",
    features: ["Sala con vista al lago", "Terraza amplia", "Planta alta con habitaciones", "Baño privado"],
    hero: photos.p19,
    gallery: [photos.p20, photos.p21, photos.p22, photos.p23, photos.p24],
  },
];

export function CabinBlock({ cabin, index }: { cabin: Cabin; index: number }) {
  const reverse = index % 2 === 1;

  return (
    <article id={cabin.id} className="border-t border-border py-14 md:py-20">
      <div className={`grid items-center gap-8 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="overflow-hidden rounded-sm bg-forest">
          <img
            src={cabin.hero.url}
            alt={cabin.hero.alt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-turquoise">
            {String(index + 1).padStart(2, "0")} · {cabin.capacity}
          </p>
          <h3 className="mt-3 text-3xl leading-tight md:text-4xl">{cabin.name}</h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{cabin.intro}</p>

          <ul className="mt-6 grid gap-2 text-sm text-foreground/90 sm:grid-cols-2">
            {cabin.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-turquoise" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(`Hola, quiero consultar disponibilidad de la ${cabin.name} en Cinco Lagos.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border-b border-turquoise pb-1 text-sm font-medium text-turquoise transition hover:gap-3"
          >
            Consulta disponibilidad
            <IconArrow className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-8">
        <PhotoGrid photos={cabin.gallery} aspect="aspect-[4/3]" />
      </div>
    </article>
  );
}
