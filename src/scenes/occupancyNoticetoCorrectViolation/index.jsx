import React, { useEffect, useState } from "react";
import { Box, IconButton, InputBase, Link, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import RefreshIcon from "@mui/icons-material/Refresh";
import { UserInformationTeam } from "../../database/UserInformation";

const OccupancyNoticetoCorrectViolation = () => {

  const [correctViolation, setCorrectViolation] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [editedItem, setEditedItem] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "cv_id", headerName: "No.", width: 50 },
    { field: "application_no", headerName: "Application No.", width: 100 },
    { field: "bldgpermit_no", headerName: "Building Permit No.", width: 120 },
    { field: "applicants_name", headerName: "Applicants Name", width: 110 },
    { field: "project_name", headerName: "Project Name", width: 100 },
    /*{
      field: "address",
      headerName: "Address",
      width: 200,
      valueGetter: (params) =>
        `${params.row.house_no}, ${params.row.barangay}, ${params.row.city}`,
    },*/
    { field: "address", headerName: "Location", width: 70 },
    { field: "type_occupancy", headerName: "Type of Occupancy", width: 110 },
    { field: "contact_no", headerName: "Contact No.", width: 100 },
    { field: "administrative_fine", headerName: "Administrative Fine", width: 120 },
    { field: "status", headerName: "Status", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <button className="btn btn-outline-primary mx-2"  onClick={() => handleView(params.row)}
          >
            View</button>
          <button className="btn btn-danger mx-2"onClick={() => handleEdit(params.row)}
          >
            Edit</button>
        </div>
      ),
    },
  ];  
  useEffect(() => {
   
    fetch("http://localhost:8080/correctviolation/getAllCorrectViolation")
      .then((res) => res.json()) // Parse the response as JSON
      .then((result) => {
        
        setCorrectViolation(result);
        setFilteredData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEdit = (item) => {
    setEditedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    fetch("http://localhost:8080/correctviolation/putCorrectViolation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cv_id: editedItem.cv_id, // Include the cv_id parameter
        status: editedItem.status,
        
        // Include other edited fields here...
      }),
    })
      .then((response) => {
        if (response.ok) {
          const updatedCorrectViolation = correctViolation.map((item) =>
            item.cv_id === editedItem.cv_id ? editedItem : item
          );
          setCorrectViolation(updatedCorrectViolation);
          setIsEditDialogOpen(false);
        } else {
          console.error("Error updating data");
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
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
  const filterData = () => {
    const filtered = correctViolation.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const fetchData = () => {
    fetch("http://localhost:8080/correctviolation/getAllCorrectViolation")
      .then((res) => res.json())
      .then((result) => {
        setCorrectViolation(result);
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
    setFilteredData(correctViolation);
  };


  return (
    <Box m="15px">
      <Header title="FSIC -> Occupancy -> Notice to Correct Violation" />
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
            getRowId={(row) => row.cv_id}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </Box>
      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Notice To Correct Violation</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <div>
                {/* Display the details of the selected item here */}
                <TextField
                label="No."
                fullWidth
                value={selectedItem.cv_id}
                disabled
              />
                <TextField
                label="Application No."
                fullWidth
                value={selectedItem.application_no}
                disabled
              />
              <TextField
                label="Building Permit No."
                fullWidth
                value={selectedItem.bldgpermit_no}
                disabled
              />
              <TextField
                label="Applicants Name"
                fullWidth
                value={selectedItem.applicants_name}
                disabled
              />
              <TextField
                label="Project Name"
                fullWidth
                value={selectedItem.project_name}
                disabled
              />
              <TextField
                label="Location"
                fullWidth
                value={selectedItem.address}
                disabled
              />
              <TextField
                label="Type of Occupancy"
                fullWidth
                value={selectedItem.type_occupancy}
                disabled
              />
              <TextField
                label="Contact No."
                fullWidth
                value={selectedItem.contact_no}
                disabled
              />
              <TextField
                label="Administrative Fine"
                fullWidth
                value={selectedItem.administrative_fine}
                disabled
              />
              <TextField
                label="Status"
                fullWidth
                value={selectedItem.status}
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
      <div>
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogContent>
            {editedItem && (
              <div>
                 <TextField
                  label="No."
                  fullWidth
                  name="cv_id"
                  value={editedItem.cv_id}
                  onChange={handleEditInputChange}
                />
                <TextField
                  label="Application No."
                  fullWidth
                  name="application_no"
                  value={editedItem.application_no}
                  onChange={handleEditInputChange}
                />
                <TextField
                  label="Building Permit No."
                  fullWidth
                  name="bldgpermit_no"
                  value={editedItem.bldgpermit_no}
                  onChange={handleEditInputChange}
                />
                 <TextField
                  label="Applicants Name"
                  fullWidth
                  name="applicants_name"
                  value={editedItem.applicants_name}
                  onChange={handleEditInputChange}
                />
                 <TextField
                  label="Project Name"
                  fullWidth
                  name="project_name"
                  value={editedItem.project_name}
                  onChange={handleEditInputChange}
                />
                 <TextField
                  label="Location"
                  fullWidth
                  name="address"
                  value={editedItem.address}
                  onChange={handleEditInputChange}
                />
                 <TextField
                  label="Type of Occupancy"
                  fullWidth
                  name="type_occupancy"
                  value={editedItem.type_occupancy}
                  onChange={handleEditInputChange}
                />
                 <TextField
                  label="Contact No."
                  fullWidth
                  name="cotanct_no"
                  value={editedItem.contact_no}
                  onChange={handleEditInputChange}
                />
                 <TextField
                  label="Administrative Fine"
                  fullWidth
                  name="administrative_fine"
                  value={editedItem.administrative_fine}
                  onChange={handleEditInputChange}
                />
                 <TextField
                  label="Status"
                  fullWidth
                  name="status"
                  value={editedItem.status}
                  onChange={handleEditInputChange}
                />
               
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default OccupancyNoticetoCorrectViolation;