import { useState, useEffect } from "react";

import axios from "axios";

import API_URL from "../api";

function Journal() {

    const [text, setText] = useState("");

    const [entries, setEntries] = useState([]);

    const token = localStorage.getItem("token");

    // FETCH ENTRIES
    const fetchEntries = async () => {

        const res = await axios.get(
           `${API_URL}/api/journal`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setEntries(res.data);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    // ADD ENTRY
    const addEntry = async () => {

        await axios.post(
            `${API_URL}/api/journal`,
            { text },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setText("");

        fetchEntries();
    };

    // DELETE ENTRY
    const deleteEntry = async (id) => {

        await axios.delete(
           `${API_URL}/api/journal/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchEntries();
    };

    return (

        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold mb-6">
                Journal 📓
            </h1>

            {/* INPUT */}
            <div className="mb-6">

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your thoughts..."
                    rows="5"
                    className="
                        w-full
                        bg-zinc-900
                        border border-zinc-700
                        rounded-lg
                        p-4
                        text-white
                        placeholder:text-zinc-500
                        focus:outline-none
                    "
                />

                <button
                    onClick={addEntry}
                    className="
                        mt-3
                        bg-emerald-500
                        hover:bg-emerald-600
                        px-5 py-2
                        rounded-lg
                    "
                >
                    Save Entry
                </button>

            </div>

            {/* ENTRIES */}
            <div className="space-y-4">

                {entries.map((e) => (

                    <div
                        key={e._id}
                        className="
                            bg-zinc-900
                            border border-zinc-800
                            rounded-lg
                            p-4
                        "
                    >

                        <div className="flex justify-between mb-3">

                            <p className="text-zinc-400 text-sm">

                                {new Date(
                                    e.createdAt
                                ).toLocaleString()}

                            </p>

                            <button
                                onClick={() =>
                                    deleteEntry(e._id)
                                }
                                className="
                                    bg-red-500
                                    hover:bg-red-600
                                    px-3 py-1
                                    rounded
                                    text-sm
                                "
                            >
                                Delete
                            </button>

                        </div>

                        <p className="leading-relaxed">
                            {e.text}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Journal;