import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      "User registered successfully"
    )
  );
});

// @desc    Update User Profile
// @route   PUT /api/users/profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.name = req.body.name || user.name;
  user.image = req.body.image || user.image;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        role: updatedUser.role,
      },
      "Profile updated successfully"
    )
  );
});

// @desc    Get All Users (Admin Only)
// @route   GET /api/admin/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  if (!users) {
    throw new ApiError(404, "No users found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});
