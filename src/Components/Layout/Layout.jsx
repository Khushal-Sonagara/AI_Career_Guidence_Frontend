import { useUser } from '@clerk/clerk-react'

import { Navigate, Outlet } from 'react-router-dom'
import Header from "../Header/Header";
import { useEffect } from 'react';

function Layout() {
    const { isLoaded, isSignedIn } = useUser();
    
    if (!isSignedIn && isLoaded) {
        return <Navigate to={'/auth/sign-in'} />
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout