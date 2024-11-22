import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// URL base del backend de apuestas
const BASE_URL = 'http://localhost:3200/juegos';  // Asegúrate de que esta sea la URL correcta

// Acción para obtener todas las apuestas
export const fetchApuestasAsync = createAsyncThunk('apuestas/fetchApuestas', async () => {
  const response = await axios.get(`${BASE_URL}/apuestas`);  // Usando la ruta '/mostrar'
  return response.data.apuestas;  // Retorna todas las apuestas
});

// Acción para agregar una nueva apuesta
export const addApuestaAsync = createAsyncThunk('apuestas/addApuesta', async (apuestaData) => {
  const response = await axios.post(`${BASE_URL}/apostar`, apuestaData);  // Usando la ruta '/crear'
  return response.data.apuesta;  // Retorna la apuesta creada
});

const apuestasFeatures = createSlice({
  name: 'apostar',
  initialState: {
    apuestas: [],  // Para almacenar las apuestas
    status: 'idle',  // Estado de la solicitud (idle, loading, succeeded, failed)
    error: null,  // Para manejar posibles errores
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cuando comienza la acción (se está obteniendo la lista de apuestas)
      .addCase(fetchApuestasAsync.pending, (state) => {
        state.status = 'loading';
      })
      // Si la obtención de apuestas es exitosa
      .addCase(fetchApuestasAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.apuestas = action.payload;  // Guarda todas las apuestas obtenidas
      })
      // Si la obtención de apuestas falla
      .addCase(fetchApuestasAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;  // Almacena el error si ocurre
      })
      // Cuando comienza la acción de agregar una apuesta
      .addCase(addApuestaAsync.pending, (state) => {
        state.status = 'loading';
      })
      // Si la apuesta es agregada exitosamente
      .addCase(addApuestaAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.apuestas.push(action.payload);  // Agrega la nueva apuesta a la lista
      })
      // Si agregar la apuesta falla
      .addCase(addApuestaAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;  // Almacena el error si ocurre
      });
  },
});

export default apuestasFeatures;
