const http = require('http')
const port = 9000
const url = require('url')
const fs = require('fs')
const path = require('path')
const indexPath = path.resolve(__dirname,'static/index.html')
const aboutPath = path.resolve(__dirname,'static/about.html')
let responseGlobal =""

const server = http.createServer(function (req,res){
const myUrl = url.parse(req.url)
   responseGlobal = res
   if(myUrl.pathname === "/about"){
    fs.access(aboutPath,fs.constants.F_OK,handlerAccesoArchivo)
   }else{
    if(myUrl.pathname === "/index"){
        fs.access(indexPath,fs.constants.F_OK,handlerAccesoArchivo)
    }
   }
    //res.writeHead(200,{'Content-Type': 'text/plain'})
    //res.write(myURL.pathname)
    //res.end()
    //console.log(req.url)
})
server.listen(port)



function handlerLeerArchivo(err,contenidoArchivo){
    if(err){
        console.log("error al leer")
    }else{
        console.log("el contenido es:" + contenidoArchivo)
        responseGlobal.write(contenidoArchivo)
        responseGlobal.end()
    }
}

function handlerAccesoArchivo(err){
    if(err){
        console.log("no existe")
    }else{
        console.log("si existe")
        fs.readFile(aboutPath,'utf-8',handlerLeerArchivo)
    }   
}



//console.log("ejecucion continua")

