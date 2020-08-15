import React, { useState, useEffect } from 'react';
import Formulario from './Fomulario'
import Cita from './Cita'

function App() {


  //Citas en LocalStore
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if (!citasIniciales) {
    citasIniciales = []
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales)

  //Use Effect para realizar algunas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas])

  //Función que traiga las citas y agrege la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //Función que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional 
  const tilulo = citas.length === 0 ? 'No hay citas' : 'administra tus citas'

  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{tilulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
