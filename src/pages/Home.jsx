import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactCard from '@/components/contact-card';
import { toast } from "sonner";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://friendz-backend.vercel.app/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });

        const data = await response.json();
        console.log(data)
        if (response.ok && data.users) {
          setUsers(data.users);
        } else {
          throw new Error(data.message || "Failed to load users.");
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    const isLoggedIn = localStorage.getItem("loggedIn") && localStorage.getItem("token");

    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [navigate]);

  return (
    <div className="home-container min-h-screen bg-gray-100 p-4">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : users.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center">
          {users.map((contact, index) => (
            <ContactCard
              key={index}
              id={contact._id}
              name={contact.name}
              role={contact.role}
              email={contact.email}
              phone={contact.phone}
              location={contact.location}
              linkedin={contact.linkedin}
              github={contact.github}
              dp={contact.dp}
              friendStatus={contact.friendStatus}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default Home;
