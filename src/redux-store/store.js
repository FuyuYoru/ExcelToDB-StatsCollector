import { configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import rootSaga from './sagas/sagas';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middleware),
})

sagaMiddleware.run(rootSaga);