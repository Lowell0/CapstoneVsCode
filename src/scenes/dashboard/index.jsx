import { Box } from "@mui/material";
import React from 'react';
import Header from "../../components/Header";

const Dashboard = () => {

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD"/>
      </Box>
    </Box>
  );
};

export default Dashboard;
