// // src/store/index.ts
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import createSagaMiddleware from 'redux-saga';
// import storage from 'redux-persist/lib/storage';
// import rootReducer from './reducers';
// import rootSaga from './saga';
// import { isDev } from '../environment';

// // Create the saga middleware
// const sagaMiddleware = createSagaMiddleware();

// // Persist configuration
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// // Persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware().concat(sagaMiddleware),
//   devTools: isDev,
// });

// // Run the root saga
// sagaMiddleware.run(rootSaga);

// // Create and export the persistor
// export const persistor = persistStore(store);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import rootSaga from './saga';


const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these redux-persist action types
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;

