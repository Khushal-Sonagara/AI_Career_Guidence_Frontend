import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { isSignedIn } = useUser();
    return (
        <div className="container-fluid p-3 shadow-md">
            <div className="d-flex justify-content-between align-items-center">
                {/* Logo aligned to the left */}
                <Link to={'/dashboard'}>
                    <img src='/logo.svg' className='cursor-pointer' />
                </Link>

                {/* Right side: Dashboard or Sign-in and User Button */}
                <div className="d-flex gap-2 align-items-center">
                    {isSignedIn ? 
                        <>
                            <Link to={'/Chatbot'}>
                                <Button variant="outlined">Chat With AI</Button>
                            </Link>
                            <Link to={'/Resume'}>
                                <Button variant="outlined">Resume</Button>
                            </Link>
                            <UserButton />
                        </> :
                        <Link to={'/auth/sign-in'}>
                            <Button>Get Started</Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;
