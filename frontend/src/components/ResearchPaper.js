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
    const [title, setTitle] = useState("");
    const [journal, setJournal] = useState("");
    const [issn_number, setIssn_number] = useState("");
    const [h_index, setH_index] = useState("");
    const [link, setLink] = useState("");
    const [paid, setPaid] = useState("");
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState([]);
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

    const setLinkForm = (e) => {
        setLink(e.target.value);
    };

    const setTitleForm = (e) => {
        setTitle(e.target.value);
    };

    const setJournalForm = (e) => {
        setJournal(e.target.value);
    };

    const setIssn_numberForm = (e) => {
        setIssn_number(e.target.value);
    };

    const setH_indexForm = (e) => {
        setH_index(e.target.value);
    };

    const setPaidForm = (e) => {
        var selectedFile = e.target.files[0]
        const data = new FormData()
        data.append('file', selectedFile)
        axios.post("http://localhost:3500/research_paper_api/upload", data, {
        }).then(res => {
            console.log(res.data.filename)
            setPaid(res.data.filename)
        })
    }

    const onClear = () => {
        setTitle("")
        setJournal("")
        setIssn_number("")
        setH_index("")
        setPaid("")
        setGroup("")
        setLink("")
        inputRef.current.focus()
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

        if (title === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Title Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (journal === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Journal Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (issn_number === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="ISSN Number of the Journal Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (h_index === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Link to the H5-index/H-index Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (link === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Link to the scopus Site Required!"
                        scheme={Cinnamon.Crisp.SCHEME_RED}
                        icon={<ErrorOutlineIcon />}
                    />
                ),
            });
            isError = true;
        }

        if (paid === "") {
            ButterToast.raise({
                content: (
                    <Cinnamon.Crisp
                        title="Validation Error!"
                        content="Paid Slip Required!"
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

            const url = "http://localhost:3500/research_paper_api";
            const data = {
                group_id: group,
                title: title,
                journal: journal,
                issn_number: issn_number,
                h_index: h_index,
                link: link,
                paid: paid
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
                                    content="Add Successful!"
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
                            Add Research Paper
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
                                    <TextField
                                        type="text"
                                        label="Title"
                                        value={title}
                                        onChange={setTitleForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        label="Journal"
                                        value={journal}
                                        onChange={setJournalForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        label="ISSN Number of the Journal"
                                        value={issn_number}
                                        onChange={setIssn_numberForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        label="Link to the H5-index/H-index"
                                        value={h_index}
                                        onChange={setH_indexForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        label="Link to the scopus Site"
                                        value={link}
                                        onChange={setLinkForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="file"
                                        accept="image/*"
                                        placeholder="Paid Slip Upload"
                                        name="paid"
                                        label="Paid Slip"
                                        onChange={setPaidForm}
                                        style={{ width: '50%' }}
                                        variant="standard"
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

export default ResearchPaper;
