import React, { useEffect, useState } from "react";
//import { Box, IconButton, InputBase, Link, Typography } from "@mui/material";
import { Box, IconButton, InputBase, Link, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import RefreshIcon from "@mui/icons-material/Refresh";
import { UserInformationTeam } from "../../database/UserInformation";

const BuildingPermitApplications = () => {

  const [bpApplications, setBpApplications] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "bpa_id", headerName: "No.", width: 50 },
    { field: "control_no", headerName: "Control No.", width: 130 },
    { field: "bldgpermit_no", headerName: "Building Permit No", width: 130 },
    { field: "date_received", headerName: "Date Received", width: 130 },
    { field: "applicants_name", headerName: "Applicants Name", width: 140 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "nc_r", headerName: "NC/R", width: 130 },
    { field: "total_payment", headerName: "Total Payment", width: 130 },
    { field: "or_no.", headerName: "OR No.", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "remarks", headerName: "Remarks", width: 130 },
    { field: "fsec_no", headerName: "FSEC No.", width: 130 },
    { field: "nod_no", headerName: "NOD No.", width: 130 },
    { field: "evaluator", headerName: "Evaluator", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <button className="btn btn-outline-primary mx-2"onClick={() => handleView(params.row)}
          >
            View</button>
          <button className="btn btn-danger mx-2">Edit</button>
        </div>
      ),
    },
  ];
  
  useEffect(() => {
   
    fetch("http://localhost:8080/bpapplications/getAllBPApplications")
      .then((res) => res.json()) // Parse the response as JSON
      .then((result) => {
        
        setBpApplications(result);
        setFilteredData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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

  const filterData = () => {
    const filtered = bpApplications.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const fetchData = () => {
    fetch("http://localhost:8080/bpapplications/getAllBPApplications")
      .then((res) => res.json())
      .then((result) => {
        setBpApplications(result);
        setFilteredData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchButtonClick = () => {
    filterData();
  };

  const handleRefreshButtonClick = () => {
    fetchData();
    setSearchValue("");
    setFilteredData(bpApplications);
  };

  return (
    <Box m="15px">
      <Header title="FSEC -> Building Permit -> Applications" />
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
            getRowId={(row) => row.bpa_id}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </Box>
       {/* View Dialog */}
       <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Building Permit New Application</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <div>
                {/* Display the details of the selected item here */}
                <TextField
                sx={{m:1}}
                label="No."
                fullWidth
                value={selectedItem.bp_id}
                disabled
              />
                <TextField
                sx={{m:1}}
                label="Control No."
                fullWidth
                value={selectedItem.control_no}
                disabled
              />
              <TextField
                sx={{m:1}}
                label="Building Permit No."
                fullWidth
                value={selectedItem.bldgpermit_no}
                disabled
              />
               <TextField
                sx={{m:1}}
                label="Date Received"
                fullWidth
                value={selectedItem.date_received}
                disabled
              />
              <TextField
                sx={{m:1}}
                label="Applicants Name"
                fullWidth
                value={selectedItem.applicants_name}
                disabled
              />
              <TextField
                sx={{m:1}}
                label="Address"
                fullWidth
                value={selectedItem.address}
                disabled
              />
              <TextField
                sx={{m:1}}
                label="NC/R"
                fullWidth
                value={selectedItem.nc_r}
                disabled
              />
               <TextField
                sx={{m:1}}
                label="Total Payment/R"
                fullWidth
                value={selectedItem.total_payment}
                disabled
              />
               <TextField
                sx={{m:1}}
                label="OR No."
                fullWidth
                value={selectedItem.or_no}
                disabled
              />
               <TextField
                sx={{m:1}}
                label="Status"
                fullWidth
                value={selectedItem.status}
                disabled
              />
               <TextField
                sx={{m:1}}
                label="Remarks"
                fullWidth
                value={selectedItem.remarks}
                disabled
              />
               <TextField
                sx={{m:1}}
                label="FSEC No."
                fullWidth
                value={selectedItem.fsec_no}
                disabled
              />
               <TextField
                sx={{m:1}}
                label="Nod No."
                fullWidth
                value={selectedItem.nod_no}
                disabled
              />
              <TextField
                sx={{m:1}}
                label="Evaluator"
                fullWidth
                value={selectedItem.evaluator}
                disabled
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

export default BuildingPermitApplications;