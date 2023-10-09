import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Allusers from "./scenes/allusers";
import BusinessEstablishments from "./scenes/businessEstablishments";
import OccupancyNewApplications from "./scenes/occupancyNewApplications";
import OccupancyApprovedApplications from "./scenes/occupancyApprovedApplications";
import OccupancyNoticeofDisapproval from "./scenes/occupancyNoticeofDisapproval";
import OccupancyNoticetoComply from "./scenes/occupancyNoticetoComply";
import OccupancyNoticetoCorrectViolation from "./scenes/occupancyNoticetoCorrectViolation";
import OccupancyAbatementOrder from "./scenes/occupancyAbatementOrder";
import OccupancyClosureOrder from "./scenes/occupancyClosureOrder";
import NewBusinessPermitApprovedApplications from "./scenes/newBusinessPermitApprovedApplications";
import NewBusinessPermitNoticetoComply from "./scenes/newBusinessPermitNoticetoComply";
import NewBusinessPermitNoticetoCorrectViolation from "./scenes/newBusinessPermitNoticetoCorrectViolation";
import NewBusinessPermitAbatementOrder from "./scenes/newBusinessPermitAbatementOrder";
import NewBusinessPermitClosureOrder from "./scenes/newBusinessPermitClosureOrder";
import RenewalBusinessPermitApprovedApplications from "./scenes/renewalBusinessPermitApprovedApplications";
import RenewalBusinessPermitNoticetoComply from "./scenes/renewalBusinessPermitNoticetoComply";
import RenewalBusinessPermitNoticetoCorrectViolation from "./scenes/renewalBusinessPermitNoticetoCorrectViolation";
import RenewalBusinessPermitAbatementOrder from "./scenes/renewalBusinessPermitAbatementOrder";
import RenewalBusinessPermitClosureOrder from "./scenes/renewalBusinessPermitClosureOrder";
import BuildingPermitNewApplications from "./scenes/buildingpermitNewApplicaions";
import BuildingPermitApplications from "./scenes/buildingpermitApplications";
import CFM from "./scenes/cfm";
import Chief from "./scenes/chief";
import Clerk from "./scenes/clerk";
import Form from "./scenes/form";
import Buildingplanevaluator from "./scenes/bpe";
import Encoder from "./scenes/encoder";
import Login from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && <Sidebar />}
          <main className="content">
            {!isLoginPage && <Topbar />}
            <Routes>
              <Route path="/" element={<Login />} />
              {!isLoginPage && <Route path="/dashboard" element={<Dashboard />} />} 
              {!isLoginPage && <Route path="/allusers" element={<Allusers />} />}
              {!isLoginPage && <Route path="/businessEstablishments" element={<BusinessEstablishments />} />}
              {!isLoginPage && <Route path="/occupancyNewApplications" element={<OccupancyNewApplications />} />}
              {!isLoginPage && <Route path="/occupancyApprovedApplications" element={<OccupancyApprovedApplications />} />}
              {!isLoginPage && <Route path="/occupancyNoticeofDisapproval" element={<OccupancyNoticeofDisapproval />} />}
              {!isLoginPage && <Route path="/occupancyNoticetoComply" element={<OccupancyNoticetoComply />} />}
              {!isLoginPage && <Route path="/occupancyNoticetoCorrectViolation" element={<OccupancyNoticetoCorrectViolation />} />}
              {!isLoginPage && <Route path="/occupancyAbatementOrder" element={<OccupancyAbatementOrder />} />}
              {!isLoginPage && <Route path="/occupancyClosureOrder" element={<OccupancyClosureOrder />} />}
              {!isLoginPage && <Route path="/newBusinessPermitApprovedApplications" element={<NewBusinessPermitApprovedApplications />} />}
              {!isLoginPage && <Route path="/newBusinessPermitNoticetoComply" element={<NewBusinessPermitNoticetoComply />} />}
              {!isLoginPage && <Route path="/newBusinessPermitNoticetoCorrectViolation" element={<NewBusinessPermitNoticetoCorrectViolation />} />}
              {!isLoginPage && <Route path="/newBusinessPermitAbatementOrder" element={<NewBusinessPermitAbatementOrder />} />}
              {!isLoginPage && <Route path="/newBusinessPermitClosureOrder" element={<NewBusinessPermitClosureOrder />} />}
              {!isLoginPage && <Route path="/renewalBusinessPermitApprovedApplications" element={<RenewalBusinessPermitApprovedApplications />} />}
              {!isLoginPage && <Route path="/renewalBusinessPermitNoticetoComply" element={<RenewalBusinessPermitNoticetoComply />} />}
              {!isLoginPage && <Route path="/renewalBusinessPermitNoticetoCorrectViolation" element={<RenewalBusinessPermitNoticetoCorrectViolation />} />}
              {!isLoginPage && <Route path="/renewalBusinessPermitAbatementOrder" element={<RenewalBusinessPermitAbatementOrder />} />}
              {!isLoginPage && <Route path="/renewalBusinessPermitClosureOrder" element={<RenewalBusinessPermitClosureOrder />} />}
              {!isLoginPage && <Route path="/buildingPermitNewApplications" element={<BuildingPermitNewApplications />} />}
              {!isLoginPage && <Route path="/buildingPermitApplications" element={<BuildingPermitApplications />} />}
              {!isLoginPage && <Route path="/cfm" element={<CFM />} />}
              {!isLoginPage && <Route path="/chief" element={<Chief />} />}
              {!isLoginPage && <Route path="/clerk" element={<Clerk />} />}
              {!isLoginPage && <Route path="/bpe" element={<Buildingplanevaluator />} />}
              {!isLoginPage && <Route path="/encoder" element={<Encoder />} />}
              {!isLoginPage && <Route path="/form" element={<Form />} />}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;