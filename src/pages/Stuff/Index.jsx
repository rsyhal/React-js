import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(''); 
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
            } else {
                setError({ message: 'Terjadi kesalahan saat memuat daftar barang.' });
            }
        });
    }, [navigate]);
    
    const deleteStuff = (id) => {
        instance.delete(`stuff/destroy/${id}`)
        .then(() => {
            setStuffs(stuffs.filter(stuff => stuff.id !== id));
            setSuccess('Barang berhasil dihapus.');
            setTimeout(() => {
                setSuccess('');
            }, 2000);
        })
        .catch(err => {
            setError(err.response.data);
        });
    };

    return (
        <Case>
            <div className="block w-full bg-gray-800 text-white border border-gray-200 rounded-lg shadow">
                <div className="m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium">Stuff</h5>
                        <Link to="/stuff/create">
                            <button className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg flex items-center">
                                <small className="text-white">Tambah</small>
                                <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                            </button>
                        </Link>
                    </div>

                    {success && (
                        <div role="alert">
                            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                                Berhasil!
                            </div>
                            <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                                {success}
                            </div>
                        </div>
                    )}

                    {Object.keys(error).length > 0 && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    {error.message}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium text-xs text-white uppercase bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Category</th>
                                    <th scope="col" className="px-6 py-4">Stock</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                {stuffs.map((stuff, id) => (
                                    <tr key={stuff.id} className="border-b border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.category}</td>
                                        {
                                            stuff.stock ? (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Total Available: {stuff.stock.total_available} <br/>
                                                    Total Defec: {stuff.stock.total_defec} <br/>
                                                </td>
                                            ) : (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Stock Belum Tersedia    
                                                </td>
                                            )
                                        }
                                        <td className="whitespace-nowrap px-6 py-4 flex space-x-2">
                                            <Link to={`/stuff/edit/${stuff.id}`}>
                                                <button className="px-4 py-2 bg-orange-500 rounded-lg font-bold text-white">Edit</button>
                                            </Link>
                                            <button onClick={() => deleteStuff(stuff.id)} type="button" className="px-4 py-2 bg-red-500 rounded-lg font-bold text-white">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}
