import { existsSync, readFileSync } from 'node:fs'

const event = JSON.parse(readFileSync(new URL('../src/data/event.json', import.meta.url)))
const guests = JSON.parse(readFileSync(new URL('../src/data/guests.json', import.meta.url)))
const slugs = new Set()

for (const guest of guests) {
  if (!guest.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(guest.slug)) throw new Error(`Slug không hợp lệ: ${guest.slug}`)
  if (slugs.has(guest.slug)) throw new Error(`Slug bị trùng: ${guest.slug}`)
  if (!guest.name || !guest.group || !guest.message) throw new Error(`Khách ${guest.slug} thiếu name, group hoặc message`)
  slugs.add(guest.slug)
}

if (event.datetime && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(event.datetime)) {
  throw new Error('event.datetime cần dạng ISO có múi giờ, ví dụ 2026-12-20T18:00:00+07:00')
}

for (const image of [event.portrait, ...event.gallery].filter(Boolean)) {
  if (!image.startsWith('/images/') || !existsSync(new URL(`../public${image}`, import.meta.url))) {
    throw new Error(`Không tìm thấy ảnh: ${image}`)
  }
}

console.log(`Dữ liệu hợp lệ: ${guests.length} khách mời`)
