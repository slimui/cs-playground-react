import './styles/index.css'

import * as LS from './utils/localStorageKeys'

import App from './App'
import { DO_NOT_SAVE } from './utils/regexp'
import ErrorBoundary from './components/utils/ErrorBoundary'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import createProxyConsole from './utils/createProxyConsole'
import registerServiceWorker from './utils/registerServiceWorker'
import simpleDrag from './utils/simpleDrag'

// NOTE: set to true or use console.info
// when debugging w/ console.log becomes
// problematic due to proxy console func
export const disableProxyConsole = false

// intercept console.log messages
createProxyConsole()

// enable resizable split panes
simpleDrag()

export const store = configureStore()

// set localStorage when navigating away from app
window.onbeforeunload = function(e) {
  const state = store.getState()
  // use // DO NOT SAVE comment to disable saving
  if (!DO_NOT_SAVE.test(state.editor.current.code) && !state.editor.isSharedRepl) {
    localStorage.setItem(
      LS.EDITR_STATE,
      JSON.stringify(state.editor)
    )
    localStorage.setItem(
      LS.PANES_STATE,
      JSON.stringify(state.panes)
    )
    localStorage.setItem(
      LS.THEME_STATE,
      JSON.stringify(state.theme)
    )
    localStorage.setItem(
      LS.MENU_STATE,
      JSON.stringify(state.menu)
    )
  }
  // save pane state
  console.log('CS-Playground-React-State Saved!')
}

ReactDOM.render(
  <Provider store={store} >
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <Provider store={store} >
        <ErrorBoundary>
          <NextApp />
        </ErrorBoundary>
      </Provider>,
      document.getElementById('root')
    )
  })
}

registerServiceWorker()
