import { useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";
import axios from "axios";

function Dashboard() {

    const [habits, setHabits] = useState([]);
    const [goals, setGoals] = useState([]);
    const [journals, setJournals] = useState([]);

    // 🆕 TODO STATE
    const [todoText, setTodoText] = useState("");
    const [todos, setTodos] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchDashboardData();
        const saved = JSON.parse(localStorage.getItem("todos"));
        if (saved) setTodos(saved);
    }, []);

    const fetchDashboardData = async () => {
        try {

            const habitsRes = await axios.get(
                "http://localhost:4000/api/habits",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const goalsRes = await axios.get(
                "http://localhost:4000/api/goals",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const journalsRes = await axios.get(
                "http://localhost:4000/api/journal",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setHabits(habitsRes.data);
            setGoals(goalsRes.data);
            setJournals(journalsRes.data);

        } catch (error) {
            console.log(error);
        }
    };

    // DATE
    const today = new Date().toISOString().split("T")[0];

    // HABITS
    const completedHabits = habits.filter(
        (h) => h.completedDays?.includes(today)
    ).length;

    const pendingHabits = habits.length - completedHabits;

    const averageGoalProgress =
        goals.length > 0
            ? Math.floor(
                goals.reduce((acc, g) => acc + g.progress, 0) / goals.length
            )
            : 0;

    // STREAK
    const calculateStreak = (completedDays = []) => {

        if (!completedDays.length) return 0;

        const sorted = [...completedDays].sort().reverse();

        let streak = 0;
        let current = new Date();

        while (true) {

            const date = current.toISOString().split("T")[0];

            if (sorted.includes(date)) {
                streak++;
                current.setDate(current.getDate() - 1);
            } else break;
        }

        return streak;
    };

    // LEADERBOARD
    const leaderboard = [...habits]
        .map((h) => ({
            name: h.name,
            streak: calculateStreak(h.completedDays || [])
        }))
        .sort((a, b) => b.streak - a.streak)
        .slice(0, 5);

    // MOTIVATION
    const quotes = [
        "Discipline beats motivation.",
        "Small habits create big results.",
        "Stay consistent, not perfect.",
        "You are what you repeat.",
        "One day or day one — you decide."
    ];

    const randomQuote =
        quotes[Math.floor(Math.random() * quotes.length)];

    // CHART DATA
    const habitData = [
        { name: "Completed", value: completedHabits },
        { name: "Pending", value: pendingHabits }
    ];

    const goalData = goals.map((g) => ({
        name: g.title,
        progress: g.progress
    }));

    const COLORS = ["#22c55e", "#ef4444"];

    // 🆕 TODO FUNCTIONS
    const saveTodos = (updated) => {
        setTodos(updated);
        localStorage.setItem("todos", JSON.stringify(updated));
    };

    const addTodo = () => {
        if (!todoText.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: todoText,
            done: false
        };

        const updated = [...todos, newTodo];
        saveTodos(updated);
        setTodoText("");
    };

    const toggleTodo = (id) => {
        const updated = todos.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
        );

        saveTodos(updated);
    };
    const deleteTodo = (id) => {
        const updated = todos.filter((t) => t.id !== id);
        saveTodos(updated);
    };
    return (

        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold mb-8">
                Dashboard 📊
            </h1>

            {/* TODAY SUMMARY */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-3">
                    Today Summary
                </h2>

                <div className="flex gap-10">
                    <p className="text-emerald-400 font-semibold">
                        ✅ {completedHabits} Done
                    </p>

                    <p className="text-red-400 font-semibold">
                        ❌ {pendingHabits} Pending
                    </p>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-zinc-400">Total Habits</h2>
                    <p className="text-3xl font-bold">{habits.length}</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-zinc-400">Completed Today</h2>
                    <p className="text-3xl font-bold">{completedHabits}</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-zinc-400">Goal Progress</h2>
                    <p className="text-3xl font-bold">{averageGoalProgress}%</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-zinc-400">Journal Entries</h2>
                    <p className="text-3xl font-bold">{journals.length}</p>
                </div>

            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-[400px]">
                    <h2 className="text-lg mb-4">Habit Completion</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={habitData} dataKey="value" outerRadius={120} label>
                                {habitData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-[400px]">
                    <h2 className="text-lg mb-4">Goal Progress</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={goalData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="progress" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* 🆕 TODO BOX (SIMPLE) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8">

                <h2 className="text-xl font-semibold mb-4">
                    📝 Quick Todo
                </h2>

                {/* INPUT */}
                <div className="flex gap-3 mb-4">
                    <input
                        value={todoText}
                        onChange={(e) => setTodoText(e.target.value)}
                        placeholder="Add small task..."
                        className="flex-1 px-3 py-2 bg-zinc-800 rounded-lg"
                    />

                    <button
                        onClick={addTodo}
                        className="bg-emerald-500 px-4 rounded-lg"
                    >
                        Add
                    </button>
                </div>

                {/* LIST */}
                <div className="space-y-2">

                    {todos.map((t) => (
                        <div
                            key={t.id}
                            className="flex items-center justify-between py-2 border-b border-zinc-800"
                        >

                            <div
                                onClick={() => toggleTodo(t.id)}
                                className="cursor-pointer flex items-center gap-2"
                            >
                                <span>{t.done ? "✔️" : "⬜"}</span>

                                <span className={t.done ? "line-through text-gray-400" : ""}>
                                    {t.text}
                                </span>
                            </div>

                            <button
                                onClick={() => deleteTodo(t.id)}
                                className="text-red-400 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </div>
                    ))}

                </div>

            </div>

            {/* LEADERBOARD */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8">

                <h2 className="text-xl font-semibold mb-4">
                    🏆 Streak Leaderboard
                </h2>

                {leaderboard.map((h, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-zinc-800">
                        <span>{h.name}</span>
                        <span className="text-yellow-400">🔥 {h.streak} days</span>
                    </div>
                ))}

            </div>

            {/* MOTIVATION */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600">
                <h2 className="text-white font-semibold text-lg">
                    💡 Motivation
                </h2>
                <p className="text-white mt-2">
                    {randomQuote}
                </p>
            </div>

        </div>
    );
}

export default Dashboard;