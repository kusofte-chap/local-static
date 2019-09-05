const http = require('http')
const path = require('path')
const chalk = require('chalk')
const openUrl = require('./commom/openUrl')
const config = require('./config/index')
const matchRoute = require('./commom/router')



class Server {
    constructor(conf) {
        this.config = Object.assign({},config,  conf) 
    }
    start (){
        const { host, port, root} = this.config
        const server = http.createServer((req, res)=>{
            const { url } = req
           
            const filePath = path.join(root, url)
           
            matchRoute(req, res, filePath, this.config)
        })
        
        server.listen(port, host, ()=>{
            const addir = `http://${host}:${port}`
            console.log(chalk.green(`the server running at: ${addir}`))
            openUrl(addir)
        })
    }
}

module.exports = Server
