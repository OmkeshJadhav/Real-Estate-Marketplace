import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice.js"
import storage  from "redux-persist/es/storage"
// import storage  from "redux-persist/lib/storage"// for CommonJS
import { persistReducer, persistStore } from "redux-persist"

const rootReducer = combineReducers({
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export const persistor = persistStore(store)