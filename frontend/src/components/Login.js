import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = React.useRef();

  useEffect(async () => {
    if (localStorage.getItem("loginAccess")) {
      
    }
  }, []);

  const setEmailForm = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const onClear = () => {
    setEmail("");
    setPassword("");
    inputRef.current.focus();
  };

  const validation = () => {
    var Error = false;

    if (email === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Email Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (password === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Password Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:3500/user_api/login";
      const data = JSON.stringify({
        email: email,
        password: password,
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res.data);
          if (!(res.data.err === "connection")) {
            if (res.data.err === "user_email") {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Not Found!"
                    content="Email Not Found!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else if (res.data.err === "user_password") {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Incorrect Password!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else if (res.data.err === "access") {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Verification Error!"
                    content="Unverified User!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else if (res.data.err === "success") {
              onClear();
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success!"
                    content="Login Successful!"
                    scheme={Cinnamon.Crisp.SCHEME_GREEN}
                    icon={<CheckCircleOutlineIcon />}
                  />
                ),
              });
              console.log(res.data)
              localStorage.setItem("fname", res.data.results.fname);
              localStorage.setItem("lname", res.data.results.lname);
              localStorage.setItem("email", res.data.results.email);
              localStorage.setItem("id", res.data.results.id);
              localStorage.setItem("privilege", res.data.results.privilege);
              localStorage.setItem("loginAccess", true)
              if(res.data.results.privilege=="admin"){
                history.push("/admin")
              } else if(res.data.results.privilege=="student"){
                history.push("/student")
              } else if(res.data.results.privilege=="examiners"){
                history.push("/examiners")
              } else if(res.data.results.privilege=="supervisors"){
                history.push("/supervisors")
              } else if(res.data.results.privilege=="co-supervisors"){
                history.push("/co_supervisors")
              } else if(res.data.results.privilege=="project_coordinator"){
                history.push("/coordinator")
              } else if(res.data.results.privilege=="project_member"){
                history.push("/project_member")
              }
            } else {
              onClear();
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Error!"
                    content="Something is Wrong!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            }
          } else {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Error!"
                  content="Connection Error!"
                  scheme={Cinnamon.Crisp.SCHEME_RED}
                  icon={<ErrorOutlineIcon />}
                />
              ),
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="App">
      <br />
      <Grid>
        <Card
          style={{
            maxWidth: 30 + "%",
            padding: "20px 5px",
            margin: "0 auto",
            boxShadow: "0 10px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontFamily: "Arial", fontSize: "34px" }}
            >
              Login
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Email"
                    inputRef={inputRef}
                    autoFocus
                    label="Email"
                    variant="standard"
                    name="email"
                    value={email}
                    onChange={setEmailForm}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Password"
                    inputRef={inputRef}
                    label="Password"
                    variant="standard"
                    name="password"
                    value={password}
                    onChange={setPasswordForm}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: '#2196f3', color: '#FFFFFF' }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <br />
    </div>
  );
}

export default Login;
