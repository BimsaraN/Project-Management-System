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

function Schedule() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [presentation, setPresentation] = useState("");
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState([]);
    const [examiners, setExaminers] = useState([]);
    const [examiner1, setExaminer1] = useState("");
    const [examiner2, setExaminer2] = useState("");
    const [examiner3, setExaminer3] = useState("");
    let history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3500/group_api")
            .then(response => {
                console.log(response.data)
                setGroups(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });

        axios.get("http://localhost:3500/user_api/examiners")
            .then(response => {
                setExaminers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const setPresentationForm = (e) => {
        setPresentation(e.target.value);
    };

    const setDateForm = (e) => {
        setDate(e.target.value);
    };

    const setTimeForm = (e) => {
        setTime(e.target.value);
    };

    const onClear = () => {
        setPresentation("");
        setDate("")
        setTime("")
        setExaminer1("");
        setExaminer2("");
        setExaminer3("");
        setGroup("");
    };


    const validation = () => {
        var isError = false;

        if (group === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Select Group Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (presentation === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Presentation Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (time === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Select Time, Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (date === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Select Date, Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (examiner1 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Select Examiner 1 Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (examiner2 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Select Examiner 2 Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (examiner3 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Select Examiner 3 Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (isError) {
            return false;
        }

        return true;
    };

    const SubmitForm = async (e) => {
        e.preventDefault();

        if (validation()) {

            const url = "http://localhost:3500/schedule_api";
            const data = {
                group_id: group,
                presentation: presentation,
                time: time,
                examiner1: examiner1,
                examiner2: examiner2,
                examiner3: examiner3,
                date: date,
            };
            console.log(data);
            await axios
                .post(url, data)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.data === "success") {
                        ButterToast.raise({
                            content: (
                                <Cinnamon.Crisp
                                    title="Success!"
                                    content="Schedule Add Successful!"
                                    scheme={Cinnamon.Crisp.SCHEME_GREEN}
                                    icon={<CheckCircleOutlineIcon />}
                                />
                            ),
                        });
                        onClear();
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
                })
                .catch((error) => {
                    console.error('Error submitting:', error);

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
                            Add Schedule
                        </Typography>
                        <br />
                        <form autoComplete="off" onSubmit={SubmitForm}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="group-label">Group</InputLabel>
                                        <Select
                                            labelId="group-label"
                                            id="group"
                                            value={group}
                                            onChange={(e) => setGroup(e.target.value)}
                                            label="Group"
                                        >
                                            {groups.map((group) => (
                                                <MenuItem key={group.id} value={group.id}>
                                                    Group ID {group.id} , leader name {group.leader_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="subject-label">Presentation</InputLabel>
                                        <Select
                                            labelId="subject-label"
                                            id="presentation"
                                            value={presentation}
                                            onChange={setPresentationForm}
                                            label="Presentation"
                                        >
                                            <MenuItem value={"proposal"}>Proposal</MenuItem>
                                            <MenuItem value={"progress1"}>Progress 1</MenuItem>
                                            <MenuItem value={"progress2"}>Progress 2</MenuItem>
                                            <MenuItem value={"final"}>Final</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="date"
                                        label="Date"
                                        value={date}
                                        onChange={setDateForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
                                        format="MM/dd/yyyy"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="time"
                                        label="Time"
                                        value={time}
                                        onChange={setTimeForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="examiner1-label">Examiners</InputLabel>
                                        <Select
                                            labelId="examiner1-label"
                                            id="examiner1"
                                            value={examiner1}
                                            onChange={(e) => setExaminer1(e.target.value)}
                                            label="examiner1"
                                        >
                                            {examiners.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    Name :{user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="examiner2-label">Examiners</InputLabel>
                                        <Select
                                            labelId="examiner2-label"
                                            id="examiner2"
                                            value={examiner2}
                                            onChange={(e) => setExaminer2(e.target.value)}
                                            label="examiner2"
                                        >
                                            {examiners.map(user => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    Name :{user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="examiner3-label">Examiners</InputLabel>
                                        <Select
                                            labelId="examiner3-label"
                                            id="examiner3"
                                            value={examiner3}
                                            onChange={(e) => setExaminer3(e.target.value)}
                                            label="examiner3"
                                        >
                                            {examiners.map(user => (
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
                                        onClick={() => onClear()}
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

export default Schedule;
