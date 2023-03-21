import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { db, auth } from '../database/firebase'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { FloatingLabel, Form, FormControl, FormLabel, FormSelect, Spinner } from 'react-bootstrap';
import { ref, onValue, update } from "firebase/database";


function Category() {
    const [dataTabel, setDataTabel] = useState("");
    const [modalShow2, setModalShow2] = React.useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [isError, setisError] = useState(false);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [petunjuk, setPetunjuk] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [status, setStatus] = useState('');
    const [pilih_category, setPilih_category] = useState('');
    const [tempUuid, setTempUuid] = useState('');

    // ** Read
    useEffect(() => {
        onValue(ref(db, `/categories`), (snapshot) => {
            let timerInterval
            Swal.fire({
                title: 'Memuat data !',
                html: 'I will close in <b></b> milliseconds.',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
            setisLoading(false);
            setDataTabel([]);
            const data = snapshot.val();
            if (data !== null) {
                setDataTabel((oldArray) => {
                    const newArray = Object.values(data).sort((a, b) => a.category.localeCompare(b.category));
                    return [...oldArray, ...newArray];
                });
            } else {
                setisError(true);
            }
        });
        console.log("Data has been Read to database");
    }, []);

    //** Update
    const handleUpdate = (item) => {
        console.log('Update Button', item.uuid, item.petunjuk);
        setModalShow2(true, item.uuid);
        setCategory(item.category);
        setDescription(item.description);
        setLink(item.link);
        setPetunjuk(item.petunjuk);
        setThumbnail(item.thumbnail);
        setStatus(item.status);
        setPilih_category(item.pilih_category);
        setTempUuid(item.uuid);
    };

    //** Login Session User */
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
    if (isLoading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="" className='bg-indigo-500' />
                <Spinner animation="grow" variant="" className='bg-indigo-500' />
                <Spinner animation="grow" variant="" className='bg-indigo-500' />
            </div>
        );
    else if (dataTabel && !isError)
        return (
            <>
                <div>
                    <div className="container xl:px-52 lg:px-32 md:px-5 xs:px-5 mt-5">
                        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-3" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <a href="/admin/dashboard-admin" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 ">
                                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                        <a href="/admin/category-game" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 ">Category</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                        <a href="/admin/category-game" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 ">Game</a>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className='text-3xl font-bold mb-4 mt-10'>
                            Category
                        </div>
                        <div>
                            <div className="overflow-x-auto h-full max-h-[500px] overflow-y-scroll rounded-lg">
                                <table className="table-auto border-collapse">
                                    <thead className="bg-gray-50">
                                        <tr className="bg-gray-200 text-gray-700">
                                            <th className="py-2 px-4 border">No</th>
                                            <th className="py-2 px-4 border">Nama Kategori</th>
                                            <th className="py-2 px-4 border">Deskripsi</th>
                                            <th className="py-2 px-4 border">Gambar Kategori</th>
                                            <th className="py-2 px-4 border">Gambar Petunjuk</th>
                                            <th className="py-2 px-4 border">URL</th>
                                            <th className="py-2 px-4 border">Status</th>
                                            <th className="py-2 px-4 border">Kategori</th>
                                            <th className="py-2 px-4 border">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {dataTabel.map((item, index) => {
                                            return (
                                                <>
                                                    <tr key={item}>
                                                        <td className="px-6 py-4 whitespace-nowrap border">
                                                            <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap border">
                                                            <div className="text-sm font-medium text-gray-900">{item.category}</div>
                                                        </td>
                                                        <td className="px-6 whitespace-nowrap py-4 border">
                                                            <div className="text-sm text-gray-500">{item.description}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap border">
                                                            <div className="text-sm px-3 text-gray-500"><img className="w-8" src={item.thumbnail} alt={item.category} /></div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap border">
                                                            <div className="text-sm px-3 text-gray-500"><img className="w-8" src={item.petunjuk} alt={item.category} /></div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap border">
                                                            <div className="text-sm font-medium text-gray-900">https://example.netlify.app{item.link}</div>
                                                        </td>
                                                        <td className='px-6 py-4 whitespace-nowrap border'>
                                                            <div className={`text-sm font-medium border text-center p-2 rounded-xl ${item.status === "off" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
                                                                {item.status}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 whitespace-nowrap py-4 border">
                                                            <div className="text-sm text-gray-500">{item.pilih_category}</div>
                                                        </td>
                                                        <td className="flex px-6 py-4 whitespace-nowrap border">
                                                            <div>
                                                                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUpdate(item)} >
                                                                    Edit
                                                                </button>
                                                                <EditData
                                                                    show={modalShow2}
                                                                    onHide={() => setModalShow2(false)}
                                                                    category={category}
                                                                    description={description}
                                                                    link={link}
                                                                    petunjuk={petunjuk}
                                                                    thumbnail={thumbnail}
                                                                    status={status}
                                                                    pilih_category={pilih_category}
                                                                    uuid={tempUuid}
                                                                />
                                                            </div>
                                                            {/* <div>
                                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDelete(item)}>
                                                                    Delete
                                                                </button>
                                                            </div> */}
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    else {
        return (
            <>
                <div>
                    <div className="container xl:px-52 lg:px-32 md:px-5 xs:px-5 mt-5">
                        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-3" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <a href="/admin/Dashboard-Admin" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 ">
                                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                        <a href="/admin/mobile-legends" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 ">Mobile Legends</a>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className='text-3xl font-bold mb-4 mt-10'>
                            Category
                        </div>
                        <div>
                            <div className="overflow-x-scroll rounded-lg">
                                <table className="table-auto border-collapse">
                                    <thead className="bg-gray-50">
                                        <tr className="bg-gray-200 text-gray-700">
                                            <th className="py-2 px-4 border">No</th>
                                            <th className="py-2 px-4 border">Nama Kategori</th>
                                            <th className="py-2 px-4 border">Deskripsi</th>
                                            <th className="py-2 px-4 border">Gambar Kategori</th>
                                            <th className="py-2 px-4 border">Gambar Petunjuk</th>
                                            <th className="py-2 px-4 border">URL</th>
                                            <th className="py-2 px-4 border">Status</th>
                                            <th className="py-2 px-4 border">Kategori</th>
                                            <th className="py-2 px-4 border">Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <div divclassName="px-6 py-4 text-center whitespace-nowrap border text-sm font-medium text-gray-900">Tidak Ada Data</div>
                                </tbody>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function EditData(props) {

    const [category, setCategory] = useState(props.category || "");
    const [description, setDescription] = useState(props.description || "");
    const [link, setLink] = useState(props.link || "");
    const [petunjuk, setPetunjuk] = useState(props.petunjuk || "");
    const [thumbnail, setThumbnail] = useState(props.thumbnail || "");
    const [status, setStatus] = useState(props.status || "");
    const [pilih_category, setPilih_category] = useState(props.category || "");
    const [tempUuid, setTempUuid] = useState(props.uuid || "");

    useEffect(() => {
        setCategory(props.category || "");
    }, [props.category]);

    useEffect(() => {
        setDescription(props.description || "");
    }, [props.description]);

    useEffect(() => {
        setLink(props.link || "");
    }, [props.link]);

    useEffect(() => {
        setPetunjuk(props.petunjuk || "");
    }, [props.petunjuk]);

    useEffect(() => {
        setThumbnail(props.thumbnail || "");
    }, [props.thumbnail]);

    useEffect(() => {
        setStatus(props.status || "");
    }, [props.status]);

    useEffect(() => {
        setPilih_category(props.pilih_category || "");
    }, [props.pilih_category]);

    useEffect(() => {
        // Update nilai tempUuid saat props.uuid berubah
        setTempUuid(props.uuid || "");
    }, [props.uuid]);

    const handleDataChange1 = (e) => {
        setCategory(e.target.value)
    }
    const handleDataChange2 = (e) => {
        setDescription(e.target.value)
    }
    const handleDataChange3 = (e) => {
        setLink(e.target.value)
    }
    const handleDataChange4 = (e) => {
        setPetunjuk(e.target.value)
    }
    const handleDataChange5 = (e) => {
        setThumbnail(e.target.value)
    }
    const handleDataChange6 = (e) => {
        setStatus(e.target.value)
    }
    const handleDataChange7 = (e) => {
        setPilih_category(e.target.value)
    }

    // ** Update
    const handleSubmitChange = (e) => {
        console.log("tempUuid :", tempUuid);
        e.preventDefault();
        if (tempUuid) {
            update(ref(db, `/categories/${tempUuid}`), {
                category,
                description,
                link,
                petunjuk,
                thumbnail,
                status,
                pilih_category,
                uuid: tempUuid,
            });
            setCategory('');
            setDescription('');
            setLink('');
            setPetunjuk('');
            setThumbnail('');
            setStatus('');
            setPilih_category('');
            window.location.reload();
            props.onHide();
        }
    };
    return (
        <>
            <Form onSubmit={handleSubmitChange}>
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Data
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="floatingCategory"
                            label="Category"
                            className="mb-3"
                        >
                            <FormControl type="text" value={category} onChange={handleDataChange1} placeholder='Category' />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingDescription"
                            label="Description"
                            className="mb-3"
                        >
                            <FormControl type="text" as="textarea" style={{ height: '100px' }} value={description} onChange={handleDataChange2} placeholder='Description' />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingLink"
                            label="URL Category"
                            className="mb-3"
                        >
                            <FormControl type="url" value={link} onChange={handleDataChange3} placeholder='URL gambar (https://example.com/)' readOnly disabled />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingPetunjuk"
                            label="Petunjuk (https://example.com/)"
                            className="mb-3"
                        >
                            <FormControl type="url" value={petunjuk} onChange={handleDataChange4} placeholder='Petunjuk' />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingThumbnail"
                            label="Thumbnail (https://example.com/)"
                            className="mb-3"
                        >
                            <FormControl type="url" value={thumbnail} onChange={handleDataChange5} placeholder='Thumbnail' />
                        </FloatingLabel>

                        <FormLabel htmlFor="status">Status</FormLabel>
                        <FormSelect className="mb-3" id="status" onChange={handleDataChange6}>
                            <option value={status}>{status}</option>
                            <option value="on">on</option>
                            <option value="off">off</option>
                        </FormSelect>

                        <FormLabel htmlFor="pilih_category">Pilih category</FormLabel>
                        <FormSelect className="mb-3" id="pilih_category" onChange={handleDataChange7}>
                            <option value={pilih_category}>{pilih_category}</option>
                            <option value="game">game</option>
                            <option value="aplikasi">aplikasi</option>
                        </FormSelect>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='bg-red-500' onClick={props.onHide}>Close</Button>
                        <Button type='submit' onClick={handleSubmitChange} className='bg-indigo-500 '>Save</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    )
}

export default Category



