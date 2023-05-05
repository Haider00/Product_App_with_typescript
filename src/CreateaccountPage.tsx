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
export default function CreateaccountPage(props: Props) {

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

    function retrieveAllLocalStorageData() {
      const keys = Object.keys(localStorage);
      const data: Record<string, any> = {};

      for (let key of keys) {
        data[key] = localStorage.getItem(key);
      }
      return data;
    }

    // console.log(retrieveAllLocalStorageData());
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const timestamp = new Date().getTime();
      const data = {
        id: uuidv4(),
        login: formData.login,
        password: formData.password,
        timestamp: timestamp,
      };
      const storedData = JSON.parse(localStorage.getItem("data") || "[]");

      if (storedData.some((e: any) => e.login === formData.login)) {
        alert("Username already exists. Please choose a different username.");
        return;
      } else if (
        formData.login.length === 0 ||
        formData.password.length === 0
      ) {
        alert("Enter your username or password");
      } else {
        storedData.push(data);
        localStorage.setItem("data", JSON.stringify(storedData));
        setCurrentPage("login");
        // setIsLoggedIn(true);
        setUserName(formData.login);

        retrieveAllLocalStorageData();
      }
    };
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <div className="login-form">
            <h1>Create your account</h1>
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    label="Login"
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        SignIn
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => setCurrentPage("login")}
                      >
                        Have account?
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }