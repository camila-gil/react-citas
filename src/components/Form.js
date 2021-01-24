import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Form = ({crearCita}) => {
    
    //creando un state de las citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        dueño: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    // State errores
    const [error, actualizarError] = useState(false)

    //función que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
        
    }

    
    // Extraer los valores
    const {mascota, dueño, fecha, hora, sintomas} = cita;


    // Cuando el usuario envía el formulario
    const submitCita = e => {
        e.preventDefault();

        // Validar Formulario
        if(mascota.trim() === '' || dueño.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true)
            return;
        }

        // Eliminar mensaje previo
        actualizarError(false)

        // Asignarle un ID
        cita.id = uuidv4()
        
        // Crear la cita
        crearCita(cita)

        // Reiniciar el Form
        actualizarCita({
            mascota: '',
            dueño: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }


    return ( 
        <Fragment>
            

            {error ? <p className='alerta-error'>Todos los campos son obligatorios</p> : null}

            <form
                onSubmit = {submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='dueño'
                    className='u-full-width'
                    placeholder='Nombre dueño'
                    onChange={actualizarState}  
                    value={dueño} 
                />
                
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                
                <label>Síntomas</label>
                <textarea
                    name='sintomas'
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                
                <button 
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
        );
    }

    Form.propTypes = {
        crearCita: PropTypes.func.isRequired
    }
    
    export default Form;