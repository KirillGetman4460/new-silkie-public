import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {store} from './store/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from 'react-query'
import 'react-tooltip/dist/react-tooltip.css'
import "./style/style.scss"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <App /> 
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
