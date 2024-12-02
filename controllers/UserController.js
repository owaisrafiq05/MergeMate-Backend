import User from "../models/User.js"; 

// Add a new user
export const addUser = async (req, res) => {
  const { username, email, firstName, lastName, externalAccounts } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      firstName,
      lastName,
      externalAccounts,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
};

// View all users
export const viewAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
};

// Edit a user by ID
export const editUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, firstName, lastName } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// View a user by ID
export const viewUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};
