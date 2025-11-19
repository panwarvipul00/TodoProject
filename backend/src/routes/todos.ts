// todo routes
import { Router } from "express";
import Todo from "../models/Todo";
import Log from "../models/Log";
import { requireAuth } from "../middleware/auth";
import { AuthRequest } from "../types";

const router = Router();

router.use(requireAuth);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err: any) {
    await Log.create({ message: err.message, stack: err.stack });
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const todo = await Todo.create({
      userId: req.userId,
      title: req.body.title
    });
    res.json(todo);
  } catch (err: any) {
    await Log.create({ message: err.message, stack: err.stack });
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req: AuthRequest, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err: any) {
    await Log.create({ message: err.message, stack: err.stack });
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ ok: true });
  } catch (err: any) {
    await Log.create({ message: err.message, stack: err.stack });
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
