import { Button } from '@headlessui/react';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Search = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [disableButton, setDisableButton] = useState(false)

  function handleSearch() {
    if (!query.trim()) return; // Prevent empty search query

    setLoading(true);
    setError(null); // Reset any previous errors

    console.log('Search started...', query);

    fetch(`https://friendz-backend.vercel.app/search?query=${query}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users'); // Handle non-OK responses
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data.users);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError('An error occurred while fetching users.');
        setLoading(false);
      });
  }

  // Function to toggle friend status
  const handleFriendToggle = async (id, friendStatus) => {
    try {
      setDisableButton(true)
      const response = await fetch(`https://friendz-backend.vercel.app/${id}`, {
        method: friendStatus == "accepted" ? 'DELETE' : friendStatus == "pending" ? 'DELETE' : "POST", // DELETE to unfriend, POST to add friend
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}` || "",
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });
      console.log(response)
      let data = await response.json();
      console.log(data)
      if (response.ok) {
        toast.success("Successfull")
      } else {
        toast.error('Error with friend request');
        setDisableButton(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An Error Occured');
      setDisableButton(false)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search users, friends"
          className="p-2 rounded border flex-grow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          className="p-2 bg-blue-500 text-white rounded ml-2"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div>
        <p className="text-xl font-semibold">Search Results</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {data.length > 0 ? (
            data.map((user) => (
              <div
                key={user?._id}
                className="flex flex-col items-center border p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={user?.dp}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <div className="text-lg font-semibold">{user?.name}</div>
                <div className="text-sm text-gray-500 mb-2">{user?.email}</div>
                {
                  user._id.toString() === JSON.parse(localStorage.getItem('user')).UserID.toString()
                    ? null
                    : (
                      <Button disabled={disableButton} onClick={()=>handleFriendToggle(user._id, user.isFriend)} className={`mt-2 bg-green-500 text-white rounded p-2 ${user?.isFriend == "accepted" ? 'bg-red-500' : 'bg-green-500'
                        }`}>
                        {user?.isFriend === 'accepted'
                          ? 'Unfriend'
                          : user?.isFriend === 'pending'
                            ? 'Pending'
                            : 'Add Friend'}
                      </Button>
                    )
                }
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
