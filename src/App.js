import React, {Fragment, useState, useEffect} from 'react';
import './index.css';
import Form from './components/Form'
import Citas from './components/Citas'

function App() {

  // citas en el localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales = []
  }
  
  //creando el state de las citas
  const [citas, guardarCitas] = useState(citasIniciales)

  
  // useEffect para cuando algo cambia
  useEffect (()=> {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }
  }, [citas])
  


  // Función q cambia el state
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  // eliminar una cita
    const eliminarCita = id => {
    const citaEliminada = citas.filter(cita => cita.id !== id)
    guardarCitas(citaEliminada)
  }

  const titulo = citas.length ? "Administra tus Citas" : "No hay citas"


  return (
    <Fragment>
      <h1>Administración de pacientes</h1>
    
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <h1>Crear cita</h1>  
            <Form 
            crearCita= {crearCita}
            />
          </div>
          <div className='one-half column'>
            <h1>{titulo}</h1>  
            {citas.map(cita => (
              <Citas 
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
            
          </div>
        </div>
      </div>

    </Fragment>
    
    );
  }
  
  export default App;
  