import React, { useState } from "react";
import AddCandidate from "./AddCandidate";
import Candidates from "./Candidates";
import Container from "@mui/material/Container";

const CandidateContainer = () => {
  const [candidates, setCandidates] = useState([]);

  return (
    <Container>
      <Candidates candidates={candidates} setCandidates={setCandidates} />
      <AddCandidate candidates={candidates} setCandidates={setCandidates} />
    </Container>
  );
};

export default CandidateContainer;
