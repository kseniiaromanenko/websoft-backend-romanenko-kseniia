import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  targetPosition: {
    type: String,
  },
  skills: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
  },
});
const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
