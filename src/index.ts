import "reflect-metadata"

import ApplicationContext from "./core/bootstrap/ApplicationContext.js"
import Container from "./core/di/Container.js"
import TesteController from "./api/TesteController.js"
import TesteService from "./api/TesteService.js"

const start = async () => {
    await ApplicationContext.init()
}

start()