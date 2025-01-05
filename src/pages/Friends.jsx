import React, { useEffect, useState } from 'react';

const FriendsComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch('http://localhost:8080/friends', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data)

                setUsers(data.friends || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Friends</h2>

            {loading && (
                <div className="flex justify-center items-center text-gray-600 text-lg">
                    Loading...
                </div>
            )}

            {error && (
                <div className="text-red-500 text-center text-lg mt-4">{error}</div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user._id}
                                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={user.dp || 'https://via.placeholder.com/150'}
                                    alt={`${user.name}'s profile`}
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <div className="text-center">
                                    <h4 className="text-lg font-semibold">{user.name}</h4>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-600 text-center text-lg">
                            Add some Friends
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FriendsComponent;
