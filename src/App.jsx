import './App.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import AuthPage from './Components/Auth/Authpage';
import Chatbot from './Components/ChatBot/Chatbot';
import AuthHandler from './Components/Auth/AuthHandler';
import EditResume from './Components/dashboard/resume/[resumeId]/edit/index';
import ViewResume from './Components/my-resume/[resumeId]/view';
import Dashboard from './Components/dashboard';
import JobRolePredict from './Components/JobRolePredict/JobRolePredict';
import { UserProvider } from './Components/Auth/UserContext';
import { Toaster } from './Components/ui/sonner';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    element: <Layout />,
    children: [
      { path: '/Chatbot', element: <Chatbot /> },
      { path: '/Resume', element: <Dashboard /> },
      { path: '/Resume/:id/edit', element: <EditResume /> },
      { path: '/my-resume/:id/view', element: <ViewResume /> },
      { path: '/my-resume/:id/download', element: <ViewResume /> },
      { path: '/Job-Role-Predict', element: <JobRolePredict /> },
    ]
  },
  {
    path: '/auth/sign-in',
    element: <AuthPage />
  },
]);

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserProvider>
        <AuthHandler />
        <RouterProvider router={router} />
        
        {/* Toast notifications positioned at the bottom center */}
        <Toaster />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </UserProvider>
    </ClerkProvider>
  );
}

export default App;
