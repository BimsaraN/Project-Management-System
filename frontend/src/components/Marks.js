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

function Marks() {
    const [subject, setSubject] = useState("");
    const [groupLeaderMarks1, setGroupLeaderMarks1] = useState("");
    const [groupLeaderMarks2, setGroupLeaderMarks2] = useState("");
    const [groupLeaderMarks3, setGroupLeaderMarks3] = useState("");
    const [groupMember1Marks1, setGroupMember1Marks1] = useState("");
    const [groupMember1Marks2, setGroupMember1Marks2] = useState("");
    const [groupMember1Marks3, setGroupMember1Marks3] = useState("");
    const [groupMember2Marks1, setGroupMember2Marks1] = useState("");
    const [groupMember2Marks2, setGroupMember2Marks2] = useState("");
    const [groupMember2Marks3, setGroupMember2Marks3] = useState("");
    const [groupMember3Marks1, setGroupMember3Marks1] = useState("");
    const [groupMember3Marks2, setGroupMember3Marks2] = useState("");
    const [groupMember3Marks3, setGroupMember3Marks3] = useState("");
    const [marksType1, setMarksType1] = useState("");
    const [marksType2, setMarksType2] = useState("");
    const [marksType3, setMarksType3] = useState("");
    const [mode, setMode] = useState(false);
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState([]);
    const inputRef = React.useRef();
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
    }, []);

    const setSubjectForm = (e) => {
        setSubject(e.target.value);
        console.log(e.target.value)
        if (e.target.value == "proposal") {
            setMarksType1("Presentation Skills")
            setMarksType2("Functionalities Management Skills")
            setMarksType3("Time Management")
        } else if (e.target.value == "final") {
            setMarksType1("Time Management")
            setMarksType2("CRUD Operations")
            setMarksType3("Communication Skills")
        } else {
            setMarksType1("Presentation Skills")
            setMarksType2("Communication Skills")
            setMarksType3("CRUD Operations")
        }
        if(e.target.value !== ""){
            setMode(true)
        }else{
            setMode(false)
        }
    };

    const setGroupLeaderMarks1Form = (e) => {
        setGroupLeaderMarks1(e.target.value);
    };

    const setGroupLeaderMarks2Form = (e) => {
        setGroupLeaderMarks2(e.target.value);
    };

    const setGroupLeaderMarks3Form = (e) => {
        setGroupLeaderMarks3(e.target.value);
    };

    const setGroupMember1Marks1Form = (e) => {
        setGroupMember1Marks1(e.target.value);
    };

    const setGroupMember1Marks2Form = (e) => {
        setGroupMember1Marks2(e.target.value);
    };

    const setGroupMember1Marks3Form = (e) => {
        setGroupMember1Marks3(e.target.value);
    };

    const setGroupMember2Marks1Form = (e) => {
        setGroupMember2Marks1(e.target.value);
    };

    const setGroupMember2Marks2Form = (e) => {
        setGroupMember2Marks2(e.target.value);
    };

    const setGroupMember2Marks3Form = (e) => {
        setGroupMember2Marks3(e.target.value);
    };


    const setGroupMember3Marks1Form = (e) => {
        setGroupMember3Marks1(e.target.value);
    };

    const setGroupMember3Marks2Form = (e) => {
        setGroupMember3Marks2(e.target.value);
    };

    const setGroupMember3Marks3Form = (e) => {
        setGroupMember3Marks3(e.target.value);
    };

    const onClear = () => {
        setSubject("");
        setGroupLeaderMarks1("");
        setGroupMember1Marks1("");
        setGroupMember2Marks1("");
        setGroupMember3Marks1("");
        setGroupLeaderMarks2("");
        setGroupMember1Marks2("");
        setGroupMember2Marks2("");
        setGroupMember3Marks2("");
        setGroupLeaderMarks3("");
        setGroupMember1Marks3("");
        setGroupMember2Marks3("");
        setGroupMember3Marks3("");
        setGroup("");
        inputRef.current.focus();
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

        if (subject === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Subject Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupLeaderMarks1 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Leader Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupLeaderMarks2 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Leader Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupLeaderMarks3 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Leader Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember1Marks1 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 1 Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember1Marks2 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 1 Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember1Marks3 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 1 Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember2Marks1 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 2 Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember2Marks2 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 2 Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember2Marks3 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 2 Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember3Marks1 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 3 Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember3Marks2 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 3 Marks Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (groupMember3Marks3 === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Group Member 3 Marks Required!"
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

            const url = "http://localhost:3500/marks_api";
            const data = {
                groupId: group,
                subject: subject,
                leaderMarks1: groupLeaderMarks1,
                leaderMarks2: groupLeaderMarks2,
                leaderMarks3: groupLeaderMarks3,
                member1Marks1: groupMember1Marks1,
                member1Marks2: groupMember1Marks2,
                member1Marks3: groupMember1Marks3,
                member2Marks1: groupMember2Marks1,
                member2Marks2: groupMember2Marks2,
                member2Marks3: groupMember2Marks3,
                member3Marks1: groupMember3Marks1,
                member3Marks2: groupMember3Marks2,
                member3Marks3: groupMember3Marks3,
            };

            await axios
                .post(url, data)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.data === "success") {
                        ButterToast.raise({
                            content: (
                                <Cinnamon.Crisp
                                    title="Success!"
                                    content="Marks Add Successful!"
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
                    console.error('Error submitting marks:', error);

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
                            Add Marks
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
                                        <InputLabel id="subject-label">Subject</InputLabel>
                                        <Select
                                            labelId="subject-label"
                                            id="subject"
                                            value={subject}
                                            onChange={setSubjectForm}
                                            label="Subject"
                                        >
                                            <MenuItem value={"proposal"}>Proposal</MenuItem>
                                            <MenuItem value={"progress1"}>Progress 1</MenuItem>
                                            <MenuItem value={"progress2"}>Progress 2</MenuItem>
                                            <MenuItem value={"final"}>Final</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {mode && (
                                    <>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Leader "+marksType1}
                                                variant="standard"
                                                name="groupLeaderMarks1"
                                                value={groupLeaderMarks1}
                                                onChange={setGroupLeaderMarks1Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Leader "+marksType2}
                                                variant="standard"
                                                name="groupLeaderMarks2"
                                                value={groupLeaderMarks2}
                                                onChange={setGroupLeaderMarks2Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Leader "+marksType3}
                                                variant="standard"
                                                name="groupLeaderMarks3"
                                                value={groupLeaderMarks3}
                                                onChange={setGroupLeaderMarks3Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 1 "+marksType1}
                                                variant="standard"
                                                name="groupMember1Marks1"
                                                value={groupMember1Marks1}
                                                onChange={setGroupMember1Marks1Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 1 "+marksType2}
                                                variant="standard"
                                                name="groupMember1Marks2"
                                                value={groupMember1Marks2}
                                                onChange={setGroupMember1Marks2Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 1 "+marksType3}
                                                variant="standard"
                                                name="groupMember1Marks3"
                                                value={groupMember1Marks3}
                                                onChange={setGroupMember1Marks3Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 2 "+marksType1}
                                                variant="standard"
                                                name="groupMember2Marks1"
                                                value={groupMember2Marks1}
                                                onChange={setGroupMember2Marks1Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 2 "+marksType2}
                                                variant="standard"
                                                name="groupMember2Marks2"
                                                value={groupMember2Marks2}
                                                onChange={setGroupMember2Marks2Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 2 "+marksType3}
                                                variant="standard"
                                                name="groupMember2Marks3"
                                                value={groupMember2Marks3}
                                                onChange={setGroupMember2Marks3Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 3 "+marksType1}
                                                variant="standard"
                                                name="groupMember3Marks1"
                                                value={groupMember3Marks1}
                                                onChange={setGroupMember3Marks1Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 3 "+marksType2}
                                                variant="standard"
                                                name="groupMember3Marks2"
                                                value={groupMember3Marks2}
                                                onChange={setGroupMember3Marks2Form}
                                                style={{ width: '50%' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0, max: 100 }
                                                }}
                                                placeholder={"Member 3 "+marksType3}
                                                variant="standard"
                                                name="groupMember3Marks3"
                                                value={groupMember3Marks3}
                                                onChange={setGroupMember3Marks3Form}
                                                style={{ width: '50%' }}
                                            />
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
                                        </Grid></>
                                )}
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <br />
        </div>
    );
}

export default Marks;
