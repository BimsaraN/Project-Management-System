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
    const url = "http://localhost:3500/schedule_api";
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

  const validation = (date,time,presentation) => {
    var isError = false;

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

    if (isError) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (newRow, oldRow) => {
    if (
      validation(newRow["date"], newRow["time"],newRow["presentation"])
    ) {
      const url = "http://localhost:3500/schedule_api/" + oldRow["id"];
      const data = JSON.stringify({ date: newRow["date"], time: newRow["time"] , presentation: newRow["presentation"] });
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

  const col_data = [
    { title: "Date", field: "date" },
    { title: "Time", field: "time" },
    {
      title: "Presentation Type",
      field: "presentation",
      lookup: { proposal: "proposal", progress1: "progress1", progress2: "progress2", final: "final" },
    },
    { title: "Examiner 1", field: "examiner1" },
    { title: "Examiner 2", field: "examiner2" },
    { title: "Examiner 3", field: "examiner3" },
    { title: "Group Id", field: "group_id", editable: 'never' }
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
        editable={{
          onRowUpdate: (newRow, oldRow) =>
            new Promise(async (resolve, reject) => {
              SubmitForm(newRow, oldRow);
              console.log(oldRow._id);
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

export default All_Schedule;
