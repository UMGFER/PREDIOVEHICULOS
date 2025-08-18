const { DataTypes } = require("sequelize");

//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Vehiculo = sequelize.define("vehiculo", {
        id_vehiculo:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        marca: {
            type: Sequelize.STRING
        },
        anio: {
            type: Sequelize.DATE
        },
        modelo: {
            type: Sequelize.STRING
        },
        tipo: {
            type: Sequelize.STRING
        },
        
        matricula: {
            type: Sequelize.STRING
        },
        disponible:{
            type: Sequelize.STRING
        }
    });
    return Vehiculo;
};