import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import SinglePropertie from './pages/SinglePropertie';
import SingleAgent from './pages/SingleAgent';
import AllAgents from './pages/AllAgents';
import AllProperties from './pages/AllProperties';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/propertie/:id' element={<SinglePropertie />} />
      <Route path='/agent/:id' element={<SingleAgent />} />
      <Route path='/all-agents' element={<AllAgents />} />
      <Route path='/property' element={<AllProperties />} />
      {/* <Route path='*' element={<NotFound />} /> */}
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)


