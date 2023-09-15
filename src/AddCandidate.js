import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AddCandidate = ({ setCandidates }) => {
    const [open, setOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState({});
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        jobId: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateSelectedJob = (job) => {
        setSelectedJob(job);
    }   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
            "/api/gateway.php/your-subdomain/v1/applicant_tracking/application",
            formData,
            {
                headers: {
                Authorization: `Basic ${btoa(
                    "your-api-key:password"
                )}`,
                "Content-Type": "application/json",
                },
            }
            );

            if (result.status === 200) {
                setCandidates((prevCandidates) => [
                  ...prevCandidates,
                  {
                    appliedDate: new Date(),
                    status: {
                      id: 1,
                      label: "New",
                    },
                    rating: null,
                    applicant: {
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      avatar: "",
                      email: "",
                    },
                    job: {
                      id: selectedJob.id,
                      title: {
                        id: null,
                        label: selectedJob.title.label,
                      },
                    },
                  },
                ]);
            }
        } catch (error) {
            alert("Failed to add a new candidate.");
        }
        handleClose();
    };

    useEffect(() => {
        const fetchJobs = async () => {
        try {
            const result = await axios.get(
            "/api/gateway.php/your-subdomain/v1/applicant_tracking/jobs",
            {
                headers: {
                Authorization: `Basic ${btoa(
                    "your-api-key:password"
                )}`,
                Accept: "application/json",
                },
            }
            );
            setJobs(result.data);
        } catch (error) {
            console.error("An error occurred while fetching the jobs: ", error);
        }
        };
        fetchJobs();
    }, []);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Candidate
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Candidate</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginTop: "10px"}}
            autoFocus
            name="firstName"
            label="First Name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            style={{ marginTop: "10px", marginBottom: "10px" }}
            name="lastName"
            label="Last Name"
            fullWidth
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="job-label">Job</InputLabel>
            <Select
              labelId="job-label"
              name="jobId"
              value={formData.jobId}
              onChange={handleChange}
            >
              {jobs.map((job, index) => (
                <MenuItem
                  key={index}
                  value={job.id}
                  onClick={() => updateSelectedJob(job)}
                >
                  {job.title.label} - {job.location.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCandidate;
