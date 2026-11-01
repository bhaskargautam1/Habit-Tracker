import { Link, Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
    const navigate = useNavigate();
    const handleLogout = () => {
  
        localStorage.removeItem("token");

        window.location.replace("/login"); 
    };
    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">

<ul className="flex flex-col gap-2">

<Link
    to="/"
    className="
        px-4 py-3 rounded-lg
        hover:bg-zinc-800
        transition
    "
>
    Dashboard
</Link>

<Link
    to="/habits"
    className="
        px-4 py-3 rounded-lg
        hover:bg-zinc-800
        transition
    "
>
    Habits
</Link>

<Link
    to="/goals"
    className="
        px-4 py-3 rounded-lg
        hover:bg-zinc-800
        transition
    "
>
    Goals
</Link>

<Link
    to="/journal"
    className="
        px-4 py-3 rounded-lg
        hover:bg-zinc-800
        transition
    "
>
    Journal
</Link>

<Link
    to="/settings"
    className="
        px-4 py-3 rounded-lg
        hover:bg-zinc-800
        transition
    "
>
    Settings
</Link>

</ul>
            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col">

                {/* TOP BAR */}
                <div className="h-16 bg-zinc-900 flex items-center justify-between px-6">
                    <h2 className="text-lg">Dashboard</h2>

                    <button
                        onClick={handleLogout}
                        
                        className="
        bg-red-500
        hover:bg-red-600
        px-4 py-2
        rounded-lg
    "
                    >
                        Logout
                    </button>
                </div>

                {/* PAGE CONTENT */}
                <div className="p-6">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}

export default DashboardLayout;