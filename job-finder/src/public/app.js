const form = document.getElementById("search-form");
const keywordsInput = document.getElementById("keywords");
const locationInput = document.getElementById("location");
const results = document.getElementById("results");
const message = document.getElementById("message");
const showAllButton = document.getElementById("show-all-button");
const showSavedButton = document.getElementById("show-saved-button");
const savedResults = document.getElementById("saved-results");
const savedJobsSection = document.getElementById("saved-jobs-section");

let currentJobs = [];
const getAuthHeaders = async () => {
  if (!window.Clerk?.session) {
    return {};
  }

  const token = await window.Clerk.session.getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

const renderJobs = (jobs) => {
  results.innerHTML = "";

  jobs.forEach((job) => {
    const card = document.createElement("article");
    card.innerHTML = `
      <h2>${job.title}</h2>
      <p>${job.company} — ${job.location}</p>
      <p>${job.description}</p>
      <a href="${job.url}" target="_blank">Job link</a>
      <button>Save</button>
    `;

    const saveButton = card.querySelector("button");

    saveButton.addEventListener("click", () => {
      saveJob(job);
    });

    results.appendChild(card);
  });
};

const loadJobs = async (url) => {
  savedJobsSection.hidden = true;
  const response = await fetch(url);
  const jobs = await response.json();

  currentJobs = jobs;
  renderJobs(currentJobs);

  message.textContent = `Found jobs: ${currentJobs.length}`;
};

const renderSavedJobs = (jobs) => {
  savedResults.innerHTML = "";
  savedJobsSection.hidden = false;
  jobs.forEach((job) => {
    const card = document.createElement("article");

    card.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company} — ${job.location}</p>
      <p>${job.description}</p>
    `;

    savedResults.appendChild(card);
  });
};

const loadSavedJobs = async () => {
  const authHeaders = await getAuthHeaders();

  const response = await fetch("/api/saved-jobs", {
    headers: authHeaders,
  });

  const jobs = await response.json();

  renderSavedJobs(jobs);

  message.textContent = `Saved jobs: ${jobs.length}`;
};

const saveJob = async (job) => {
  const savedJobData = {
    externalJobId: job.externalId,
    title: job.title,
    company: job.company,
    location: job.location,
    description: job.description,
    url: job.url,
    source: job.source,
  };
  const authHeaders = await getAuthHeaders();
  try {
    const response = await fetch("/api/saved-jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(savedJobData),
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = `Could not save job: ${data.message}`;
      return;
    }

    message.textContent = "Job saved successfully";
  } catch (error) {
    console.error(error);
    message.textContent = "Connection error";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const keywords = keywordsInput.value;
  const location = locationInput.value;

  loadJobs(
    `/api/jobs/search?keywords=${encodeURIComponent(
      keywords,
    )}&location=${encodeURIComponent(location)}`,
  );
});

showAllButton.addEventListener("click", () => {
  loadJobs("/api/jobs");
});

showSavedButton.addEventListener("click", () => {
  loadSavedJobs();
});

loadJobs("/api/jobs");
