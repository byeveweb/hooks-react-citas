import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({ crearCita }) => {


    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    //Ver error
    const [error, actualizarError] = useState(false)


    //Función que se ejecuta para escribir en el input
    const actualizarState = e => {
        console.log(e.target.value)
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita

    //Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault()

        // Validar
        if (mascota.trim() === ''
            || propietario.trim() === ''
            || fecha.trim() === ''
            || hora.trim() === ''
            || sintomas.trim() === '') {

            actualizarError(true)
            return
        }

        //Eliminar mensaje previo
        actualizarError(false)

        //Asignar id
        cita.id = uuidv4()

        //Crear la cita
        crearCita(cita)


        //Reiniciamos el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })


    }



    return (

        <>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form
                onSubmit={submitCita}>

                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre dueño mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha Alta</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora Alta</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>

                <button type="submit" className="u-full-width button-primary">Agregar Cita</button>
            </form>
        </>

    );
}


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;