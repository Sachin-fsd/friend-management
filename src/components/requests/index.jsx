import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const RequestsComponent = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the pending requests when the component mounts
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch('https://friendz-backend.vercel.app/requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}` || "",
          },
        });
        const data = await response.json();

        if (response.ok) {
          console.log(data)
          setPendingRequests(data.pendingRequests);
        } else {
          setError(data.msg || 'Failed to load requests');
        }
      } catch (err) {
        setError('Error fetching requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const response = await fetch(`https://friendz-backend.vercel.app/request/accept/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}` || "",
        },
      });

      if (response.ok) {
        setPendingRequests(prevRequests =>
          prevRequests.filter(request => request._id !== requestId)
        );
        toast('Friend request accepted');
      } else {
        toast('Failed to accept the request');
      }
    } catch (err) {
      console.error('Error accepting request', err);
      toast('Error accepting request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await fetch(`https://friendz-backend.vercel.app/request/reject/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}` || "",
        },
      });

      if (response.ok) {
        setPendingRequests(prevRequests =>
          prevRequests.filter(request => request._id !== requestId)
        );
        toast('Friend request rejected');
      } else {
        toast('Failed to reject the request');
      }
    } catch (err) {
      console.error('Error rejecting request', err);
      toast('Error rejecting request');
    }
  };

  // Render loading, error, or the list of pending requests
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Pending Friend Requests</h2>
      <div className="mt-4 space-y-4">
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request, index) => (
            <div key={index} className="flex items-center border-b pb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img className="object-cover" src={request.sentBy.dp} alt={`${request.sentBy.name}'s Profile`} />
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{request.sentBy.name}</p>
                <p>{request.sentBy.email}</p>
                <p className="text-sm text-gray-500">
                  Sent at: {new Date(request.sentAt).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-4 ml-4">
                <button
                  onClick={() => handleAccept(request.sentBy._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.sentBy._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No pending requests</div>
        )}
      </div>
    </div>
  );
};

export default RequestsComponent;
