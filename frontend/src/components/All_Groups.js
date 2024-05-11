import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function All_Groups() {
  const [group, setGroup] = useState([]);

  useEffect(() => pageRefresh(), []);

  const pageRefresh = () => {
    const url = "http://localhost:3500/group_api";
    axios.get(url).then((response) => setGroup(response["data"]));
  };

  const removeData = (id) => {
    console.log(id)
    const url = "http://localhost:3500/group_api/";
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
    { title: "Title", field: "title" , editable: 'never' },
    { title: "Area", field: "area" , editable: 'never' },
    { title: "Leader Name", field: "leader_name" , editable: 'never' },
    { title: "Member 1 Name", field: "member1_name" , editable: 'never' },
    { title: "Member 2 Name", field: "member2_name" , editable: 'never' },
    { title: "Member 3 Name", field: "member3_name" , editable: 'never' },
    { title: "Supervisor", field: "supervisor" , editable: 'never' },
    { title: "Co supervisor", field: "co_supervisor" , editable: 'never' }
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="Groups Table"
        columns={col_data}
        data={group}
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

export default All_Groups;
