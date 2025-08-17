module.exports = app => {

    
    const prestamos = require("../controllers/cliente.controller.js");
    var router = require("express").Router();
    // Create a new prestamos
    router.post("/create/", prestamos.create);
    // Retrieve all prestamos
    router.get("/", prestamos.findAll);
    // Retrieve all published prestamos
    router.get("/status", prestamos.findAllStatus);
    // Retrieve a single prestamos with id
    router.get("/:id", prestamos.findOne);
    // Update a prestamos with id
    router.put("/update/:id", prestamos.update);
    // Delete a prestamos with id
    router.delete("/delete/:id", prestamos.delete);
    // Delete all prestamos
    router.delete("/delete/", prestamos.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/prestamos/
    app.use("/api/prestamo", router);
};