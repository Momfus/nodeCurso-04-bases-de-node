// Mantener tarea persistente

const fs = require('fs'); // Usar file system

let listadoPorHacer =  [];

// Crear archivo persistente
const guardarDB = () => {

    let data = JSON.stringify( listadoPorHacer );

    fs.writeFile('db/data.json', data, (err) => {

        if( err ) {
            throw new Error('No se pudo grabar', err);
        }

    });

};

// Cargar Json
const cargarDB = () => {


    try {
        
        listadoPorHacer = require('../db/data.json');
        
    } catch (error) {
        
        listadoPorHacer = [];

    }

};


// Devolver el listado
const getListado = () => {

    cargarDB();
    return listadoPorHacer;
    

};

// Actualizar estado de tarea
const actualizar = (descripcion, completado = ture ) => {

    cargarDB();

    // si no lo encontró, devuelve -1 sino nos da la posición index del elemento
    let index = listadoPorHacer.findIndex( tarea => {
      
        return tarea.descripcion === descripcion;
        
    } );

    if( index >= 0 ) {

        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true; // Si lo encontró con éxito

    }

    return false; // En caso de no encontrarlo

};

// Crear tarea
const crear = ( descripcion ) => {

    cargarDB();

    let porHacer = {

        descripcion, // idem que descripcion : descripcion
        completado: false

    };

    listadoPorHacer.push( porHacer );
    guardarDB();
    
    return porHacer;

};

// Borrar elemento del arreglo
const borrar = ( descripcion ) => {

    cargarDB();


    let nuevoListado = listadoPorHacer.filter( tarea => {
        return tarea.descripcion !== descripcion;
    } );
    

    if ( listadoPorHacer.length === nuevoListado.length ) {

        return false; // Si tienen el mismo largo, es que no se eliminó ningun elemento

    } else {

        listadoPorHacer = nuevoListado;
        guardarDB();
        return true; 

    }

    

};

// Exportar los metodos
module.exports = {

    crear,
    getListado,
    actualizar,
    borrar

};
