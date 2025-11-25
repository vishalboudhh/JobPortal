import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/guards/ProtectedRoute'
import AdminRoute from './components/guards/AdminRoute'
import StudentRoute from './components/guards/StudentRoute'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  }, {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <ProtectedRoute><Jobs /></ProtectedRoute>
  },
  {
    path: "/browse",
    element: <ProtectedRoute><StudentRoute><Browse /></StudentRoute></ProtectedRoute>
  },
  {
    path: "/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: "/description/:id",
    element: <ProtectedRoute><JobDescription /></ProtectedRoute>
  },

  //Admin routes - Protected with AdminRoute (Recruiter only)
  {
    path:"/admin/companies",
    element:<ProtectedRoute><AdminRoute><Companies/></AdminRoute></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><AdminRoute><CompanyCreate/></AdminRoute></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><AdminRoute><CompanySetup/></AdminRoute></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminRoute><AdminJobs/></AdminRoute></ProtectedRoute>
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><AdminRoute><PostJob/></AdminRoute></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><AdminRoute><Applicants/></AdminRoute></ProtectedRoute>
  },
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
