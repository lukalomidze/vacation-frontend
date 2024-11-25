import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import { ErrorBoundary } from 'react-error-boundary'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={ <div>An error has occurred</div> }>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
