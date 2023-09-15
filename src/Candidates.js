import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
} from "@mui/material";

const Candidates = ({ candidates, setCandidates }) => {
  const [open, setOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleClickOpen = (candidate) => {
    setSelectedCandidate(candidate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "/api/gateway.php/your-subdomain/v1/applicant_tracking/applications",
        {
          headers: {
            Authorization: `Basic ${btoa(
              "your-api-key:password"
            )}`,
            Accept: "application/json",
          },
        }
      );

      setCandidates(result.data.applications);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Candidate List</h1>
      <List>
        {candidates?.map((candidate, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleClickOpen(candidate)}
          >
            <Avatar src={candidate.applicant.avatar} />
            <ListItemText
              primary={`${candidate.applicant.firstName} ${candidate.applicant.lastName}`}
              secondary={`${candidate.job.title.label}`}
            />
            {candidate.status.label}
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedCandidate?.applicant.firstName}{" "}
          {selectedCandidate?.applicant.lastName}
        </DialogTitle>
        <DialogContent>
          {selectedCandidate?.job.title.label}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Candidates;
