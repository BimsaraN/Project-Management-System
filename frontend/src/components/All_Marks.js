import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function All_Marks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => pageRefresh(), []);

  const pageRefresh = () => {
    const url = "http://localhost:3500/marks_api";
    axios.get(url).then((response) => setMarks(response["data"]));
  };


  const validation = (group,subject,groupLeaderMarks1,groupLeaderMarks2,groupLeaderMarks3,groupMember1Marks1,groupMember1Marks2,groupMember1Marks3,groupMember2Marks1,groupMember2Marks2,groupMember2Marks3,groupMember3Marks1,groupMember3Marks2,groupMember3Marks3) => {
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

  const SubmitForm = async (newRow, oldRow) => {
    if (
      validation(newRow["groupId"], newRow["subject"],newRow["leaderMarks1"],newRow["leaderMarks2"],newRow["leaderMarks3"],newRow["member1Marks1"],newRow["member1Marks2"],newRow["member1Marks3"],newRow["member2Marks1"],newRow["member2Marks2"],newRow["member2Marks3"],newRow["member3Marks1"],newRow["member3Marks2"],newRow["member3Marks3"])
    ) {
      const url = "http://localhost:3500/marks_api/" + oldRow["id"];
      const data = JSON.stringify({
        groupId: oldRow["groupId"],
        subject: oldRow["subject"],
        leaderMarks1: newRow["leaderMarks1"],
        leaderMarks2: newRow["leaderMarks2"],
        leaderMarks3: newRow["leaderMarks3"],
        member1Marks1: newRow["member1Marks1"],
        member1Marks2: newRow["member1Marks2"],
        member1Marks3: newRow["member1Marks3"],
        member2Marks1: newRow["member2Marks1"],
        member2Marks2: newRow["member2Marks2"],
        member2Marks3: newRow["member2Marks3"],
        member3Marks1: newRow["member3Marks1"],
        member3Marks2: newRow["member3Marks2"],
        member3Marks3: newRow["member3Marks3"]
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          pageRefresh();
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Success!"
                content="Update Successful!"
                scheme={Cinnamon.Crisp.SCHEME_GREEN}
                icon={<CheckCircleOutlineIcon />}
              />
            ),
          });
        });
    }
  };

  const removeData = (id) => {
    console.log(id)
    const url = "http://localhost:3500/marks_api/";
    axios.delete(url + id).then((res) => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Success!"
            content="Delete Successful!"
            scheme={Cinnamon.Crisp.SCHEME_GREEN}
            icon={<CheckCircleOutlineIcon />}
          />
        ),
      });
      pageRefresh();
    });
  };

  const col_data = [
    { title: "Group ID", field: "groupId", editable: 'never' },
    { title: "Subject", field: "subject", editable: 'never' },
    { title: "Leader Marks", field: "leaderMarks1" },
    { title: "Leader Marks", field: "leaderMarks2" },
    { title: "Leader Marks", field: "leaderMarks3" },
    { title: "Member 1 Marks", field: "member1Marks1" },
    { title: "Member 1 Marks", field: "member1Marks2" },
    { title: "Member 1 Marks", field: "member1Marks3" },
    { title: "Member 2 Marks", field: "member2Marks1" },
    { title: "Member 2 Marks", field: "member2Marks2" },
    { title: "Member 2 Marks", field: "member2Marks3" },
    { title: "Member 3 Marks", field: "member3Marks1" },
    { title: "Member 3 Marks", field: "member3Marks2" },
    { title: "Member 3 Marks", field: "member3Marks3" },
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="Marks Table"
        columns={col_data}
        data={marks}
        style={{
          maxWidth: "80%",
          padding: "20px 5px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
        options={{
          filtering: true,
          sorting: true,
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newRow, oldRow) =>
            new Promise(async (resolve, reject) => {
              SubmitForm(newRow, oldRow);
              console.log(oldRow.id);
              setTimeout(() => resolve(), 300);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              console.log(selectedRow);
              removeData(selectedRow.id);
              setTimeout(() => resolve(), 300);
            }),
        }}
      />
      <br />
    </div>
  );
}

export default All_Marks;
