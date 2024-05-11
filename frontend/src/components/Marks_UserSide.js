import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function All_Marks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => pageRefresh(), []);

  const pageRefresh = () => {
    const url = "http://localhost:3500/marks_api/g_id/"+localStorage.getItem("id");
    axios.get(url).then((response) => setMarks(response["data"]));
  };

  const col_data = [
    { title: "Group ID", field: "groupId" , editable: 'never' },
    { title: "Subject", field: "subject" , editable: 'never' },
    { title: "Leader Marks", field: "leaderMarks1" , editable: 'never' },
    { title: "Leader Marks", field: "leaderMarks2" , editable: 'never' },
    { title: "Leader Marks", field: "leaderMarks3" , editable: 'never' },
    { title: "Member 1 Marks", field: "member1Marks1" , editable: 'never' },
    { title: "Member 1 Marks", field: "member1Marks2" , editable: 'never' },
    { title: "Member 1 Marks", field: "member1Marks3" , editable: 'never' },
    { title: "Member 2 Marks", field: "member2Marks1" , editable: 'never' },
    { title: "Member 2 Marks", field: "member2Marks2" , editable: 'never' },
    { title: "Member 2 Marks", field: "member2Marks3" , editable: 'never' },
    { title: "Member 3 Marks", field: "member3Marks1" , editable: 'never' },
    { title: "Member 3 Marks", field: "member3Marks2" , editable: 'never' },
    { title: "Member 3 Marks", field: "member3Marks3" , editable: 'never' },
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
      />
      <br />
    </div>
  );
}

export default All_Marks;
