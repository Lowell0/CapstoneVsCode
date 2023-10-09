import { IconButton, useTheme, Typography, Grid } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Topbar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Grid container style={{ backgroundColor: colors.red[500] }}>
      <Grid item>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
          ) : (
          <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Grid>
      <Grid 
        container spacing={1}
        justifyContent="center"
        sx={{
          mt: -4.5,
          mb: 0.5
        }}>
        <Grid item >
          <img
            alt="bfp-logo"
            width="60px"
            height="60px"
            src={`../../images/dilglogo.png`}
          />
        </Grid>
        <Grid item
        direction="column"
        alignItems="center"
          > 
          <Grid container
          alignItems="center"
          direction="column"
          >
            <Typography style={{ color: "#ffffff", fontSize: 11 }}>Beaureu of Fire Protection</Typography>
            <Typography style={{ color: "#ffffff", fontSize: 11 }}>(Region)</Typography>
            <Typography style={{ color: "#ffffff", fontSize: 11 }}>(District/Provincial Office)</Typography>
            <Typography style={{ color: "#ffffff", fontSize: 11 }}>(Station)</Typography>
          </Grid>
        </Grid>
        <Grid item >
          <img
            alt="bfp-logo"
            width="60px"
            height="60px"
            src={`../../images/bfplogo.png`}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Topbar;