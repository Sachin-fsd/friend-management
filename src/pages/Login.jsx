import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const {toast} = useToast()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setError("");
        setLoading(true);

        try {
            // Example of sending login data to a backend
            const response = await fetch("https://friendz-backend.vercel.app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response && response.ok) {
                navigate(data.redirectTo);
            }
            console.log(response)
            console.log(data)
            if (response.ok) {
                // Handle successful login
                // console.log("Login Successful:", data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(data.UserDetails));
                toast({
                    title: "Login Successfull"
                })

                // alert("Login successful!"); // Replace with navigation or state update
            } else {
                // Handle login errors
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 font-semibold rounded-md transition duration-200 ${loading
                            ? "bg-blue-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
