import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import Spinner from 'react-bootstrap/Spinner';
import PopUp from '../components/PupUp'
import { db } from '../database/firebase';
import { onValue, ref } from 'firebase/database';

function Beranda() {

  // ** Read
  const [dataView, setDataView] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    onValue(ref(db, `/categories`), (snapshot) => {
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

  // ** PopUp
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('popupDisplayed', 'true');
    console.log('Close PopUp');
  };
  useEffect(() => {
    const popupDisplayed = localStorage.getItem('popupDisplayed');
    if (!popupDisplayed) {
      setIsOpen(true);
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) return (
    <div className="text-center mt-5">
      <Spinner animation="grow" variant="" className='bg-indigo-500' />
      <Spinner animation="grow" variant="" className='bg-indigo-500' />
      <Spinner animation="grow" variant="" className='bg-indigo-500' />
    </div>
  );
  else if (dataView && !isError)
    return (
      <>
        <PopUp isOpen={isOpen} onClose={handleClose} />
        <div className='xl:px-52 lg:px-32 md:px-5 xs:px-5 '>
          <div className='mt-3'>
            <Carousel />
          </div>
          <div>
            <div className='mt-5 mb-5'>
              <span className='text-2xl font-bold '>GAME TOP UP</span>
            </div>
          </div>
          <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 xss:grid-cols-2 gap-4'>
            {dataView.map((item) =>
              item.status === "on" && item.pilih_category === "game" && (
                <div key={item.uuid} className="shadow-xl">
                  <div className='rounded-lg border bg-orange-500'>
                    <div>
                      <div className='static'>
                        <img className='rounded-xl h-24 w-24 mx-auto relative bottom-5 shadow-xl' src={item.thumbnail} alt={item.category} />
                      </div>
                      <div className='text-center font-bold text-white relative bottom-2'>{item.category}</div>
                      <div className='text-center'>
                        <a href={item.link}>
                          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 shadow-xl"> Top Up </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <div className='mt-5 mb-5'>
              <span className='text-2xl font-bold '>APLIKASI HIBURAN</span>
            </div>
          </div>
          <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 xss:grid-cols-2 gap-4'>
            {dataView.map((item) =>
              item.status === "on" && item.pilih_category === "aplikasi" && (
                <div key={item.uuid} className="shadow-xl">
                  <div className='rounded-lg border bg-orange-500'>
                    <div>
                      <div className='static'>
                        <img className='rounded-xl h-24 w-24 mx-auto relative bottom-5 shadow-xl' src={item.thumbnail} alt={item.category} />
                      </div>
                      <div className='text-center font-bold text-white relative bottom-2'>{item.category}</div>
                      <div className='text-center'>
                        <a href={item.link}>
                          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 shadow-xl"> Top Up </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  else {
    return <h1 className='text-center'>Something Went Wrong</h1>;
  }
}
export default Beranda