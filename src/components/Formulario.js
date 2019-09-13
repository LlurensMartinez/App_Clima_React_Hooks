import React, {useState} from 'react';


const Formulario = ({datosConsulta}) => {

  // state del Component
  // busqueda = state, guardarBusqueda = this.setState({})
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais : ''
  })

  const handleChange = e =>{
    // cambiar el state
    guardarBusqueda({
      //copia del state ...busqueda
      ...busqueda,
      [e.target.name] :  e.target.value
    })
    
  }

  const consultarClima = e => {
    e.preventDefault();

    //Pasar Busqueda al componente principal
    datosConsulta(busqueda);
  }

  return (
    <form
        onSubmit={consultarClima}
    >
        <div className="input-field col s12">
          <input 
              type="text"
              name="ciudad"
              id="ciudad"
              onChange={handleChange}
              
              />
              <label htmlFor="ciudad">Ciudad: </label>
        </div>

        <div className="input-field col s12">
            <select 
                name="pais" 
                id="" 
                className=""
                onChange={handleChange}
                >
                    <option value="">Selecciona un país</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>

                </select>

                <div className="inoput-field col s12">
                    <input type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4"
                      value="Buscar Clima"
                    />
                </div>
        </div>
    </form>
  );
};

export default Formulario;