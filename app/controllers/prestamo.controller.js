// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Prestamo = db.prestamos;
const Op = db.Sequelize.Op;



// Create and Save a new Prestamo
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.fecha_inicio) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a prestamo, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const prestamo = {
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        precio_diario: req.body.precio_diario, 
        total: req.body.total,
        devuelto: req.body.devuelto,
        //registro: req.body.registro,
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        //status: req.body.status ? req.body.status : false
    };

    // Save a new prestamo into the database
    Prestamo.create(prestamo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prestamo."
            });
        });
};

// Retrieve all Prestamo from the database.
exports.findAll = (req, res) => {
    const fecha_inicio = req.query.fecha_inicio;
    var condition = fecha_inicio ? { fecha_inicio: { [Op.iLike]: `%${fecha_inicio}%` } } : null;

    Prestamo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Prestamos."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Prestamo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prestamo with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Prestamo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prestamo with id=${id}. Maybe Prestamo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prestamo with id=" + id
            });
        });
};

// Delete a prestamo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Prestamo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Prestamo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prestamo with id=${id}. El Prestamo no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all pretamos from the database.
exports.deleteAll = (req, res) => {
    Prestamo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Prestamos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all prestamos."
            });
        });
};

// find all active Prestamo, basado en el atributo status vamos a buscar que solo los clientes activos
exports.findAllStatus = (req, res) => {
    Prestamo.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Prestamo."
            });
        }); 
};