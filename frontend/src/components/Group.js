import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import {
    Grid,
    Button,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function Group() {
    const [leader, setLeader] = useState(localStorage.getItem("id"));
    const [member1, setMember1] = useState("");
    const [member2, setMember2] = useState("");
    const [member3, setMember3] = useState("");
    const [users, setUsers] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [co_supervisors, setCo_supervisors] = useState([]);
    const [supervisor, setSupervisor] = useState("");
    const [co_supervisor, setCo_supervisor] = useState("");
    const [area, setArea] = useState([]);
    const [title, setTitle] = useState([]);
    let history = useHistory();

    const setAreaForm = (e) => {
        setArea(e.target.value);
    };

    const setTitleForm = (e) => {
        setTitle(e.target.value);
    };

    useEffect(() => {
        axios.get("http://localhost:3500/user_api/student")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
        axios.get("http://localhost:3500/user_api/supervisors")
            .then(response => {
                setSupervisors(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
        axios.get("http://localhost:3500/user_api/co_supervisors")
            .then(response => {
                setCo_supervisors(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const onClear = () => {
        setLeader("");
        setMember1("");
        setMember2("");
        setMember3("");
        setSupervisor("");
        setCo_supervisor("");
        setTitle("");
        setArea("");
    };

    const validation = () => {
        let Error = false;
        if (!title) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Title is required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            Error = true;
        }

        if (!area) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Area is required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            Error = true;
        }

        if (!leader) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Leader field is required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            Error = true;
        }

        if (!member1) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Member 1 field is required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            Error = true;
        }

        if (!member2) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Member 2 field is required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            Error = true;
        }

        if (!member3) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Member 3 field is required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            Error = true;
        }

        if (!supervisor) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Supervisor is required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            Error = true;
        }

        if (!co_supervisor) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Co supervisor is required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            Error = true;
        }

        if (!(!member1 || !member2 || !member3)) {
            if (member1 === member2 || member1 === member3 || member2 === member3 || leader == member1 || leader == member2 || leader == member3) {
                ButterToast.raise({
                    content: (
                        <Cinnamon.Crisp
                            title="Validation Error!"
                            content="Member are cannot be same user!"
                            scheme={Cinnamon.Crisp.SCHEME_RED}
                            icon={<ErrorOutlineIcon />}
                        />
                    ),
                });
                Error = true;
            }
        }

        if (Error) {
            return false;
        }

        return true;
    };

    const SubmitForm = async (e) => {
        e.preventDefault();

        if (validation()) {
            const url = "http://localhost:3500/group_api";
            const data = JSON.stringify({
                title: title,
                area: area,
                leader: leader,
                member1: member1,
                member2: member2,
                member3: member3,
                supervisor: supervisor,
                co_supervisor: co_supervisor
            });

            await axios.post(url, data, {
                headers: { "Content-Type": "application/json" },
            })
                .then(async (res) => {
                    console.log(res);
                    if (res.data.err !== "connection") {
                        if (res.data.err === "leader") {
                            ButterToast.raise({
                                content: (
                                    <Cinnamon.Crisp
                                        title="Validation Error!"
                                        content="Group Leader Already Exists!"
                                        scheme={Cinnamon.Crisp.SCHEME_RED}
                                        icon={<ErrorOutlineIcon />}
                                    />
                                ),
                            });
                        } else if (res.data.err === "member1") {
                            ButterToast.raise({
                                content: (
                                    <Cinnamon.Crisp
                                        title="Validation Error!"
                                        content="Group member1 Already Exists!"
                                        scheme={Cinnamon.Crisp.SCHEME_RED}
                                        icon={<ErrorOutlineIcon />}
                                    />
                                ),
                            });
                        } else if (res.data.err === "member2") {
                            ButterToast.raise({
                                content: (
                                    <Cinnamon.Crisp
                                        title="Validation Error!"
                                        content="Group member2 Already Exists!"
                                        scheme={Cinnamon.Crisp.SCHEME_RED}
                                        icon={<ErrorOutlineIcon />}
                                    />
                                ),
                            });
                        } else if (res.data.err === "member3") {
                            ButterToast.raise({
                                content: (
                                    <Cinnamon.Crisp
                                        title="Validation Error!"
                                        content="Group member3 Already Exists!"
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
                                        content="Group Register Successful!"
                                        scheme={Cinnamon.Crisp.SCHEME_GREEN}
                                        icon={<CheckCircleOutlineIcon />}
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
                        maxWidth: "50%",
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
                            Group Registration
                        </Typography>
                        <br />
                        <form autoComplete="off" onSubmit={SubmitForm}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        placeholder="Title"
                                        autoFocus
                                        variant="standard"
                                        name="title"
                                        value={title}
                                        onChange={setTitleForm}
                                        style={{ width: '50%' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        placeholder="Area"
                                        autoFocus
                                        variant="standard"
                                        name="area"
                                        value={area}
                                        onChange={setAreaForm}
                                        style={{ width: '50%' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="leader-label">Leader</InputLabel>
                                        <Select
                                            labelId="leader-label"
                                            id="leader"
                                            value={leader}
                                            onChange={(e) => setLeader(e.target.value)}
                                            label="Leader"
                                            disabled="true"
                                        >
                                            {users.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    Name :{user.name} - Reg :{user.regNum}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="member1-label">Member 1</InputLabel>
                                        <Select
                                            labelId="member1-label"
                                            id="member1"
                                            value={member1}
                                            onChange={(e) => setMember1(e.target.value)}
                                            label="Member 1"
                                        >
                                            {users.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    Name :{user.name} - Reg :{user.regNum}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="member2-label">Member 2</InputLabel>
                                        <Select
                                            labelId="member2-label"
                                            id="member2"
                                            value={member2}
                                            onChange={(e) => setMember2(e.target.value)}
                                            label="Member 2"
                                        >
                                            {users.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    Name :{user.name} - Reg :{user.regNum}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="member3-label">Member 3</InputLabel>
                                        <Select
                                            labelId="member3-label"
                                            id="member3"
                                            value={member3}
                                            onChange={(e) => setMember3(e.target.value)}
                                            label="Member 3"
                                        >
                                            {users.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    Name :{user.name} - Reg :{user.regNum}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="supervisor-label">Supervisor</InputLabel>
                                        <Select
                                            labelId="supervisor-label"
                                            id="supervisor"
                                            value={supervisor}
                                            onChange={(e) => setSupervisor(e.target.value)}
                                            label="Supervisor"
                                        >
                                            {supervisors.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    Name :{user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="co_supervisor-label">Co supervisor</InputLabel>
                                        <Select
                                            labelId="co_supervisor-label"
                                            id="co_supervisor"
                                            value={co_supervisor}
                                            onChange={(e) => setCo_supervisor(e.target.value)}
                                            label="Co supervisor"
                                        >
                                            {co_supervisors.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    Name :{user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#ff5722', color: '#FFFFFF', width: '50%' }}
                                        onClick={onClear}
                                    >
                                        Clear
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

export default Group;
