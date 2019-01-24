import { Context } from 'koa'

class TestController {
  public async showTest (ctx: Context): Promise<void> {
    ctx.body = 123
  }
}

const testController = new TestController()

export default [
  {
    uri: '/api/test123',
    method: 'get',
    fn: testController.showTest
  },
]
