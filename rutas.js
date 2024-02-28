var registroController = require("./api/controladores/registroController").registroController

app.post("/registro/guardar", function (request, response) {
    registroController.guardar(request, response)
})

app.post("/registro/listar", function (request, response) {
    registroController.listar(request, response)
})

app.post("/registro/login", function (request, response) {
    registroController.login(request, response)
})

app.post("/registro/minuta", function (request, response) {
    registroController.registroactividad(request, response)
})

app.post("/registro/actualizarpassword", function (request, response) {
    registroController.actualizarpassword(request, response)
})

app.post("/registro/eliminarUsuario", function (request, response) {
   registroController.eliminarUsuario(request, response)
})

app.post("/registro/actualizarDatos", function(request, response){
    registroController.actualizarDatos(request,response)
})




var productoController = require("./api/controladores/productoController.js").productoController

app.post("/producto/guardar", function (request, response) {
    productoController.guardar(request, response)
})

app.post("/producto/listar", function (request, response) {
    productoController.listar(request, response)
})

app.post("/producto/buscarId", function(request, response){
    productoController.buscarId(request, response)
})

app.post("/producto/eliminarProducto", function (request, response) {
   productoController.eliminarProducto(request, response)
})

app.post("/producto/actualizarProducto", function(request, response){
    productoController.actualizarProducto(request,response)
})