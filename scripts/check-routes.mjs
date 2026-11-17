import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { default: InvitationTemplate } = await server.ssrLoadModule('/src/templates/InvitationTemplate.jsx')
  const { default: event } = await server.ssrLoadModule('/src/data/event.json')
  const { default: guests } = await server.ssrLoadModule('/src/data/guests.json')
  const render = (path) => renderToString(createElement(MemoryRouter, { initialEntries: [path] }, createElement(App)))

  assert.match(render('/invitation/khach-moi-mau'), /Khách mời mẫu/)
  assert.match(render('/invitation/nguoi-than-mau'), /Người thân mẫu/)
  assert.match(render('/invitation/khong-ton-tai'), /Lời mời này/)
  assert.match(render('/'), /Xem thiệp mẫu/)
  const opened = renderToString(createElement(InvitationTemplate, { event, guest: guests[0], musicSignal: 0 }))
  assert.match(opened, /NGÔN NGỮ ANH/i)
  assert.match(opened, /Có bạn chung vui/)
  assert.match(opened, /Ngày và giờ sẽ được cập nhật/)
  assert.match(opened, /portrait-main\.jpg/)
  assert.match(opened, /travel-04\.jpg/)
  console.log('Các route mẫu và route 404 hiển thị đúng')
} finally {
  await server.close()
}
