// Datos de contacto y marca — editar aquí y se actualiza todo el sitio.
export const SITE = {
  name: "Cinco Lagos",
  tagline: "Cabañas · Montebello · Chiapas",
  slogan: "La vista es parte del viaje.",
  whatsappNumber: "525638844112",
  phoneDisplay: "56 3884 4112",
  facebookUrl: "https://www.facebook.com/CabanasMirador5Lagos",
  googleMapsUrl:
    "https://maps.app.goo.gl/r9jaXho8BMMrAYKr5?g_st=ic",
  address: "Lagunas de Montebello, La Trinitaria, Chiapas, México",
} as const;

export function whatsappLink(
  message = "Hola, quiero consultar disponibilidad en Cinco Lagos.",
) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function cabinWhatsappLink(cabinName: string) {
  return whatsappLink(
    `Hola, estoy interesado en consultar disponibilidad para la ${cabinName} de Cinco Lagos.`,
  );
}

export type AvailabilityQuery = {
  arrival: string;
  departure: string;
  cabin: string;
  guests: number;
};

export function availabilityWhatsappLink({
  arrival,
  departure,
  cabin,
  guests,
}: AvailabilityQuery) {
  const mensaje = `Hola, quiero consultar disponibilidad en Cinco Lagos.\n\nFecha de llegada: ${arrival}\nFecha de salida: ${departure}\nCabaña: ${cabin}\nNúmero de personas: ${guests}\n\n¿Me pueden confirmar si está disponible y compartirme más información para reservar?\n\nGracias.`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
}
