import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// URL base del backend de usuarios
const BASE_URL = 'http://localhost:3100/usuarios'; // Asegúrate de que esta sea la URL correcta

// Acción para obtener todos los usuarios
export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${BASE_URL}/mostrar`);  // Usando la ruta '/mostrar'
  return response.data.usuarios;  // Verifica que aquí estés devolviendo la lista de usuarios
});

// Acción para agregar un nuevo usuario
export const addUserAsync = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post(`${BASE_URL}/crear`, userData);  // Usando la ruta '/crear'
  return response.data.usuario;  // Retorna el usuario creado
});

const usuariosFeatures = createSlice({
  name: 'users',
  initialState: {
    usuarios: [],  // Para almacenar los usuarios
    status: 'idle',  // Estado de la solicitud (idle, loading, succeeded, failed)
    error: null,  // Para manejar posibles errores
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cuando comienza la acción (se está obteniendo la lista de usuarios)
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      // Si la obtención de usuarios es exitosa
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usuarios = action.payload;  // Guarda todos los usuarios obtenidos
      })
      // Si la obtención de usuarios falla
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;  // Almacena el error si ocurre
      })
      // Cuando comienza la acción de agregar un usuario
      .addCase(addUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      // Si el usuario es agregado exitosamente
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usuarios.push(action.payload);  // Agrega el nuevo usuario a la lista
      })
      // Si agregar el usuario falla
      .addCase(addUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;  // Almacena el error si ocurre
      });
  },
});

export default usuariosFeatures;
