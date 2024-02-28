var registroController = {}
var registroModel = require("../modelos/registroModel.js").registroModel

registroController.guardar = function (request, response) {
    var info = {
        nombres: request.body.nombres,
        cedula: request.body.cedula,
        celular: request.body.celular,
        direccion: request.body.direccion,
        email: request.body.email,
        clave: request.body.clave,
    }

    if (info.nombres == null || info.nombres == undefined || info.nombres == "") {
        response.json({ state: false, mensaje: "El nombres es un campo obligatorio para poder registrarse" })
        return false
    }

    if (info.cedula == null || info.cedula == undefined || info.cedula == "") {
        response.json({ state: false, mensaje: "El número de coumento de identidad es un campo obligatorio para poder registrarse" })
        return false
    }


    if (info.email == null || info.email == undefined || info.email == "") {
        response.json({ state: false, mensaje: "El email es un campo obligatorio para poder registrarse" })
        return false
    }

    if (info.clave == null || info.clave == undefined || info.clave == "") {
        response.json({ state: false, mensaje: "La clave es un campo obligatorio para poder registrarse" })
        return false
    }

    if (info.clave.length < 6) {
        response.json({ state: false, mensaje: "La clave debe contar con más de 6 caracteres" })
        return false
    }

    registroModel.buscar(info, function (posicion) {

        if (posicion.length == 0) {
            registroModel.guardar(info, function (respuesta) {
                response.json(respuesta)
            })
        } else {
            response.json({ state: false, mensaje: "El correo o el número de identificación ya se encuentran registrados" })
            return false
        }
    })
}

registroController.listar = function (request, response) {
    registroModel.listar(null, function (respuesta) {
        response.json(respuesta)
    })
}

registroController.login = function (request, response) {
    var info = {
        clave: request.body.clave,
        cedula: request.body.cedula
    }

    if (info.cedula == null || info.cedula == undefined || info.cedula == "" && info.cedula == "Prueba") {
        response.json({ state: false, mensaje: "El número de coumento de identidad es un campo obligatorio para poder registrarse" })
        return false
    }

    if (info.clave == null || info.clave == undefined || info.clave == "" && info.clave == 123456789) {
        response.json({ state: false, mensaje: "La clave es un campo obligatorio para poder registrarse" })
        return false
    }

    registroModel.busquedaCredenciales(info, function (posicion) {
        console.log(posicion.length)
        if (posicion.length == 0) {
            response.json({ state: false, mensaje: "credenciales inválidas" })
            return false
        } else {

            registroModel.login(info, function (respuesta) {
                response.json({ state: true, mensaje: "Bienvenido" })
                return false
            })

        }
    })

}

registroController.registroactividad = function (request, response) {
    var info = {
        cedula: request.body.cedula
    }

    if (info.cedula == null || info.cedula == undefined || info.cedula == "") {
        response.json({ state: false, mensaje: "El número de coumento de identidad es un campo obligatorio para poder registrarse" })
        return false
    }

    regisitroModel.minuta(info, function (informe) {
        response.json(informe)
    })

}

registroController.actualizarpassword = function (request, response) {
    var info = {
        cedula: request.body.cedula,
        clave: request.body.clave,
        nuevaclave: request.body.nuevaclave
    }

    if (info.cedula == null || info.cedula == undefined || info.cedula == "") {
        response.json({ state: false, mensaje: "El número de documento de identidad es necesario" })
        return false
    }

    if (info.clave == null || info.clave == undefined || info.clave == "") {
        response.json({ state: false, mensaje: "La clave es necesaria" })
        return false
    }

    if (info.clave.length < 6) {
        response.json({ state: false, mensaje: "La clave debe contar con más de 6 caracteres" })
        return false
    }

    if (info.nuevaclave == null || info.nuevaclave == undefined || info.nuevaclave == "") {
        response.json({ state: false, mensaje: "Digita tu nueva clave" })
        return false
    }

    if (info.nuevaclave.length < 6) {
        response.json({ state: false, mensaje: "La nueva clave debe contar con más de 6 caracteres" })
        return false
    }

    registroModel.busquedaCredenciales(info, function (posicion) {
        console.log(posicion.length)
        if (posicion.length == 0) {
            response.json({ state: false, mensaje: "credenciales inválidas" })
            return false
            } else {
                registroModel.actualizarPassword(info, function (respuesta) {
                    response.json(respuesta)
                })
        
            }
        })
        
}

registroController.eliminarUsuario = function (request, response) {
    var info = {
        cedula: request.body.cedula,
        clave: request.body.clave
    }

    if (info.cedula == null || info.cedula == undefined || info.cedula == "") {
        response.json({ state: false, mensaje: "El número de coumento de identidad es un campo obligatorio para poder registrarse" })
        return false
    }

    if (info.clave == null || info.clave == undefined || info.clave == "") {
        response.json({ state: false, mensaje: "La clave es un campo obligatorio para poder registrarse" })
        return false
    }

    registroModel.eliminarUsuario(info, function (respuesta) {
        response.json(respuesta)
        return false
    })

}

registroController.actualizarDatos = function (request, response) {
    var info = {
        cedula: request.body.cedula,
        clave: request.body.clave,
        celular: request.body.celular,
        direccion: request.body.direccion,
    }

    if (info.cedula == null || info.cedula == undefined || info.cedula == "") {
        response.json({ state: false, mensaje: "El número de documento de identidad es un campo obligatorio para poder actualizar tus datos" })
        return false
    }

    if (info.clave == null || info.clave == undefined || info.clave == "") {
        response.json({ state: false, mensaje: "La clave es un campo obligatorio para poder acceder" })
        return false
    }

    registroModel.buscarUsuario(info, function (posicion) {
        if (posicion.length == 0) {
            response.json({ state: false, mensaje: "credenciales inválidas, no es posible acceder a la actulización" })
        } else {
            if (info.celular == null || info.celular == undefined || info.celular == "") {
                response.json({ state: false, mensaje: "por favor digite su nueva número de celular es un campo obligatorio para poder registrarse" })
                return false
            }
            
            registroModel.actualizarDatos(info, function (respuesta) {
                response.json(respuesta)
                return false
            })
        }
    })
}
module.exports.registroController = registroController