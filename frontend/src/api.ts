// api
const base = "/api";

const API = (token?: string) => ({
  signup: (email: string, password: string) =>
    fetch(`${base}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    }).then((r) => r.json()),

  login: (email: string, password: string) =>
    fetch(`${base}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    }).then((r) => r.json()),

  getTodos: () =>
    fetch(`${base}/todos`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }).then((r) => r.json()),

  addTodo: (title: string) =>
    fetch(`${base}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    }).then((r) => r.json()),

  updateTodo: (id: string, body: any) =>
    fetch(`${base}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }).then((r) => r.json()),

  deleteTodo: (id: string) =>
    fetch(`${base}/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((r) => r.json())
});

export default API;
