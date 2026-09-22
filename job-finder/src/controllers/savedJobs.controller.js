import UserProfile from "../models/UserProfile.js";
import SavedJob from "../models/SavedJob.js";

export const saveJob = async (req, res) => {
  const { externalJobId, title, company, location, description, url, source } =
    req.body;

  let userProfile = await UserProfile.findOne({
    clerkUserId: req.currentUserId,
  });

  if (!userProfile) {
    userProfile = await UserProfile.create({
      clerkUserId: req.currentUserId,
    });
  }

  const savedJob = await SavedJob.create({
    userProfileId: userProfile._id,
    externalJobId,
    title,
    company,
    location,
    description,
    url,
    source,
  });

  res.status(201).json(savedJob);
};

export const getSavedJob = async (req, res) => {
  const userProfile = await UserProfile.findOne({
    clerkUserId: req.currentUserId,
  });
  if (!userProfile) {
    return res.status(200).json([]);
  }

  const savedJobs = await SavedJob.find({
    userProfileId: userProfile._id,
  });

  res.status(200).json(savedJobs);
};
