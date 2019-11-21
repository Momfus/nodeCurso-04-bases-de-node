/*

configurar comando crear (necesita descripcion -d), actualizar (necesita descripcion -d y completado con -c con valor por defecto true), 

que funcione con help

*/

const descripcion = {

    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'

};

const completado = {

    alias: 'c',
    default: true,
    type: 'boolean' ,
    desc: 'Marca como completado o pendiente la tarea'


};

const argv = require( 'yargs' )
                .command( 'crear', 'Crear un elemento por hacer', {
                        descripcion
                    }
                )
                .command( 'actualizar', 'Actualiza el estado completado de una tarea', {

                        descripcion,
                        completado

                    } 
                )
                .command( 'borrar', 'Elimina un elemento de la lista de tareas', {

                        descripcion

                    }
                )
                .help()
                .argv;


module.exports = {

    argv

};