import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_URL from "../api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
               `${API_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            );

            // Save token
            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            // redirect to dashboard
            navigate("/");

        } catch (error) {

            console.log(error);

            if (error.response?.status === 401) {
                alert("Invalid credentials");
            } else {
                alert("Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            <div className="bg-zinc-900 p-8 rounded-2xl w-[400px] shadow-lg">

                <h1 className="text-white text-3xl font-bold mb-6 text-center">
                    Welcome Back 👋
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">

                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    {/* PASSWORD */}
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        className="p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                        type="button"
                        onClick={handleShowPassword}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            bg-emerald-500 
                            hover:bg-emerald-600 
                            text-white 
                            p-3 
                            rounded-lg 
                            font-semibold 
                            transition
                            disabled:opacity-50
                        "
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* FOOTER */}
                <p className="text-zinc-400 text-sm mt-4 text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-teal-400 hover:text-teal-300 font-medium">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;