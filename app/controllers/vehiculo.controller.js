// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Vehiculo = db.vehiculos;
const Op = db.Sequelize.Op;



// Create and Save a new Vehiculo
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.marca) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Vehiculo, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const vehiculo = {
        marca: req.body.marca,
        anio: req.body.anio,
        modelo: req.body.modelo, 
        tipo: req.body.tipo,
        modelo: req.body.modelo,
        disponible: req.body.disponible,
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        //status: req.body.status ? req.body.status : false
    };

    // Save a new Vehiculo into the database
    Vehiculo.create(vehiculo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });
};

// Retrieve all Vehiculo from the database.
exports.findAll = (req, res) => {
    const marca = req.query.marca;
    var condition = marca ? { marca: { [Op.iLike]: `%${marca}%` } } : null;

    Vehiculo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving vehiculos."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Vehiculo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vehiculo with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Vehiculo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehiculo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vehiculo with id=${id}. Maybe Vehiculo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vehiculo with id=" + id
            });
        });
};

// Delete a Vehiculo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Vehiculo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehiculo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vehiculo with id=${id}. El vehiculo no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Vehiculo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Vehiculo were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all vehiculos."
            });
        });
};

// find all active Vehiculo, basado en el atributo status vamos a buscar que solo los clientes activos
exports.findAllStatus = (req, res) => {
    Vehiculo.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving vehiculo."
            });
        }); 
};