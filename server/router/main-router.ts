
import viewControllers from '../controllers/view-controller/index'
import commonControllers from '../controllers/common-controller/index'
import * as Router from 'koa-router'
const multer = require('koa-multer')

class MainRouter {
  private upload: any
  private router: Router

  constructor () {
    this.router = new Router()
    this.setUpload()
  }

  private setUpload (): void {
    const uploadFileStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '../temp/')
      },
      filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
      }
    })
    this.upload = multer({ storage: uploadFileStorage })
  }

  public addRoutes (routes: Array<any>): void {
    routes.forEach(route => {
      switch (route.method) {
        case 'post':
          if (route.fileName) {
            this.router.post(route.uri, this.upload.single(route.fileName), route.fn)
          } else {
            this.router.post(route.uri, route.fn)
          }
          break
        case 'get':
          this.router.get(route.uri, route.fn)
          break
        default:
          console.log(`Invalid url: ${route}`)
      }
    })
  }

  public getRouter (): Router {
    return this.router
  }
}

const mainRouter: MainRouter = new MainRouter()
mainRouter.addRoutes(viewControllers)
mainRouter.addRoutes(commonControllers)

export default mainRouter.getRouter()

