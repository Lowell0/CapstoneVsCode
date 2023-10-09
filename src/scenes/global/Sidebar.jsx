import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TopicIcon from '@mui/icons-material/Topic';

const Item = ({ title, to, icon, selected, setSelected }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.white[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SubMenu = ({ title, items, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuItem
        onClick={toggleSubMenu}
        style={{
          color: "#fff",
        }}
      >
        {title}
      </MenuItem>
      {isOpen &&
        items.map((item) => (
          <div key={item.title} style={{ marginLeft: "25px" }}>
          <Item
            title={item.title}
            to={item.to}
            icon={item.icon}
            selected={selected}
            setSelected={setSelected}
          />
          </div>
        ))}
    </>
  );
};

const Sidebar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.black[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.white[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <Typography variant="h5" color={colors.white[100]}>
                  Clerk Administrator
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="20px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="125px"
                  height="125px"
                  src={`../../images/pfp.png`}
                  style={{ cursor: "pointer", borderRadius: "20%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.white[100]}
                  fontWeight="bold"
                  sx={{ m: "5px 0 0 0" }}
                >
                  Hachi Drake
                </Typography>
                <Typography variant="h6" color={colors.red[500]}>
                  Mabolo Fire Sub Station
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item collapsed={isCollapsed}
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Typography 
              variant="h6"
              color={colors.white[300]}
              sx={{ m: "0px 0px 0px 0px" }}
            >
              Documents
            </Typography>
            <Item collapsed={isCollapsed}
              title="Business Establishments"
              to="/businessEstablishments"
              icon={<MapsHomeWorkIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item collapsed={isCollapsed}
              title="BPLO"
              to="/allusers"
              icon={<Inventory2Icon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography 
              variant="h6"
              color={colors.white[300]}
              sx={{ m: "0px 0px 0px 15px" }}
            >
              FSIC
            </Typography>
            <SubMenu
              title="Occupancy"
              items={[
                {
                  title: "New Applications",
                  to: "/occupancyNewApplications",
                },
                {
                  title: "Approved Applications",
                  to: "/occupancyApprovedApplications",
                },
                {
                  title: "Notice of Disapproval",
                  to: "/occupancyNoticeofDisapproval",
                },
                {
                  title: "Notice to Comply",
                  to: "/occupancyNoticetoComply",
                  
                },
                {
                  title: "Notice to Correct Violation",
                  to: "/occupancyNoticetoCorrectViolation",
                },
                {
                  title: "Abatement Order",
                  to: "/occupancyAbatementOrder",
                },
                {
                  title: "Closure Order",
                  to: "/occupancyClosureOrder",
                },
              ]}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              title="New Business Permit"
              items={[
                {
                  title: "Approved Applications",
                  to: "/newBusinessPermitApprovedApplications",
                },
                {
                  title: "Notice to Comply",
                  to: "/newBusinessPermitNoticetoComply",
                },
                {
                  title: "Notice to Correct Violation",
                  to: "/newBusinessPermitNoticetoCorrectViolation",
                },
                {
                  title: "Abatement Order",
                  to: "/newBusinessPermitAbatementOrder",
                },
                {
                  title: "Closure Order",
                  to: "/newBusinessPermitClosureOrder",
                },
              ]}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              title="Renewal Business Permit"
              items={[
                {
                  title: "Approved Applications",
                  to: "/renewalBusinessPermitApprovedApplications",
                },
                {
                  title: "Notice to Comply",
                  to: "/renewalBusinessPermitNoticetoComply",
                },
                {
                  title: "Notice to Correct Violation",
                  to: "/renewalBusinessPermitNoticetoCorrectViolation",
                },
                {
                  title: "Abatement Order",
                  to: "/renewalBusinessPermitAbatementOrder",
                },
                {
                  title: "Closure Order",
                  to: "/renewalBusinessPermitClosureOrder",
                },
              ]}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography 
              variant="h6"
              color={colors.white[300]}
              sx={{ m: "0px 0px 0px 15px" }}
            >
              FSEC
            </Typography>
            <SubMenu
              title="Building Permit"
              items={[
                {
                  title: "New Applications",
                  to: "/buildingPermitNewApplications",
                },
                {
                  title: "Applications",
                  to: "/buildingPermitApplications",
                },
              ]}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.white[300]}
              sx={{ m: "0px 0px 0px 0px" }}
            >
              Users
            </Typography>
            <Item collapsed={isCollapsed}
              title="All Users"
              to="/allusers"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create New User"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.white[300]}
              sx={{ m: "0px 0px 0px 0px" }}
            >
              Administrators
            </Typography>
            <Item collapsed={isCollapsed}
              title="City Fire Marshal"
              to="/cfm"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Chief, FSES"
              to="/chief"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Clerk"
              to="/clerk"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.white[300]}
              sx={{ m: "0px 0px 0px 15px" }}
            >
              Standard Users
            </Typography>
            <Item
              title="Building Plan Evaluator"
              to="/bpe"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Encoder"
              to="/encoder"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;