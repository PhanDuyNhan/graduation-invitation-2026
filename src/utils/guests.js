import guests from '../data/guests.json'

export function getGuestBySlug(slug) {
  return guests.find((guest) => guest.slug === slug)
}
