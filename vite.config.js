import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Runs the Vercel function in api/contact.js during `npm run dev`,
// so the contact form works locally without `vercel dev`.
const contactApiDev = (env) => ({
  name: 'contact-api-dev',
  apply: 'serve',
  configureServer(server) {
    for (const key of ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'CONTACT_TO', 'SITE_URL']) {
      if (env[key]) process.env[key] = env[key]
    }
    server.middlewares.use('/api/contact', async (req, res) => {
      let raw = ''
      for await (const chunk of req) raw += chunk
      try {
        req.body = raw ? JSON.parse(raw) : {}
      } catch {
        req.body = raw
      }
      res.status = (code) => {
        res.statusCode = code
        return res
      }
      res.json = (obj) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(obj))
        return res
      }
      const { default: handler } = await server.ssrLoadModule('/api/contact.js')
      await handler(req, res)
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), contactApiDev(env)],
  }
})
