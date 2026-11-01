import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

function Habits() {

    const [name, setName] = useState("");
    const [habits, setHabits] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const handleUnauthorized = () => {
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        navigate("/login");
    };

    const today = new Date()
        .toISOString()
        .split("T")[0];

    const currentMonth =
        new Date().toISOString().slice(0, 7);

    const currentDate = new Date();

    const currentYear =
        currentDate.getFullYear();

    const currentMonthNumber =
        currentDate.getMonth();

    const totalDaysInMonth =
        new Date(
            currentYear,
            currentMonthNumber + 1,
            0
        ).getDate();

    const daysInMonth = Array.from(
        { length: totalDaysInMonth },
        (_, i) => i + 1
    );

    // FETCH HABITS
    const fetchHabits = async () => {

        try {

            const res = await axios.get(
               `${API_URL}/api/habits`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHabits(res.data);

        } catch (error) {
            if (error.response?.status === 401) {
                handleUnauthorized();
                return;
            }
            console.log(error);

        }

    };

    useEffect(() => {

        fetchHabits();

    }, []);

    // ADD HABIT
    const addHabit = async () => {

        if (!name.trim()) return;

        try {

            await axios.post(
                `${API_URL}/api/habits`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setName("");

            fetchHabits();

        } catch (error) {
            if (error.response?.status === 401) {
                handleUnauthorized();
                return;
            }
            console.log(error);

        }

    };

    // DELETE HABIT
    const deleteHabit = async (id) => {

        try {

            await axios.delete(
                `${API_URL}/api/habits/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchHabits();

        } catch (error) {
            if (error.response?.status === 401) {
                handleUnauthorized();
                return;
            }

            console.log(error);

        }

    };

    // TOGGLE DAY
    const toggleHabit = async (id, date) => {

        try {

            await axios.put(

                `${API_URL}/api/habits/${id}`,

                { date },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            fetchHabits();

        } catch (error) {
            if (error.response?.status === 401) {
                handleUnauthorized();
                return;
            }
            console.log(error);

        }

    };

    const calculateStreak = (completedDays) => {

        if (!completedDays || completedDays.length === 0) {
            return 0;
        }

        const sortedDays = [...completedDays].sort().reverse();

        let streak = 0;

        let currentDate = new Date();

        while (true) {

            const formattedDate =
                currentDate.toISOString().split("T")[0];

            if (sortedDays.includes(formattedDate)) {

                streak++;

                currentDate.setDate(
                    currentDate.getDate() - 1
                );

            } else {

                break;

            }

        }

        return streak;

    };
    const calculateConsistency = (completedDays) => {

        if (!completedDays || completedDays.length === 0) {
            return 0;
        }

        const currentMonthDays =
            completedDays.filter((date) => {

                return date.startsWith(currentMonth);

            }).length;

        return Math.floor(
            (currentMonthDays / totalDaysInMonth) * 100
        );

    };

    return (

        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold mb-8">
                Habits Tracker 🔥
            </h1>

            {/* INPUT */}
            <div className="flex gap-3 mb-8">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a new habit..."
                    className="
                        flex-1
                        px-4 py-3
                        rounded-xl
                        bg-zinc-900
                        border border-zinc-700
                        text-white
                        placeholder:text-zinc-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-emerald-500
                    "
                />

                <button
                    onClick={addHabit}
                    className="
                        bg-emerald-500
                        hover:bg-emerald-600
                        px-6 py-3
                        rounded-xl
                        font-semibold
                        transition
                    "
                >
                    Add
                </button>

            </div>

            {/* HABITS */}
            <div className="space-y-6">

                {habits.map((h) => (

                    <div
                        key={h._id}
                        className="
                            bg-zinc-900
                            border border-zinc-800
                            rounded-2xl
                            p-5
                        "
                    >

                        {/* TOP */}
                        <div className="flex justify-between items-start mb-5">

                            <div>

                                <h2 className="text-xl font-semibold">
                                    {h.name}
                                </h2>

                                <p className="text-yellow-400 text-sm mt-1">

                                    🔥 {calculateStreak(h.completedDays)} day streak

                                </p>
                                <p className="text-blue-400 text-sm mt-1">

                                    📈 {calculateConsistency(h.completedDays)}%
                                    consistency

                                </p>

                                <p className="text-zinc-400 text-sm mt-1">

                                    {
                                        h.completedDays?.includes(today)
                                            ? "Completed Today ✅"
                                            : "Pending Today ❌"
                                    }

                                </p>

                            </div>

                            <button
                                onClick={() => deleteHabit(h._id)}
                                className="
                                    bg-red-500
                                    hover:bg-red-600
                                    px-4 py-2
                                    rounded-lg
                                    text-sm
                                "
                            >
                                Delete
                            </button>

                        </div>

                        {/* MONTH TRACKER */}
                        <div className="flex flex-wrap gap-2">

                            {daysInMonth.map((day) => {

                                const formattedDay =
                                    String(day).padStart(2, "0");

                                const dateString =
                                    `${currentMonth}-${formattedDay}`;

                                const completed =
                                    h.completedDays?.includes(dateString);

                                return (

                                    <button
                                        key={day}
                                        onClick={() =>
                                            toggleHabit(
                                                h._id,
                                                dateString
                                            )
                                        }
                                        className={`
                                            w-9 h-9 rounded-lg
                                            text-sm font-semibold
                                            transition
                                            ${completed
                                                ? "bg-emerald-500 hover:bg-emerald-600"
                                                : "bg-zinc-700 hover:bg-zinc-600"
                                            }
                                        `}
                                    >

                                        {day}

                                    </button>

                                );

                            })}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Habits;