import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// Lazy load components
const App = lazy(() => import('./App'))
const HomePage = lazy(() => import('./components/HomePage'))
const NotFound = lazy(() => import('./components/NotFound'))
const SinglePropertie = lazy(() => import('./pages/SinglePropertie'))
const SingleAgent = lazy(() => import('./pages/SingleAgent'))
const AllAgents = lazy(() => import('./pages/AllAgents'))
const AllProperties = lazy(() => import('./pages/AllProperties'))
const Partenaire = lazy(() => import('./pages/Partenaire'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Profile = lazy(() => import('./pages/Profile'))
const PrivateRoute = lazy(() => import('./components/PrivateRoute'))
const DashBoard = lazy(() => import('./pages/DashBoard'))
const AdminRoute = lazy(() => import('./components/AdminRoute'))
const PropertieList = lazy(() => import('./screen/PropertieList'))
const PropertieEdit = lazy(() => import('./screen/PropertieEdit'))
const UserListScreen = lazy(() => import('./screen/UserListScreen'))
const UserEditScreen = lazy(() => import('./screen/UserEditScreen'))
const ForgetPassword = lazy(() => import('./pages/ForgetPaasword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const WishlistScreen = lazy(() => import('./screen/WishlistScreen'))
const SingleBlog = lazy(() => import('./pages/SingleBlog'))
const AllBlogs = lazy(() => import('./pages/AllBlogs'))
const AgentList = lazy(() => import('./screen/AgentList'))
const AgentEdit = lazy(() => import('./screen/AgentEdit'))
const BlogList = lazy(() => import('./screen/BlogList'))
const BlogEdit = lazy(() => import('./screen/BlogEdit'))
const PartenairList = lazy(() => import('./screen/PartenairList'))
const PartnenairEdit = lazy(() => import('./screen/PartnenairEdit'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      }
    >
      <Route
        index={true}
        path='/'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path='/search/:keyword/:location/:address/:propertyType/:minPrice/:maxPrice'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path='/search/:keyword/:location/:address'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path='/search/:keyword/:location'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path='/search/:keyword'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />

      <Route
        path='/propertie/:id'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SinglePropertie />
          </Suspense>
        }
      />
      <Route
        path='/agent/:id'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SingleAgent />
          </Suspense>
        }
      />
      <Route
        path='/blog/:id'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SingleBlog />
          </Suspense>
        }
      />
      <Route
        path='/all-agents'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AllAgents />
          </Suspense>
        }
      />
      <Route
        path='/property'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AllProperties />
          </Suspense>
        }
      />
      <Route
        path='/all-blogs'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AllBlogs />
          </Suspense>
        }
      />
      <Route
        path='/partners'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Partenaire />
          </Suspense>
        }
      />
      <Route
        path='/about'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        }
      />
      <Route
        path='/contact'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        }
      />
      <Route
        path='/login'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path='/register'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ForgetPassword />
          </Suspense>
        }
      />
      <Route
        path='/reset-password/:token'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        }
      />

      <Route
        path=''
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute />
          </Suspense>
        }
      >
        <Route
          path='/profile'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path='/wishlist'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <WishlistScreen />
            </Suspense>
          }
        />
      </Route>

      <Route
        path=''
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute />
          </Suspense>
        }
      >
        <Route
          path='/admin/dashboard'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <DashBoard />
            </Suspense>
          }
        />
        <Route
          path='/admin/propertiesList'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PropertieList />
            </Suspense>
          }
        />
        <Route
          path='/admin/propertiesList/:id/edit'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PropertieEdit />
            </Suspense>
          }
        />
        <Route
          path='/admin/agentList'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AgentList />
            </Suspense>
          }
        />
        <Route
          path='/admin/agentList/:id/edit'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AgentEdit />
            </Suspense>
          }
        />
        <Route
          path='/admin/partnerList'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PartenairList />
            </Suspense>
          }
        />
        <Route
          path='/admin/partnerList/:id/edit'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PartnenairEdit />
            </Suspense>
          }
        />
        <Route
          path='/admin/blogList'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <BlogList />
            </Suspense>
          }
        />
        <Route
          path='/admin/blogList/:id/edit'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <BlogEdit />
            </Suspense>
          }
        />
        <Route
          path='/admin/userlist'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <UserListScreen />
            </Suspense>
          }
        />
        <Route
          path='/admin/user/:id/edit'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <UserEditScreen />
            </Suspense>
          }
        />
      </Route>

      <Route
        path='*'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
