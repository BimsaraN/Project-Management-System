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

function Presentation() {
    // Define state variables
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState([]);
    const [presentationDoc, setPresentationDoc] = useState(null);
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [noteText, setNoteText] = useState("");
    const inputRef = React.useRef();
    let history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3500/group_api")
            .then(response => {
                console.log(response.data)
                setGroups(response.data);
                axios.get("http://localhost:3500/group_api/my_group_id/" + localStorage.getItem("id"))
                    .then(response => {
                        console.log(response.data[0].id)
                        setGroup(response.data[0].id);
                    })
                    .catch(error => {
                        console.error("Error fetching users:", error);
                    });
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const setPresentationDocForm = (e) => {
        var selectedFile = e.target.files[0]
        const data = new FormData()
        data.append('file', selectedFile)
        axios.post("http://localhost:3500/presentation_api/upload", data, {
        }).then(res => {
            console.log(res.data.filename)
            setPresentationDoc(res.data.filename)
        })
    }

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

        if (!presentationDoc) {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Presentation Document Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (additionalDetails === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Additional Details Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (noteText === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Note Text Required!"
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
            const url = "http://localhost:3500/presentation_api";
            const data = {
                groupId: group,
                presentationDoc: presentationDoc,
                additionalDetails: additionalDetails,
                noteText: noteText,
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
                                    content="Presentation Add Successful!"
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
                    console.error('Error submitting presentation:', error);
                });
        }
    };

    const onClear = () => {

        setGroup("");
        setPresentationDoc("");
        setAdditionalDetails("");
        setNoteText("");
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
                            Add Presentation
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
                                            disabled="true"
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
                                    <TextField type="file"
                                        accept=".pdf,.doc,.docx"
                                        placeholder="Photo"
                                        label="Photo"
                                        variant="standard"
                                        name="photo"
                                        onChange={setPresentationDocForm}
                                        style={{ width: '50%' }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        placeholder="Additional Details"
                                        variant="standard"
                                        value={additionalDetails}
                                        onChange={(e) => setAdditionalDetails(e.target.value)}
                                        style={{ width: '50%' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        placeholder="Note Text"
                                        variant="standard"
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
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

export default Presentation;
