import * as Koa from 'koa'
import { Builder, Nuxt } from 'nuxt'
import mainRouter from './router/main-router'
import * as config from '../nuxt.config.js'

class Server {
  private app: Koa
  private port: string | number
  private host: string

  constructor () {
    this.host = process.env.HOST || '127.0.0.1'
    this.port = process.env.PORT || 3000
    this.app = new Koa()
    this.start()
  }

  private start = async (): Promise<void> => {
    let promise
    const app = this.app
    config.dev = !(app.env === 'production')

    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    // Build in development
    if (config.dev) {
      const builder = new Builder(nuxt)
      promise = await builder.build()
    }

    app
    .use(mainRouter.routes())
    .use(mainRouter.allowedMethods())
    .use((ctx) => {
      ctx.status = 200
      ctx.respond = false // Mark request as handled for Koa
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    })

    app.listen(this.port, this.host)
    return
  }
}

export default new Server()
