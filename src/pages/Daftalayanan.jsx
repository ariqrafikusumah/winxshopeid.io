import { ArrowDownRightIcon, BookOpenIcon, CursorArrowRaysIcon } from '@heroicons/react/24/solid'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../database/firebase'

function Daftalayanan() {
    const [dataView, setDataview] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isError, setisError] = useState(false);

    useEffect(() => {
        onValue(ref(db, `/categories)`), (snapshot) => {
            setDataview([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map((item) => {
                    setDataview((oldArray) => [...oldArray, item]);
                });
            }
        });
    }, []);;

    return (
        <>
            <div>
                <div className='xl:px-52 lg:px-52 md:px-32 sm:px-2'>
                    <div className='shadow-lg mt-3 p-3 rounded-xl'>
                        <div className='flex gap-2 text-2xl font-bold'><CursorArrowRaysIcon className='w-8' /> Daftar Layanan</div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Daftalayanan