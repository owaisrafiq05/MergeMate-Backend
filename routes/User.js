import express from "express";
import {
  addUser,
  viewAllUsers,
  viewUserById,
  editUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

// Add a new user
router.post("/", addUser);

// Get all users
router.get("/", viewAllUsers);

// Get a user by ID
router.get("/:userId", viewUserById);

// Edit a user by ID
router.put("/:userId", editUser);

// Delete a user by ID
router.delete("/:userId", deleteUser);

export default router;
