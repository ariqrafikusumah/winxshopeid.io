import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../database/firebase';
import { Spinner } from 'react-bootstrap';

function PopUp({ isOpen, onClose }) {
    // ** Read
    const [dataView, setDataView] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isError, setisError] = useState(false);

    useEffect(() => {
        onValue(ref(db, `/popup`), (snapshot) => {
            setDataView([]);
            const data = snapshot.val();
            if (data !== null) {
                setDataView((oldArray) => {
                    const newArray = Object.values(data).map((item) => {
                        return { ...item };
                    });
                    return [...oldArray, ...newArray];
                });
                setisLoading(false);
            } else {
                setisError(true);
            }
        });
    }, []);
    if (isLoading) return (
        <div className="text-center mt-5">
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
        </div>
    ); else if (dataView && !isError)
        return (
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={onClose}
                >
                    <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden  transform transition-all sm:my-32 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className=" pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg
                                            className="h-6 w-6 text-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 19l.00001-.00001M12 5l.00001-.00001M4.929 7.757l.00001-.00001M19.071 16.243l.00001-.00001"
                                            />
                                        </svg>
                                    </div> */}
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-white shadow-xl"
                                            >
                                                Selamat Datang
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {dataView.map((item) => {
                                                    return (
                                                        <>
                                                            <div className="mt-2">
                                                                <img className='shadow-xl rounded-xl h-full w-full' src={item.popup} alt="Pop Up" />
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onClose}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        );
}
export default PopUp;