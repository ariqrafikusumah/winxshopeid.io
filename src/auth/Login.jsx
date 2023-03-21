import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.search.includes('logout')) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Logout',
                showConfirmButton: false,
                time: 1500
            })
        }
    }, [location]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('Login berhasil!');
                // Redirect ke halaman setelah login berhasil
                window.location.href = '/admin/dashboard-admin?pesan=success-login'; // redirect ke halaman dashboard
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Something Wrong !',
                    text: 'Check Your Email or Password.'
                })
                console.log('Login gagal:', error);
            });
    };
    return (
        <>
            <div className="xl:px-52 lg:px-52 md:px-32 sm:px-2">
                <div className="shadow-lg rounded-xl border border-gray-200 mt-3 p-3 bg-gradient-r shdaow-lg">
                    <div className=" ">
                        <div className="text-2xl font-bold text-indigo-500 mb-3 text-center">
                            LOGIN
                        </div>
                        <div className="text-center">
                            <FontAwesomeIcon size="4x" icon={(faUserCircle)} className="text-indigo-500" />
                        </div>
                        <Form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <FormLabel className="flex" htmlFor="email"><UserIcon className="w-5 text-indigo-500" /> Email </FormLabel>
                                <FormControl className="w-full" id="email" placeholder="Enter email" name="email" type="email" value={email} onChange={handleEmailChange} />
                            </div>
                            <div className="mb-3">
                                <FormLabel className="flex" htmlFor="password"><LockClosedIcon className="w-5 text-indigo-500" /> Password </FormLabel>
                                <FormControl className="w-full" id="password" placeholder="Enter password" name="password" type="password" value={password} onChange={handlePasswordChange} />
                            </div>
                            {/* <div className="mb-3 text-blue no-underline">Forgot your password ?</div> */}
                            <button className="p-2 px-4 border rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white" type="submit">Log-in</button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login