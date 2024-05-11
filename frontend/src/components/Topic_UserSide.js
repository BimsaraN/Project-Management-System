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

function ResearchPaper() {
    const [topic, setTopic] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [category, setCategory] = useState("");
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
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
        axios.get("http://localhost:3500/user_api/supervisors")
            .then(response => {
                console.log(response.data)
                setSupervisors(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);


    const onClear = () => {
        setCategory("");
        setSupervisor("")
        setTopic("")
        setGroup("");
        inputRef.current.focus();
    };

    const setTopicForm = (e) => {
        setTopic(e.target.value);
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

        if (topic === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Topic Required!"
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

            const url = "http://localhost:3500/topic_api";
            const data = {
                group_id: group,
                supervisor: supervisor,
                topic: topic,
                category: category,
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
                                    content="Topic Add Successful!"
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
                            Add ResearchPaper
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
                                    <TextField
                                        type="text"
                                        label="Topic"
                                        value={topic}
                                        onChange={setTopicForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="group-label">Supervisor</InputLabel>
                                        <Select
                                            labelId="group-label"
                                            id="supervisor"
                                            value={supervisor}
                                            onChange={(e) => setSupervisor(e.target.value)}
                                            label="Supervisor"
                                        >
                                            {supervisors.map((supervisor) => (
                                                <MenuItem key={supervisor.id} value={supervisor.id}>
                                                    Supervisor ID : {supervisor.id} , Name :{supervisor.fname + " " + supervisor.lname}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl variant="standard" style={{ width: '50%' }}>
                                        <InputLabel id="group-label">Category</InputLabel>
                                        <Select
                                            labelId="group-label"
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            label="Category"
                                        >
                                            <MenuItem key="" value="">
                                                Select Category
                                            </MenuItem>
                                            <MenuItem key="test1" value="test1">
                                                test1
                                            </MenuItem>
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

export default ResearchPaper;
