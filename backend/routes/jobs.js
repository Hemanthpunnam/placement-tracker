const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const router = express.Router();
const dataFile = path.join(__dirname, "../data/jobs.json");

function readJobs() {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeJobs(jobs) {
  fs.writeFileSync(dataFile, JSON.stringify(jobs, null, 2));
}

router.get("/", (req, res) => {
  const jobs = readJobs();
  res.json({ success: true, data: jobs });
});

router.post("/", (req, res) => {
  const { company, role, status, appliedDate, interviewDate, notes } = req.body;

  if (!company || !role || !status || !appliedDate) {
    return res.status(400).json({
      success: false,
      message: "Company, role, status and applied date are required",
    });
  }

  const jobs = readJobs();
  const newJob = {
    id: crypto.randomUUID(),
    company: company.trim(),
    role: role.trim(),
    status,
    appliedDate,
    interviewDate: interviewDate || "",
    notes: notes ? notes.trim() : "",
    createdAt: new Date().toISOString(),
  };

  jobs.unshift(newJob);
  writeJobs(jobs);

  res.status(201).json({ success: true, data: newJob });
});

router.put("/:id", (req, res) => {
  const jobs = readJobs();
  const index = jobs.findIndex((job) => job.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  const updatedJob = {
    ...jobs[index],
    ...req.body,
    id: jobs[index].id,
    createdAt: jobs[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  jobs[index] = updatedJob;
  writeJobs(jobs);

  res.json({ success: true, data: updatedJob });
});

router.delete("/:id", (req, res) => {
  const jobs = readJobs();
  const filteredJobs = jobs.filter((job) => job.id !== req.params.id);

  if (filteredJobs.length === jobs.length) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  writeJobs(filteredJobs);
  res.json({ success: true, message: "Application deleted" });
});

module.exports = router;
