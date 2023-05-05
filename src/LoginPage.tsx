import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Grid } from "@material-ui/core";
import { TextField, Typography, Button } from "@mui/material";

interface Props {
    appState: {
      currentPage: string;
      UserName: string;
      isLoggedIn: boolean;
      setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
      setUserName: React.Dispatch<React.SetStateAction<string>>;
      setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    };
  }
export default function LoginPage(props: Props) {

    const { appState } = props;
    const { currentPage, UserName, isLoggedIn, setCurrentPage, setUserName, setIsLoggedIn } = appState;


    const [formData, setFormData] = useState({
      login: "",
      password: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const timestamp = new Date().getTime();
      const data = {
        login: formData.login,
        password: formData.password,
        timestamp: timestamp,
      };
      const storedData = JSON.parse(localStorage.getItem("data") || "[]");

      if (
        storedData.some(
          (e: any) =>
            e.login === formData.login && e.password === formData.password
        )
      ) {
        setCurrentPage("home");
        setIsLoggedIn(true);
        setUserName(formData.login);
        return;
      } else if (
        formData.login.length === 0 ||
        formData.password.length === 0
      ) {
        alert("Enter your username or password");
      } else {
        alert("Wrong username and password");
      }
    };

    return (
      <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography sx={{mt:5, mb:5}} variant="h4">Welcome To Products App</Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                label="Email"
                name="login"
                value={formData.login}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setCurrentPage("createaccount")}
                  >
                    Create account
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
    );
  }