const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const Handlebars = require('handlebars')
const tplPath = path.join(__dirname, '../template/index.html')
let template = fs.readFileSync(tplPath)
 template = Handlebars.compile(template.toString())


module.exports = async function matchRoute(req, res, filePath, config){
    try{
        const { root } = config
        res.statusCode = 200
        const stats = await stat(filePath)
        
        if (stats.isFile()){
            res.setHeader('Content-Type', 'text/plain')
            fs.createReadStream(filePath).pipe(res)
        }
        
        
        if (stats.isDirectory()) {
            res.setHeader('Content-Type', 'text/html')
            const files = await readdir(filePath)
            const dir = path.relative(root, filePath)
           
            const data = {
                dir: dir?`/${dir}`:'',
                files
            }
            res.end(template(data))
        }

    }catch(err){
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not directory or file ${err}`)
    }
}