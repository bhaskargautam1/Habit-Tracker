import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";


function Goals() {

    const [title, setTitle] = useState("");
    const [goals, setGoals] = useState([]);

    const token = localStorage.getItem("token");

    // FETCH GOALS
    const fetchGoals = async () => {

        const res = await axios.get(
            `${API_URL}/api/goals`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setGoals(res.data);
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    // ADD GOAL
    const addGoal = async () => {

        await axios.post(
            `${API_URL}/api/goals`,
            { title },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setTitle("");
        fetchGoals();
    };

    // DELETE GOAL
    const deleteGoal = async (id) => {

        await axios.delete(
            `${API_URL}/api/goals/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchGoals();
    };

    // UPDATE PROGRESS
    const updateProgress = async (id, progress) => {

        await axios.put(
            `${API_URL}/api/goals/${id}`,
            { progress },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchGoals();
    };

    return (
        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold mb-6">
                Goals 🎯
            </h1>

            {/* INPUT */}
            <div className="flex gap-3 mb-6">

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter goal..."
                    className="
                        flex-1
                        px-4 py-3
                        rounded-lg
                        bg-zinc-900
                        border border-zinc-700
                        text-white
                    "
                />

                <button
                    onClick={addGoal}
                    className="
                        bg-blue-500
                        hover:bg-blue-600
                        px-5 py-3
                        rounded-lg
                    "
                >
                    Add
                </button>

            </div>

            {/* GOALS */}
            <div className="space-y-4">

                {goals.map((g) => (

                    <div
                        key={g._id}
                        className="
                            bg-zinc-900
                            border border-zinc-800
                            p-4
                            rounded-lg
                        "
                    >

                        <div className="flex justify-between mb-3">

                            <h2 className="text-lg font-semibold">
                                {g.title}
                            </h2>

                            <button
                                onClick={() => deleteGoal(g._id)}
                                className="
                                    bg-red-500
                                    hover:bg-red-600
                                    px-3 py-1
                                    rounded
                                "
                            >
                                Delete
                            </button>

                        </div>

                        {/* PROGRESS */}
                        <div className="space-y-3">

{/* BAR */}
<div className="w-full bg-zinc-700 rounded-full h-3">

    <div
        className="
            bg-blue-500
            h-3
            rounded-full
        "
        style={{
            width: `${g.progress}%`
        }}
    />

</div>

{/* CONTROLS */}
<div className="flex items-center justify-between">

    <p>{g.progress}% Complete</p>

    <div className="flex gap-2">

        <button
            onClick={() =>
                updateProgress(
                    g._id,
                    Math.max(0, g.progress - 10)
                )
            }
            className="
                bg-zinc-700
                px-3 py-1
                rounded
            "
        >
            -10
        </button>

        <button
            onClick={() =>
                updateProgress(
                    g._id,
                    Math.min(100, g.progress + 10)
                )
            }
            className="
                bg-blue-500
                px-3 py-1
                rounded
            "
        >
            +10
        </button>

    </div>

</div>

</div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Goals;