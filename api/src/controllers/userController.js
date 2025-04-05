const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!User || users.length === 0) {
      return res.status(400).json({ message: "No user found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server errror", error });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server errror", error });
  }
};

exports.createUser = async (req, res, next) => {
  const { userName, email, passwordHash, displayName, role } = req.body;
  // TODO: Encrypt passwordHash before saving
  try {
    const newUser = new User({
      userName,
      email,
      passwordHash,
      displayName,
      role,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server errror", error });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server errror", error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server errror", error });
  }
};
