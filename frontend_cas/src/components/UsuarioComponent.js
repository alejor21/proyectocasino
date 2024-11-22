import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersAsync, addUserAsync } from '../features/usuarios';

const UsuariosComponent = () => {
  const dispatch = useDispatch();
  const { usuarios = [], status, error } = useSelector((state) => state.users || {});
  const [userData, setUserData] = useState({ email: '', password: '' });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  // Manejo de cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    dispatch(addUserAsync(userData));
    setUserData({ email: '', password: '' }); // Limpiar el formulario
  };

  return (
    <div>
      <h2>Usuarios</h2>
      {status === 'loading' && <p>Cargando...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email del usuario"
          required
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Contraseña del usuario"
          required
        />
        <button type="submit">Agregar Usuario</button>
      </form>
      
      <h3>Usuarios Registrados</h3>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>Email: {usuario.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsuariosComponent;