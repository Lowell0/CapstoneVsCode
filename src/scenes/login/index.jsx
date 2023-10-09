import { Box, Typography, useTheme, Grid, TextField, FormControlLabel, Checkbox, Link, Button } from "@mui/material";
import { tokens } from "../../theme";
//import Header from "../../components/Header";

const Login = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Box
                backgroundColor={colors.red[500]}
                sx={{
                    width: 1,
                    height: "10vh"
                }}>
            </Box>
            <Grid container>
                <Grid container
                    displat="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={colors.black[400]}
                    sx={{
                        width: "50%",
                        height: "90vh",
                        display: "flex",
                        flexWrap: "wrap"
                    }}
                >
                    <Grid continer spacing={1} >
                        <Grid item display="flex" justifyContent="center"
                         >
                            <img
                                alt="bfp-logo"
                                width="280px"
                                height="280px"
                                display="flex"
                                src={`../../images/bfplogo.png`}
                            />
                        </Grid>
                        <Grid item 
                            display="flex"
                            justifyContent="center"
                            direction="column"
                        >
                            <Grid container 
                                alignItems="center"
                                direction="column"
                                sx={{ mt:4 }}
                            >
                                <Typography 
                                    style={{
                                        color: "white",
                                        textDecoration: "underline",
                                        fontWeight: "bold",
                                        fontSize: 24
                                    }}
                                >
                                    Bureau of Fire Protection
                                </Typography>
                                <Typography 
                                    style={{ 
                                    color: "white",
                                    fontSize: 14
                                    }}>
                                    Republic of the Philippines
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        backgroundImage: "url('images/firefighterbg.png')",
                        backgroundSize: "cover",
                        height: "90vh",
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    >
                    <Grid container justifyContent = "space-between"
                        sx={{ 
                            display: "flex",
                            justifyContent : "space-between",
                            height: "400px",
                            width: "400px", 
                            backgroundColor: "#d9d9d9",
                            borderRadius: "10px",
                            opacity: .9
                        }}> 
                        <Grid container display="flex" justifyContent="space-around" alignItems="center" direction="column" m={1}
                            >
                            <Typography color="#000000" variant="h3" sx={{ fontSize: 18 }}>Welcome back!</Typography>
                            <Typography color="#000000" variant="h1" sx={{ fontSize: 30 }} >Login to your Account</Typography>
                            <TextField label="Account Number" variant="filled"
                            sx={{
                                backgroundColor: "#fff",
                                justifyContent:"center",
                                width:"85%",
                            }}
                            >User Account No. :</TextField>
                            <TextField label="password" type="password" 
                            sx={{
                                
                                backgroundColor: "#fff",
                                justifyContent:"center",
                                width:"85%",
                            }}> Password: </TextField>
                            <Grid container display="flex" direction="row" justifyContent="space-around"  >
                                <FormControlLabel control={<Checkbox defaultChecked />} sx={{ mt:-1 }} label="Remember me" />
                                <Link href="#" color="inherit" >Forgot Password?</Link>
                            </Grid>
                            <Button href="/dashboard" sx={{ width:"85%", height:"50px", backgroundColor:"#353e55", color:"#fff" }} variant="contained" >Login</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    );
};

export default Login;