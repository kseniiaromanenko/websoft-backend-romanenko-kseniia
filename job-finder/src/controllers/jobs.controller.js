import jobs from "../data/jobs.json" with { type: "json" };

export const searchJobs = (req, res) => {
  const { keywords = "", location = "" } = req.query;
  const filteredJobs = jobs.filter((job) => {
    const matchesKeywords =
      job.title.toLowerCase().includes(keywords.toLowerCase()) ||
      job.description.toLowerCase().includes(keywords.toLowerCase());

    const matchesLocation = job.location
      .toLowerCase()
      .includes(location.toLowerCase());
    return matchesKeywords && matchesLocation;
  });
  res.status(200).json(filteredJobs);
};
export const getAllJobs = (req, res) => {
  res.status(200).json(jobs);
};
