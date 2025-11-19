import { Router } from "express";
import User from "../models/User";
import Log from "../models/Log";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = process.env.JWT_SECRET || "devsecret";

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 8);
    const user = await User.create({ email, password: hashed });

    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token });
  } catch (err: any) {
    await Log.create({ message: err.message, stack: err.stack });
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token });
  } catch (err: any) {
    await Log.create({ message: err.message, stack: err.stack });
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
