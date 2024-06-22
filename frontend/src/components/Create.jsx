import React, { useState } from 'react';

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addUser = { name, email, age };

        try {
            const response = await fetch('http://localhost:5000', {
                method: 'POST',
                body: JSON.stringify(addUser),
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            if (!response.ok) {
                const errorResult = await response.json();
                console.error(errorResult.error);
                setError(errorResult.error);
                return;
            }

            const result = await response.json();
            console.log(result);
            setError("");
            setName("");
            setEmail("");
            setAge(0);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError('There was a problem with the fetch operation');
        }
    };

    return (
        <div className='container my-2'>
            {error && <div className="alert alert-danger">{error}</div>}
            <h2 className='text-center'>Enter the data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" value={age}
                        onChange={(e) => setAge(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Create;