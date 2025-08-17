const { DataTypes } = require("sequelize");

//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Prestamo = sequelize.define("prestamo", {
        id_prestamo:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_inicio: {
            type: Sequelize.STRING
        },
        fecha_fin: {
            type: Sequelize.STRING
        },
        precio_diario: {
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.STRING
        },
        devuelto:{
            type: Sequelize.STRING
        }
    });
    return Prestamo;
};