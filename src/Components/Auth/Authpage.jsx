import {  SignIn } from "@clerk/clerk-react";

function AuthPage() {
  return (
    <div className='h-100 d-flex justify-content-center align-items-center'>
    <SignIn/>
  </div>
  );
}

export default AuthPage;
