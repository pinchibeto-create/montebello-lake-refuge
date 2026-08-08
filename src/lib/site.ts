// Datos de contacto y marca — editar aquí y se actualiza todo el sitio.
export const SITE = {
  name: "Cinco Lagos",
  tagline: "Cabañas · Montebello · Chiapas",
  slogan: "La vista es parte del viaje.",
  whatsappNumber: "529612559561",
  phoneDisplay: "961 255 9561",
  facebookUrl: "https://www.facebook.com/CabanasMirador5Lagos",
  // Reemplazar por el enlace exacto de Google Maps cuando esté disponible.
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cabañas+Mirador+5+Lagos+Montebello+Chiapas",
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
  const mensaje = `Hola, quiero consultar disponibilidad en Cinco Lagos.

Fecha de llegada: ${arrival}
Fecha de salida: ${departure}
Cabaña: ${cabin}
Número de personas: ${guests}

¿Me pueden confirmar si está disponible y compartirme más información para reservar?

Gracias.`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
}
