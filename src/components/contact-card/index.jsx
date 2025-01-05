import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { toast } from 'sonner';

const ContactCard = ({
    name,
    role,
    email,
    phone,
    location,
    linkedin,
    github,
    dp,
    id,
    friendStatus, // A prop that determines if the user is already friends
}) => {
    // const [initialFriendStatus, setInitialFriendStatus] = useState(isFriend); // Set initial friend status
    // const [isBlocked, setIsBlocked] = useState(false); // Block status

    // Function to toggle friend status
    const handleFriendToggle = async () => {
        try {
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
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An Error Occured');
        }
    };

    // // Function to toggle block status
    // const handleBlockToggle = async () => {
    //     try {
    //         const response = await fetch(`/api/block/${id}`, {
    //             method: isBlocked ? 'DELETE' : 'POST', // DELETE to unblock, POST to block
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userId: currentUserId,
    //                 blockedId: id,
    //             }),
    //         });

    //         if (response.ok) {
    //             setIsBlocked(!isBlocked); // Update the block status
    //         } else {
    //             alert('Error with block request');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('There was an issue processing the block request.');
    //     }
    // };

    return (
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-xs sm:max-w-md mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                    <img className="object-cover" src={dp} alt={`${name}'s Profile Picture`} width={96} height={96} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
                <p className="text-gray-500 mb-4">{role}</p>
            </div>

            <div className="text-gray-700">
                <p className="flex items-center mb-2">
                    <FiMail className="w-5 h-5 text-blue-500 mr-2" /> {email}
                </p>
                {/* <p className="flex items-center mb-2">
                    <FiPhone className="w-5 h-5 text-blue-500 mr-2" /> {phone}
                </p>
                <p className="flex items-center mb-2">
                    <FiMapPin className="w-5 h-5 text-blue-500 mr-2" /> {location}
                </p> */}
            </div>

            <div className="flex justify-center space-x-4 mt-4">
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-700" />
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                </a>
            </div>

            {/* Buttons to manage friendship and block status */}
            <div className="mt-4 flex justify-center items-center">
                <button
                    onClick={handleFriendToggle}
                    className={`px-4 py-2 text-white rounded-md ${friendStatus == "accepted" ? 'bg-red-500' : 'bg-green-500'
                        }`}
                >
                    {friendStatus == "accepted" ? 'Unfriend' : friendStatus == "pending" ? 'Pending' : "Add Friend"}
                </button>

                {/* <button
                    onClick={handleBlockToggle}
                    className={`px-4 py-2 text-white rounded-md ${isBlocked ? 'bg-gray-500' : 'bg-blue-500'
                        }`}
                >
                    {isBlocked ? 'Unblock' : 'Block'}
                </button> */}
            </div>
        </div>
    );
};

export default ContactCard;
