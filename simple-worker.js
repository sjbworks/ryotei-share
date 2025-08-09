export default {
  async fetch(request, env, ctx) {
    console.log('Simple worker started')
    return new Response('Hello from Cloudflare Worker!', {
      headers: { 'Content-Type': 'text/plain' },
    })
  },
}
