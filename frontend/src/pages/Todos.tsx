
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store";
import API from "../api";

export default function Todos() {
  const token = useAuthStore((s) => s.token);
  const [todos, setTodos] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await API(token).getTodos();
    setTodos(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await API(token).addTodo(title);
    setTitle("");
    load();
  };

  const toggle = async (id: string, completed: boolean) => {
    await API(token).updateTodo(id, { completed: !completed });
    load();
  };

  const del = async (id: string) => {
    await API(token).deleteTodo(id);
    load();
  };

  if (!token)
    return (
      <h3 className="p-6 text-center text-lg text-red-600 font-semibold">
        Please login to view your todos
      </h3>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Todos
      </h2>

      
      <form onSubmit={add} className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Todo..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      
      <ul className="space-y-3">
        {todos.map((t) => (
          <li
            key={t._id}
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggle(t._id, t.completed)}
              className="h-5 w-5"
            />

            <span
              className={`flex-1 text-lg ${
                t.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {t.title}
            </span>

            <button
              onClick={() => del(t._id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
