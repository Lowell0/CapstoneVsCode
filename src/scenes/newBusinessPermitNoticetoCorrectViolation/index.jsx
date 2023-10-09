import React, { useEffect, useState } from "react";
import { Box, IconButton, InputBase, Link, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { UserInformationTeam } from "../../database/UserInformation";

const NewBusinessPermitNoticetoCorrectViolation = () => {

  const [users, setUsers] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "no", headerName: "No.", width: 50 },
    { field: "business_permit_no", headerName: "Business Permit No.", width: 120 },
    { field: "permittee", headerName: "Permittee", width: 100 },
    { field: "business_name", headerName: "Business Name", width: 100 },
    {
      field: "address",
      headerName: "Address",
      width: 200, 
      valueGetter: (params) =>
        `${params.row.house_no}, ${params.row.barangay}, ${params.row.city}`,
    },
    { field: "nature_of_business", headerName: "Nature of Business", width: 110 },
    { field: "type_of_occupancy", headerName: "Type of Occupancy", width: 110 },
    { field: "contact_no", headerName: "Contact No.", width: 100 },
    { field: "administrative_fine", headerName: "Administrative Fine", width: 110 },
    { field: "status", headerName: "Status", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <button className="btn btn-outline-primary mx-2">View</button>
          <button className="btn btn-danger mx-2">Edit</button>
        </div>
      ),
    },
  ];  
  

  useEffect(() => {
    fetch("http://localhost:8080/user/getAllUser")
      .then((res) => res.json())
      .then((result) => {
        const filteredUsers = result.filter(user => user.position === "Building Plan Evaluator");
        setUsers(filteredUsers);
      });
  }, []);
/*
  const handleDelete = (id) => {
    // Handle delete logic here
    console.log(Deleting user with ID: ${id});
  };*/

  return (
    <Box m="15px">
      <Header title="FSIC -> New Business Permit -> Notice to Correct Violation" />
      <Box sx={{ 
        width: '30%', 
        mt: -2,
        }} backgroundColor={colors.black[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, width: '80%' }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box
        m="10px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.red[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blue[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.black[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blue[800],
          },
        }}
      >
        <div style={{ height: 370, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </Box>
    </Box>
  );
};

export default NewBusinessPermitNoticetoCorrectViolation;