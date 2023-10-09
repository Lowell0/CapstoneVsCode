import React, { useEffect, useState } from "react";
import { Box, IconButton, InputBase, Link, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { UserInformationTeam } from "../../database/UserInformation";

const BusinessEstablishments= () => {

  const [users, setUsers] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "No", width: 120 },
    { field: "permit_no", headerName: "Permit Number", width: 120 },
    { field: "permittee", headerName: "Permittee", width: 140 },
    { field: "business_no", headerName: "Business Number", width: 170 },
    { field: "business_address", headerName: "Business Address", width: 170 },
    { field: "authorized_rep", headerName: "Authorized Rep", width: 170 },
    //{ field: "password", headerName: "Password", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <button className="btn btn-outline-primary mx-2">Edit</button>
          <button className="btn btn-danger mx-2">Delete</button>
        </div>
      ),
    },
  ];
  

  useEffect(() => {
    fetch("http://localhost:8080/user/getAllUser")
      .then((res) => res.json())
      .then((result) => {
        const filteredUsers = result.filter(user => user.position === "City Fire Marshal");
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
      <Header title="Business Establishments" />
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

export default BusinessEstablishments;