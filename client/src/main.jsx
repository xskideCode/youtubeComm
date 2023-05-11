import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers from './reducers'

// const store = createStore(reducers, compose(applyMiddleware(thunk)))

import rootReducer from './reducers'

const store = configureStore({ reducer: rootReducer })

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
