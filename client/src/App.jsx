import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/user/homePage';
import LoginPage from './pages/user/loginPage';
import AdminLoginPage from './pages/admin/loginPage';
import ProfilePage from './pages/user/profilePage';
import SignupPage from './pages/user/singupPage';

import PublicRoute from './components/publicRoute';
import ProtectedRoute from './components/protectedRoute';
import AdminProtectedRoute from './components/adminProtectedRoute';
import AdminPublicRoute from './components/adminPublicRoute';
import Dashboard from './pages/admin/dashboardPage';

function App() {

    const router = createBrowserRouter([
        {
            path: "/login",
            element: (<PublicRoute>
                <LoginPage />
            </PublicRoute>)
        },
        {
            path: "/",
            element: (<ProtectedRoute>
                <HomePage />
            </ProtectedRoute>)
        },
        {
            path: "/profile",
            element: (<ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>)
        },
        {
            path: "/signup",
            element: (<PublicRoute>
                <SignupPage />
            </PublicRoute>)
        },
        {
            path: "/admin/login",
            element: (<AdminPublicRoute>
                <AdminLoginPage />
            </AdminPublicRoute>)
        },
        {
            path: "/admin/dashboard",
            element: (<AdminProtectedRoute>
                    <Dashboard />
                </AdminProtectedRoute>)
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default App
