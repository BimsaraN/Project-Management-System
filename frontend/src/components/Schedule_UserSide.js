import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function All_Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => pageRefresh(), []);

  const pageRefresh = () => {
    const url = "http://localhost:3500/schedule_api/g_id/"+localStorage.getItem("id");
    axios.get(url).then((response) => setSchedule(response["data"]));
  };

  const removeData = (id) => {
    console.log(id)
    const url = "http://localhost:3500/schedule_api/";
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
    { title: "Date", field: "date" },
    { title: "Time", field: "time" },
    { title: "Presentation Type", field: "presentation"},
    { title: "Group Id", field: "group_id" , editable: 'never' }
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="Schedule Table"
        columns={col_data}
        data={schedule}
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

export default All_Schedule;
