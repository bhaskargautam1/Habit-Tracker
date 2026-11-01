import { useNavigate } from "react-router-dom";

function Settings() {

    const navigate = useNavigate();

    // LOGOUT
    const handleLogout = () => {
    
        alert("Logging out");
      
        localStorage.removeItem("token");
      
        window.location.replace("/login");
      };

    return (

        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold mb-8">
                Settings ⚙️
            </h1>

            {/* PROFILE CARD */}
            <div
                className="
                    bg-zinc-900
                    border border-zinc-800
                    rounded-xl
                    p-6
                    mb-6
                "
            >

                <h2 className="text-xl font-semibold mb-4">
                    Profile
                </h2>

                <div className="space-y-2 text-zinc-300">

                    <p>Email: user@example.com</p>

                    <p>Account Type: Free Plan</p>

                </div>

            </div>

            {/* LOGOUT CARD */}
            <div
                className="
                    bg-zinc-900
                    border border-zinc-800
                    rounded-xl
                    p-6
                "
            >

                <h2 className="text-xl font-semibold mb-4">
                    Account
                </h2>

                <button
                    onClick={handleLogout}
                    className="
                        bg-red-500
                        hover:bg-red-600
                        px-5 py-3
                        rounded-lg
                        font-semibold
                    "
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Settings;