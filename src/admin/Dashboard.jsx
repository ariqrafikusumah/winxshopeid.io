import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { BuildingLibraryIcon, Cog6ToothIcon, QrCodeIcon, TagIcon, WalletIcon } from '@heroicons/react/24/solid';
import Login from '../auth/Login';
import { auth } from '../database/firebase';
import Swal from 'sweetalert2';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('success-login')) {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Berhasil Login',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [location]);

  // ** Fungsi untuk logout */
  const handleLogout = () => {
    auth.signOut()
      .then(() => {

        console.log('Logout berhasil');
        // redirect ke halaman login
        window.location.href = '/auth/login?pesan=logout';
      })
      .catch((error) => {
        console.log('Logout gagal: ', error);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Login berhasil!');
        setUser(user);

      } else {
        console.log('Belum login');
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      // set waktu login
      setLoginTime(new Date().toLocaleString());
    }
  }, [user]);

  useEffect(() => {
    let timer = null;

    if (user) {
      // **  Set timer untuk logout setelah 30 menit */
      timer = setInterval(() => {
        handleLogout();
      }, 30 * 60 * 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [user]);

  // Render komponen Login jika user belum login
  if (!user) {
    return (
      null
    );
  }

  return (

    <>
      <div className="container xl:px-52 lg:px-32 md:px-5 xs:px-5 mt-5">
        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-3" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="inline-flex no-underline items-center text-sm font-medium text-gray-700 hover:text-indigo-600 ">
                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 "></a>
              </div>
            </li>
          </ol>
        </nav>
        <div className='p-3 mt-3 text-white font-bold border bg-indigo-500 rounded-lg'>
          <p> Waktu Login : {loginTime}</p>
          <p> Email : {user.email}
            <hr />
            <button className='bg-red-500 hover:bg-red-600 rounded-lg p-2 mt-3 text-white' onClick={handleLogout}>Logout</button></p>
        </div>
        <h1 className="text-3xl font-bold mb-10 mt-10">- Product</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
          <a href="/admin/mobile-legend" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Mobile Legends</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/mobile-legend-2" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Mobile Legends 2</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/mobile-legend-3" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Mobile Legends 3</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/valorant" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Valorant</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/free-fire" className=' no-underline'>
            <div className="hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Free Fire</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/pubg-mobile" className=' no-underline'>
            <div className="hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Pubg Mobile</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/higgs-domino" className=' no-underline'>
            <div className="hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Higgs Domino</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/youtube" className=' no-underline'>
            <div className="hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Youtube</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/genshin-impact" className=' no-underline'>
            <div className="hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Genshin Impact</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-10 mt-10">- Payment</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/admin/qris" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <QrCodeIcon className='w-8 h-8' />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">QRIS</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit Payment</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/bank" className=' no-underline'>
            <div className="hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <BuildingLibraryIcon className='w-8 h-8' />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Bank</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit Payment</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/e-wallet" className=' no-underline'>
            <div className="hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <WalletIcon className='w-8 h-8' />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">E-Wallet</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit Payment</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-10 mt-10">- Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/admin/category-game" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <TagIcon className='w-8 h-8' />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Game</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-10 mt-10">- Setting</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/admin/banner-setting" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <Cog6ToothIcon className='w-8 h-8' />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Banner</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          {/* <a href="/admin/pop-up" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <Cog6ToothIcon className='w-8 h-8' />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Pop Up</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a> */}
          <a href="/admin/whatsapp-setting" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <Cog6ToothIcon className='w-8 h-8' />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Whatsapp Setting</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/admin/api" className=' no-underline'>
            <div className=" hover:text-indigo-500 hover:bg-indigo-200 border shadow rounded-lg p-6">
              <div className='flex gap-2'>
                <div className='py-3'>
                  <Cog6ToothIcon className='w-8 h-8' />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">APi Setting</h2>
                  <p className="text-gray-700 text-lg font-bold">Edit</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default Dashboard