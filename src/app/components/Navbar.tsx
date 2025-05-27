"use client"
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import AuthenticationService from './service/AuthenticationService';


interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({ }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const router = useRouter();
 
  const handleRedirection = () => {
    if (isAuthenticated) {
      router.push('/logged/dashboard');
    } else {
      router.push('/');
    }
   };

   const handleLogout = async () => {
  try {
    await AuthenticationService.logout();
    window.location.href = '/';   
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/validate-token', {
          method: 'POST',
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log("Error: ", error)
      }
    }

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;

 
  return (
    <>
    
 <nav className='flex flex-row py-6 px-12 justify-between bg-white text-gray-800 fixed top-0 left-0 w-full z-50 shadow-md' >
     
      <p onClick={handleRedirection}>
        Facturación P3
      </p>

<div>
      {isAuthenticated && 
      <button className="text-white cursor-pointer" onClick={()=>{handleLogout()}}>
     Cerrar sesión
      </button>}
</div>
    </nav>
</>
   
  );
};

export default Navbar;
