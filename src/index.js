import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore from './state/store/configureStore'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter } from 'react-router-dom'
import { verifyCredentials } from './state/actions/reduxTokenAuthConfig'
import i18n from './i18n'

const store = configureStore()
verifyCredentials(store)

ReactDOM.render(
    <Provider store = { store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()