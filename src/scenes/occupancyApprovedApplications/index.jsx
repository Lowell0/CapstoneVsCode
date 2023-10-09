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

const OccupancyApprovedApplications = () => {

  const [approvedApplication, setApprovedApplication] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "approved_id", headerName: "No.", width: 50 },
    { field: "application_no", headerName: "Application No.", width: 100 },
    { field: "bldgpermit_no", headerName: "Building Permit No.", width: 120  },
    { field: "date_received", headerName: "Date Received", width: 100 },
    { field: "applicants_name", headerName: "Applicant's Name", width: 110 },
    { field: "project_name", headerName: "Project Name", width: 100 },
    { field: "location", headerName: "Location", width: 80 },
    { field: "contact_no", headerName: "Contact No.", width: 90 },
    { field: "fees", headerName: "Fees", width: 60 },
    { field: "inspection_no", headerName: "Inspection Order No.", width: 125 },
    { field: "date_fsic", headerName: "Date of FSIC", width: 100 },
    { field: "status", headerName: "Status", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <button className="btn btn-outline-primary mx-2" onClick={() => handleView(params.row)}
          >
            View</button>
          <button className="btn btn-danger mx-2">Edit</button>
        </div>
      ),
    },
  ];

const filterData = () => {
  const filtered = approvedApplication.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );
  setFilteredData(filtered);
};

const fetchData = () => {
  fetch("http://localhost:8080/approved/getAllApprovedApplication")
    .then((res) => res.json())
    .then((result) => {
      setApprovedApplication(result);
      setFilteredData(result);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

useEffect(() => {
   
  fetch("http://localhost:8080/approved/getAllApprovedApplication")
    .then((res) => res.json()) 
    .then((result) => {
      setFilteredData(result);
      setApprovedApplication(result);
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
  setFilteredData(approvedApplication);
};

const handleView = (item) => {
  setSelectedItem(item);
  setIsViewDialogOpen(true);
};

const handleCloseViewDialog = () => {
  setIsViewDialogOpen(false);
};

/*
  useEffect(() => {
    fetch("http://localhost:8080/approved/getAllApprovedApplication")
      .then((res) => res.json())
      .then((result) => {
        const filteredUsers = result.filter(user => user.position === "Building Plan Evaluator");
        setUsers(filteredUsers);
      });
  }, []);*/
/*
  const handleDelete = (id) => {
    // Handle delete logic here
    console.log(Deleting user with ID: ${id});
  };*/

  return (
    <Box m="15px">
      <Header title="FSIC -> Occupancy -> Approved Applications" />
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
            getRowId={(row) => row.approved_id}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </Box>
      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Approved Application</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <div>
                {/* Display the details of the selected item here */}
                <TextField
                label="No."
                fullWidth
                value={selectedItem.approved_id}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
                <TextField
                label="Application No."
                fullWidth
                value={selectedItem.application_no}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                label="Building Permit No."
                fullWidth
                value={selectedItem.bldgpermit_no}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                label="Date Received"
                fullWidth
                value={selectedItem.date_received}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
               <TextField
                label="Applicants Name"
                fullWidth
                value={selectedItem.applicants_name}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                label="Project Name"
                fullWidth
                value={selectedItem.project_name}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                label="Location"
                fullWidth
                value={selectedItem.location}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                label="Contact No."
                fullWidth
                value={selectedItem.contact_no}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                label="Fees"
                fullWidth
                value={selectedItem.fees}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
               <TextField
                label="Inspection Order No."
                fullWidth
                value={selectedItem.inspection_no}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
               <TextField
                label="Date of FSIC"
                fullWidth
                value={selectedItem.date_fsic}
                disabled
                sx={{m:1}}
                inputProps={{
                  style: {
                    height: "1px",
                  },
                }}
              />
              <TextField
                label="Status"
                fullWidth
                value={selectedItem.status}
                disabled
                sx={{m:1}}
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

export default OccupancyApprovedApplications;