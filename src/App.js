import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Error from './components/Error'
import Clima from './components/Clima'


function App() {

  //State Principal
  //Ciudad = state, guardar ciudad = this.setState()
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ] = useState('');
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado ] = useState({})

  // Sustituye a componentDidMount
  useEffect(() => {

    //Prevenir ejecucion
    if(ciudad === '') return;

    const consultarAPI = async () => {

      const apiKey='d049c7cad50382f92aaa92045acf4f8a'
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
  
      // consultar la URL
      const respuesta = await fetch(url);
      const resultadoAPI = await respuesta.json();

      guardarResultado(resultadoAPI)
    }

    consultarAPI();
  }, [ ciudad, pais ]) // si hay un cambio en ciudad o pais se vuelve a llamar a la Api

  const datosConsulta = datos => {
    // Validar que ambos datos esten
    if(datos.ciudad === '' || datos.pais === '') {
      //un error
      guardarError(true)
      return;
    }

    //Ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad)
    guardarPais(datos.pais)
    guardarError(false)
  }

  //Cargar un componente Condicionalmente

  let componente;
  if(error) {
    //Hay un error, mostrarlo
    componente = <Error mensage='Ambos campos son obligatorios' />
  } else if (resultado.cod === "404"){
    componente = <Error mensage="La ciudad no existe en nuestro registro"/>
  } else {
    componente = <Clima 
                    resultado={resultado}
                  />
  }
  
    return (
    <div>
        <Header 
          titulo = 'Clima React App'
        
        />
    
        <div className="contenedor-form">
            <div className="container">
                  <div className="row">
                      <div className="col s12 m6">
                          <Formulario 
                              datosConsulta={datosConsulta}
                          />
                      </div>

                      <div className="col s12 m6">
                          {componente}
                      </div>
                  </div>
            </div>
        </div>

    </div>
  );
}

export default App;
