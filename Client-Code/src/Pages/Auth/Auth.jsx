import React from 'react';
import "./Auth.css";
import Signin from '../../Components/Register/Signin';
import Signup from '../../Components/Register/Signup';
import { useLocation } from 'react-router-dom';
import { URL_SMARTPHONE_AUTH } from '../../Config/Constants';

const Auth = () => {
    const location = useLocation();
  return (
    <div>
        <div className='flex items-center justify-center h-[100vh] space-x-5'>
            <div className='relative hidden lg:block'>
                <div className=''>
                    <img className='h-full w-full' 
                    src={URL_SMARTPHONE_AUTH} alt="" />
                    <div className='mobilewallpaper h-[33.8rem] w-[15.7rem] absolute top-6 right-14'>

                    </div>
                </div>
            </div>
            <div  className='w-[40vw] lg:w-[25vw]'>
                {location.pathname === "/login"? <Signin/> : <Signup/>} 
            </div>
        </div>
    </div>
  )
}

export default Auth