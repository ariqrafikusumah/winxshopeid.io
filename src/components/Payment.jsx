import React, { useState, useEffect } from 'react'
import { BuildingLibraryIcon, QrCodeIcon, WalletIcon } from '@heroicons/react/24/solid';
import Accordion from 'react-bootstrap/Accordion';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import { Spinner } from 'react-bootstrap';
import { db } from '../database/firebase';
import { ref, onValue } from "firebase/database";

function Payment() {
    // ** Loading Screen
    const [isLoading, setisLoading] = useState(true);
    const [isError, setisError] = useState(false);

    // ** Read Data APi payment-qris
    const [dataPaymentQris, setDataPaymentQris] = useState([]);

    useEffect(() => {
        onValue(ref(db, `/payment-qris`), (snapshot) => {
            setDataPaymentQris([]);
            const data = snapshot.val();
            if (data !== null) {
                setDataPaymentQris((oldArray) => {
                    const newArray = Object.values(data).map((item) => {
                        return { ...item};
                    });
                    return [...oldArray, ...newArray];
                });
                setisLoading(false);
            } else {
                setisError(true);
            }
        })
    }, []);

    // ** Read Data APi payment-bank
    const [dataPaymentBank, setDataPaymentBank] = useState([]);

    useEffect(() => {
        onValue(ref(db, `/payment-bank`), (snapshot) => {
            setDataPaymentBank([]);
            const data = snapshot.val();
            if (data !== null) {
                setDataPaymentBank((oldArray) => {
                    const newArray = Object.values(data).map((item) => {
                        return item;
                    });
                    return [...oldArray, ...newArray];
                });
                setisLoading(false);
            } else {
                setisError(true);
            }
        })
    }, []); 

    // ** Read Data APi payment-wallet
    const [dataPaymentWallet, setDataPaymentWallet] = useState([]);

    useEffect(() => {
        onValue(ref(db, `/payment-wallet`), (snapshot) => {
            setDataPaymentWallet([]);
            const data = snapshot.val();
            if (data !== null) {
                setDataPaymentWallet((oldArray) => {
                    const newArray = Object.values(data).map((item) => {
                        return item;
                    });
                    return [...oldArray, ...newArray];
                });
            } else {
                setisError(true);
            }
        })
    }, []);

    if (isLoading) return (
        <div className="text-center mt-5">
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
        </div>
    );
    else if (dataPaymentBank && dataPaymentQris && dataPaymentWallet && !isError)
        return (
            <>
                <Accordion>
                    <AccordionItem className='mt-3' eventKey='0'>
                        <AccordionHeader className='text-gray-500 font-bold'>
                            <QrCodeIcon className='w-5' />&nbsp;QRIS
                        </AccordionHeader>
                        <AccordionBody className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentQris.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.qris_name} name='payment' value={item.qris_img} required />
                                        <label htmlFor={item.qris_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12 ' src={item.picture} alt={item.qr_qris} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.qris_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem className='mt-3 border' eventKey='2'>
                        <AccordionHeader className='text-gray-500 font-bold'>
                            <BuildingLibraryIcon className='w-5' />&nbsp;Bank Transfer
                        </AccordionHeader>
                        <AccordionBody className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentBank.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.bank_name} name='payment' value={item.number_account} required />
                                        <label htmlFor={item.bank_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12' src={item.picture} alt={item.bank_name} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.first_name} {item.last_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem className='mt-3 border' eventKey='3'>
                        <AccordionHeader className='text-gray-500 font-bold'>
                            <WalletIcon className='w-5' />&nbsp;E-Wallet
                        </AccordionHeader>
                        <AccordionBody className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentWallet.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.wallet_name} name='payment' value={item.number_account} required />
                                        <label htmlFor={item.wallet_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12' src={item.picture} alt={item.wallet_name} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.first_name} {item.last_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            </>
        );
    else {
        return (
            <>
                <Accordion>
                    <AccordionItem className='mt-3' eventKey='0'>
                        <AccordionHeader className='text-gray-500 font-bold'>
                            <QrCodeIcon className='w-5' />&nbsp;QRIS
                        </AccordionHeader>
                        <AccordionBody className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentQris.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.qris_name} name='payment' value={item.qris_img} required />
                                        <label htmlFor={item.qris_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12 ' src={item.picture} alt={item.qr_qris} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.qris_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem className='mt-3 border' eventKey='2'>
                        <AccordionHeader className='text-gray-500 font-bold'>
                            <BuildingLibraryIcon className='w-5' />&nbsp;Bank Transfer
                        </AccordionHeader>
                        <AccordionBody className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentBank.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.bank_name} name='payment' value={item.number_account} required />
                                        <label htmlFor={item.bank_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12' src={item.picture} alt={item.bank_name} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.first_name} {item.last_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem className='mt-3 border' eventKey='3'>
                        <AccordionHeader className='text-gray-500 font-bold'>
                            <WalletIcon className='w-5' />&nbsp;E-Wallet
                        </AccordionHeader>
                        <AccordionBody className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentWallet.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.wallet_name} name='payment' value={item.number_account} required />
                                        <label htmlFor={item.wallet_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12' src={item.picture} alt={item.wallet_name} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.first_name} {item.last_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            </>
        )
    }
}

export default Payment