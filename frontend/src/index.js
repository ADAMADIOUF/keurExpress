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
import Partenaire from './pages/Partenaire';
import About from './components/About';
import Contact from './components/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import DashBoard from './pages/DashBoard';
import AdminRoute from './components/AdminRoute';
import PropertieList from './screen/PropertieList';
import PropertieEdit from './screen/PropertieEdit';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';
import ForgetPassword from './pages/ForgetPaasword';
import ResetPassword from './pages/ResetPassword';
import WishlistScreen from './screen/WishlistScreen';
import SingleBlog from './pages/SingleBlog';
import AllBlogs from './pages/AllBlogs';
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n' 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route
        path='/search/:keyword/:location/:address/:propertyType/:minPrice/:maxPrice'
        element={<HomePage />}
      />
      <Route
        path='/search/:keyword/:location/:address'
        element={<HomePage />}
      />
      <Route path='/search/:keyword/:location' element={<HomePage />} />
      <Route path='/search/:keyword' element={<HomePage />} />

      <Route path='/propertie/:id' element={<SinglePropertie />} />
      <Route path='/agent/:id' element={<SingleAgent />} />
      <Route path='/blog/:id' element={<SingleBlog />} />
      <Route path='/all-agents' element={<AllAgents />} />
      <Route path='/property' element={<AllProperties />} />
      <Route path='/all-blogs' element={<AllBlogs />} />
      <Route path='/partners' element={<Partenaire />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/forgot-password' element={<ForgetPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/wishlist' element={<WishlistScreen />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/dashboard' element={<DashBoard />} />
        <Route path='/admin/propertiesList' element={<PropertieList />} />
        <Route
          path='/admin/propertiesList/:id/edit'
          element={<PropertieEdit />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
)


