import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword , setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleShowPassword = () =>{
        setShowPassword(!showPassword);
    }; 

    const handleRegister = async (e) => {
        
        e.preventDefault();
       
        try {
            const response = await axios.post(
               
                "http://localhost:4000/api/auth/register",
               
                {
                    name, email, password
                }

            );

            console.log(response.data);

            alert("User Registered Successfully");
            navigate("/");


        } catch (error) {
            
            console.log(error);
            
            alert("Registration failed");
        }
    };

    return (

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            <div className="bg-zinc-900 p-8 rounded-2xl w-[400px]">

                <h1 className="text-white text-3xl font-bold mb-6 text-center">
                    Register
                </h1>

                <form
                onSubmit={handleRegister} 
                className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 rounded-lg bg-zinc-800 text-white outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 rounded-lg bg-zinc-800 text-white outline-none"
                    />

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 rounded-lg bg-zinc-800 text-white outline-none"
                    />
                     <button
                        type="button"
                        onClick={handleShowPassword}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>

                    <button
                        className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg font-semibold"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;