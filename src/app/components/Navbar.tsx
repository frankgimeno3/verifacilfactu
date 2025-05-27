"use client"
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import AuthenticationService from './service/AuthenticationService';


interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const router = useRouter();

    const handleRedirection = (content: string) => {
        if (isAuthenticated) {
            router.push(content);
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
        <nav className='flex flex-row py-6 px-12 justify-between bg-white text-gray-800 fixed top-0 left-0 w-full z-50 shadow-md' >
            <p onClick={() => handleRedirection('/logged/dashboard')}>
                Facturación P3
            </p>
            {isAuthenticated &&
                <div className='flex flex-row'>
                    <button className="text-gray-500 cursor-pointer pr-12 hover:text-gray-700"
                        onClick={() => handleRedirection('/logged/facturas')}>
                        Facturas
                    </button>
                    <button className="text-gray-500 cursor-pointer pr-12 hover:text-gray-700"
                        onClick={() => handleRedirection('/logged/servicios')}>
                        Servicios
                    </button>
                    <button className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => { handleLogout() }}>
                        Cerrar sesión
                    </button>
                </div>
            }
        </nav>
    );
};

export default Navbar;
