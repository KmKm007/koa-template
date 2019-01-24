import { Context } from 'koa'

class TestController {

  public helloworld (ctx: Context): void{
    ctx.body = 'hellow world'
  }
}

const testController = new TestController()

export default [
  {
    uri: '/api/hello',
    method: 'get',
    fn: testController.helloworld
  }
]
