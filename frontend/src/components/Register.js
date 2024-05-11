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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [regnum, setRegNum] = useState("");
  const [batch, setBatch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const inputRef = React.useRef();
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("loginAccess")) {
      
    }
  }, []);

  const setNameForm = (e) => {
    setName(e.target.value);
  };

  const setPhoneForm = (e) => {
    setPhone(e.target.value);
  };

  const setEmailForm = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const setCpasswordForm = (e) => {
    setCpassword(e.target.value);
  };

  const setRegNumForm = (e) => {
    setRegNum(e.target.value);
  };

  const setBatchForm = (e) => {
    setBatch(e.target.value);
  };

  const setSpecializationForm = (e) => {
    setSpecialization(e.target.value);
  };

  const onClear = () => {
    setBatch("");
    setPhone("");
    setEmail("");
    setPassword("");
    setCpassword("");
    setSpecialization("");
    setName("");
    setRegNum("");
    inputRef.current.focus();
  };

  const validation = () => {
    var Error = false;

    if (name === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Name Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (batch === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Batch Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (specialization === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Specialization Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (phone === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Phone Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

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

    if (cpassword === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Confirm Password Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    } else if (password !== cpassword) {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Password & Confirm Password Not Equal!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (regnum === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="REGNUM Required!"
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
      const url = "http://localhost:3500/user_api";
      const data = JSON.stringify({
        name: name,
        batch: batch,
        specialization: specialization,
        phone: phone,
        email: email,
        regNum: regnum,
        password: password,
        privilege: "student",
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res);
          if (res.data.err !== "connection") {
            if (res.data.err === "email") {
              setEmail("");
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Email Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else if (res.data.data === "success") {
              onClear();
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success!"
                    content="Register Successful!"
                    scheme={Cinnamon.Crisp.SCHEME_GREEN}
                    icon={<CheckCircleOutlineIcon />}
                  />
                ),
              });
            } else if (res.data.err === "regnum") {
              setRegNum("");
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="REGNUM Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Already Exists!"
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
                  title="Validation Error!"
                  content="Connection Error!"
                  scheme={Cinnamon.Crisp.SCHEME_RED}
                  icon={<ErrorOutlineIcon />}
                />
              ),
            });
          }
        });
    }
  };

  return (
    <div className="App">
      <br />
      <Grid>
        <Card
          style={{
            maxWidth: 40 + "%",
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
              Register
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Name"
                    inputRef={inputRef}
                    autoFocus
                    variant="standard"
                    name="name"
                    value={name}
                    onChange={setNameForm}
                    style={{ width: '50%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Registration Number"
                    variant="standard"
                    name="regnum"
                    value={regnum}
                    onChange={setRegNumForm}
                    style={{ width: '50%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Phone Number"
                    variant="standard"
                    name="phone"
                    value={phone}
                    onChange={setPhoneForm}
                    style={{ width: '50%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Email"
                    variant="standard"
                    name="email"
                    value={email}
                    onChange={setEmailForm}
                    style={{ width: '50%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Password"
                    variant="standard"
                    name="password"
                    value={password}
                    onChange={setPasswordForm}
                    style={{ width: '50%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Confirm Password"
                    variant="standard"
                    name="cpassword"
                    value={cpassword}
                    onChange={setCpasswordForm}
                    style={{ width: '50%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="standard" style={{ width: '50%' }}>
                    <InputLabel id="batch-label">Batch</InputLabel>
                    <Select
                      labelId="batch-label"
                      id="batch"
                      value={batch}
                      onChange={setBatchForm}
                      label="batch"
                    >
                      <MenuItem value={"2020j"}>2020 June</MenuItem>
                      <MenuItem value={"2020r"}>2020 Regular</MenuItem>
                      <MenuItem value={"2021j"}>2021 June</MenuItem>
                      <MenuItem value={"2021r"}>2021 Regular</MenuItem>
                      <MenuItem value={"2022j"}>2022 June</MenuItem>
                      <MenuItem value={"2022r"}>2022 Regular</MenuItem>
                      <MenuItem value={"2023j"}>2023 June</MenuItem>
                      <MenuItem value={"2023r"}>2023 Regular</MenuItem>
                      <MenuItem value={"2024j"}>2024 June</MenuItem>
                      <MenuItem value={"2024r"}>2024 Regular</MenuItem>
                      <MenuItem value={"2025j"}>2025 June</MenuItem>
                      <MenuItem value={"2025r"}>2025 Regular</MenuItem>
                      <MenuItem value={"2026j"}>2026 June</MenuItem>
                      <MenuItem value={"2026r"}>2026 Regular</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="standard" style={{ width: '50%' }}>
                    <InputLabel id="specialization-label">Specialization</InputLabel>
                    <Select
                      labelId="specialization-label"
                      id="specialization"
                      value={specialization}
                      onChange={setSpecializationForm}
                      label="specialization"
                    >
                      <MenuItem value={"IT"}>IT</MenuItem>
                      <MenuItem value={"SE"}>SE</MenuItem>
                      <MenuItem value={"CSN"}>CSN</MenuItem>
                      <MenuItem value={"DS"}>DS</MenuItem>
                      <MenuItem value={"Cyber"}>Cyber</MenuItem>
                    </Select>
                  </FormControl>
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

export default Register;
