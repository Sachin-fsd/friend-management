import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Suggestions = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [disableAddFriend, setDisableAddFriend] = useState(false)

    function handleAddFriend(id) {
        try {
            setDisableAddFriend(true);
            toast("sending request...")
            fetch(`http://localhost:8080/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                method:"POST"
            }).then(res => {
                console.log(res);
                if (res.ok) {
                    toast.success("Request Sent Successfully");
                }
            })
        } catch (error) {
            console.log(error);
            toast.error("Failed")
            setDisableAddFriend(false);
        }
    }

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch('http://localhost:8080/suggestions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setUsers(data.suggestions || []);
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
            <h2 className="text-2xl font-bold text-center mb-6">Suggestions</h2>

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
                                    src={user.friendDetails.dp || 'https://via.placeholder.com/150'}
                                    alt={`${user.name}'s profile`}
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <div className="text-center">
                                    <h4 className="text-lg font-semibold">{user.friendDetails.name}</h4>
                                    <p className="text-sm text-gray-500">{user.friendDetails.email}</p>
                                    <p>Friend of {user.whoseFriendDetails.name}</p>
                                    <Button disabled={disableAddFriend} id="addFriend" onClick={() => handleAddFriend(user.friendDetails._id)}>Add Friend</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-600 text-center text-lg">
                            No suggestions available
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Suggestions;
