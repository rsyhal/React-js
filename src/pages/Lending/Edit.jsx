import React, { useState, useEffect } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function LendingEdit() {
    const { id } = useParams();
    const [forms, setForms] = useState({
        stuff_id: '',
        date_time: '',
        name: '',
        user_id: '',
        notes: '',
        total_stuff: '',
    });

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false); 
    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get(`lending/${id}`)
            .then(res => {
                const data = res.data.data;
                setForms(data);
            })
            .catch(err => {
                console.log("Error response:", err.response);
                setError({ message: 'Terjadi kesalahan saat mengambil data peminjaman. Silakan coba lagi.' });
                console.log(err.response);
            });
    }, [id, instance]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForms(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditLending = (event) => {
        event.preventDefault();

        instance.put(`lending/update/${id}`, forms) 
            .then(res => {
                setError([]); 
                setSuccess(true); 
                setTimeout(() => {
                    navigate('/lending');
                }, 2000);
            })
            .catch(err => {
                console.log("Error response:", err.response);
                setError({ message: 'Terjadi kesalahan saat mengedit data peminjaman. Silakan coba lagi.' });
                console.log(err.response);
            });
    };

    return (
        <Case>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-8">
                    {success && (
                        <div role="alert">
                            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                                Berhasil!
                            </div>
                            <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                                Data peminjaman berhasil diubah.
                            </div>
                        </div>
                    )}

                    {error && Object.keys(error).length > 0 && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    <li>{error.message}</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-6">
                        <h5 className="text-3xl font-medium text-gray-900 dark:text-white">Edit Peminjaman</h5>
                    </div>
                    <form onSubmit={handleEditLending}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="stuff_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Barang</label>
                                <input type="text" id="stuff_id" name="stuff_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik ID Barang" required onChange={handleInputChange} value={forms.stuff_id} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal & Waktu</label>
                                <input type="datetime-local" id="date_time" name="date_time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleInputChange} value={forms.date_time} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                                <input type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Nama Barang" required onChange={handleInputChange} value={forms.name} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Pengguna</label>
                                <input type="text" id="user_id" name="user_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik ID Pengguna" required onChange={handleInputChange} value={forms.user_id} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catatan</label>
                                <textarea id="notes" name="notes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Catatan" required onChange={handleInputChange} value={forms.notes}></textarea>
                                </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}
