import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function All_Topic() {
  const [topic, setTopic] = useState([]);

  useEffect(() => pageRefresh(), []);

  const pageRefresh = () => {
    const url = "http://localhost:3500/topic_api";
    axios.get(url).then((response) => setTopic(response["data"]));
  };

  const removeData = (id) => {
    console.log(id)
    const url = "http://localhost:3500/topic_api/";
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
    { title: "Group ID", field: "group_id" , editable: 'never' },
    { title: "Supervisor ID", field: "supervisor" , editable: 'never' },
    { title: "Topic", field: "topic" , editable: 'never' },
    { title: "Supervisor", field: "supervisor_name" , editable: 'never' },
    { title: "Category", field: "category" }
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="Topic Table"
        columns={col_data}
        data={topic}
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

export default All_Topic;
