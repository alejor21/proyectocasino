import { configureStore } from '@reduxjs/toolkit';

import apuestasFeatures from './features/apuestas';
import usuariosFeatures from './features/usuarios';

const store = configureStore({
  reducer: {
    apostar: apuestasFeatures,
    users: usuariosFeatures,
  },
});

export default store;
