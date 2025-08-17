module.exports = app => {

    
    const vehiculos = require("../controllers/cliente.controller.js");
    var router = require("express").Router();
    // Create a new vehivulo
    router.post("/create/", vehiculos.create);
    // Retrieve all vehiculos
    router.get("/", vehiculos.findAll);
    // Retrieve all published vehiculo
    router.get("/status", vehiculos.findAllStatus);
    // Retrieve a single vehiculo with id
    router.get("/:id", vehiculos.findOne);
    // Update a vehiculo with id
    router.put("/update/:id", vehiculos.update);
    // Delete a vehiculo with id
    router.delete("/delete/:id", vehiculos.delete);
    // Delete all vehiculo
    router.delete("/delete/", vehiculos.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/vehiculo/
    app.use("/api/vehiculo", router);
};