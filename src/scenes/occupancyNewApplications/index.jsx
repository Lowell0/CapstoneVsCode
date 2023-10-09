import React, { useEffect, useState } from "react";
//import { Box, IconButton, InputBase, Link, Typography } from "@mui/material";
import { Box, IconButton, InputBase, Link, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import RefreshIcon from "@mui/icons-material/Refresh";
//import { UserInformationTeam } from "../../database/UserInformation";

const OccupancyNewApplications = () => {
  
  const [searchValue, setSearchValue] = useState("");
  const [newApplication, setNewApplication] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "new_id", headerName: "No.", width: 50 },
    { field: "application_no", headerName: "Application No", width: 100 },
    { field: "bldgpermit_no", headerName: "Building Permit No.", width: 120 },
    { field: "date_received", headerName: "Date Received", width: 100 },
    { field: "applicants_name", headerName: "Applicants Name", width: 110 },
    { field: "project_name", headerName: "Project Name", width: 100 },
    { field: "location", headerName: "Location", width: 70 },
    { field: "contact_no", headerName: "Contact No.", width: 80 },
    { field: "fees", headerName: "Fees", width: 60 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "inspection_no", headerName: "Inspection Order No.", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 125,
      renderCell: (params) => (
        <div>
          <button className="btn btn-outline-primary mx-2"onClick={() => handleView(params.row)}
          >
            View</button>
          <button className="btn btn-danger mx-2">Update</button>
        </div>
      ),
    },
  ];

  const filterData = () => {
    const filtered = newApplication.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const fetchData = () => {
    fetch("http://localhost:8080/application/getAllNewApplication")
      .then((res) => res.json())
      .then((result) => {
        setNewApplication(result);
        setFilteredData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/application/getAllNewApplication")
      .then((res) => res.json()) 
      .then((result) => {
        setNewApplication(result);
        setFilteredData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchButtonClick = () => {
    filterData();
  };

  const handleRefreshButtonClick = () => {
    fetchData();
    setSearchValue("");
    setFilteredData(newApplication);
  };

/*
  const handleDelete = (id) => {
    // Handle delete logic here
    console.log(Deleting user with ID: ${id});
  };*/
  const handleView = (item) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
  };

  return (
    <Box m="15px">
      <Header title="FSIC -> Occupancy -> New Applications" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "35%",
          mt: -2,
        }}
        backgroundColor={colors.black[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, width: "80%" }}
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearchButtonClick}>
          <SearchIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }} onClick={handleRefreshButtonClick}>
          <RefreshIcon /> 
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
            rows={filteredData}
            columns={columns}
            getRowId={(row) => row.new_id}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </Box>
       {/* View Dialog */}
       <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Occupancy New Application</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <div>
                {/* Display the details of the selected item here */}
                <TextField
                label="No."
                fullWidth
                value={selectedItem.new_id}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
                <TextField
                sx={{m:1}}
                label="Application No."
                fullWidth
                value={selectedItem.application_no}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                sx={{m:1}}
                label="Building Permit No."
                fullWidth
                value={selectedItem.bldgpermit_no}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                sx={{m:1}}
                label="Date Received"
                fullWidth
                value={selectedItem.date_received}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
               <TextField
                sx={{m:1}}
                label="Applicants Name"
                fullWidth
                value={selectedItem.applicants_name}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                sx={{m:1}}
                label="Project Name"
                fullWidth
                value={selectedItem.project_name}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                sx={{m:1}}
                label="Location"
                fullWidth
                value={selectedItem.location}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                sx={{m:1}}
                label="Contact No."
                fullWidth
                value={selectedItem.contact_no}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                sx={{m:1}}
                label="Fees"
                fullWidth
                value={selectedItem.fees}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
                <TextField
                sx={{m:1}}
                label="Status"
                fullWidth
                value={selectedItem.status}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
               <TextField
                sx={{m:1}}
                label="Inspection Order No."
                fullWidth
                value={selectedItem.inspection_no}
                disabled
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OccupancyNewApplications;