import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApuestasAsync, addApuestaAsync } from '../features/apuestas';

const ApuestasComponent = () => {
  const dispatch = useDispatch();
  const { apuestas = [], status, error } = useSelector((state) => state.apuestas || {});
  const [apuestaData, setApuestaData] = useState({ monto: '' });

  // Cargar apuestas al montar el componente
  useEffect(() => {
    dispatch(fetchApuestasAsync());
  }, [dispatch]);

  // Manejo de cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApuestaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apuestaData.monto) {
      alert('Por favor, ingresa el monto de la apuesta.');
      return;
    }
    dispatch(addApuestaAsync(apuestaData));
    setApuestaData({ monto: '' }); // Limpiar el formulario
  };

  return (
    <div>
      <h2>Apuestas</h2>
      {status === 'loading' && <p>Cargando...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="monto"
          value={apuestaData.monto}
          onChange={handleInputChange}
          placeholder="Monto de la apuesta"
          required
        />
        <button type="submit">Agregar Apuesta</button>
      </form>

      <h3>Apuestas Realizadas</h3>
      {apuestas.length === 0
        ? <p>No hay apuestas registradas.</p>
        : (
          <ul>
            {apuestas.map((apuesta, index) => (
              <li key={index}>
                Monto: ${apuesta.monto}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default ApuestasComponent;