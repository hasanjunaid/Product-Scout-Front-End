import React, { useState, useEffect } from 'react';
import './CSS/selectcategory.css';
import doc2 from './Image/s1.png';
import { useNavigate } from 'react-router-dom';

export default function SelectCategory() {
    const [namei, setname] = useState("");
    const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
    const [seain, seaset] = useState("");
    const [pref, allpref] = useState({ categories: [] });
    const navigate = useNavigate();

    useEffect(() => {
        const name = sessionStorage.getItem("email") || "";
        setname(name);
        if (name === "") {
            navigate('/login');
        }

        fetch('http://127.0.0.1:5000/get_all_pref', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => {
            response.json().then((body) => {
                allpref(body);
            });
        });

        fetch('http://127.0.0.1:5000/get_all_categories', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => {
            response.json().then((body) => {
                // Handle response
            });
        });
    }, [navigate]);

    const search = () => {
        // Implement search functionality
    };

    const seat = (e: React.ChangeEvent<HTMLInputElement>) => {
        seaset(e.target.value);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;

        setCheckedOptions((prevCheckedOptions) => {
            if (checked) {
                return [...prevCheckedOptions, value];
            } else {
                return prevCheckedOptions.filter((option) => option !== value);
            }
        });
    };

    const submit = async () => {
        navigate('/hotcategories');
        await fetch('http://127.0.0.1:5000/prefset', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                "username": namei,
                "pref": checkedOptions,
            }),
        }).then((response) => {
            // Handle response
        });
    };

    return (
        <>
            <div className='categorySelection'>
                <div className='nav'>
                    <p className='labelh'>Product Scout</p>
                    <div className='nav-cont'>
                        <div>
                            <div className="search-containerh">
                                <i className="search-icon fas fa-search"></i>
                                <input
                                    className="search-inputh"
                                    type="text"
                                    placeholder="Article name or keywords..."
                                    onChange={seat}
                                    value={seain}
                                />
                            </div>
                            <button className='Searchbut' onClick={search}>Search</button>
                            <button className='cati' onClick={() => { navigate("/select-category") }}>Home</button>
                            <button className='logouts' onClick={() => { navigate("/") }}>Logout</button>
                            <button className='trends' onClick={() => { navigate("/hotcategories") }}>Hot Products</button>
                            <button className='calculator' onClick={() => { navigate("/calculator") }}>Profit Calculator</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img className='a11' src={doc2} alt='Product' />
                    <h1 className='a5'>Please select your Preferred Categories</h1>
                    <form className='forms'>
                        {pref.categories.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={option}
                                    value={option}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='labelf' htmlFor={option}>{option}</label>
                            </div>
                        ))}
                        <button onClick={submit} className='subpref'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
