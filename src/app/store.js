import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import movieReducer from '../features/movie/movieSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer  from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,

  },
  middleware : getDefaultMiddleware({
    serializableCheck: false,
  })
});
