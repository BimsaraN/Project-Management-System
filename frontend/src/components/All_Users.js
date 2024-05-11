import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function All_Users() {
  const [user, setUser] = useState([]);

  useEffect(() => pageRefresh(), []);

  const col_data = [
    { title: "Name", field: "name" , editable: 'never' },
    { title: "Registration Number", field: "regNum" , editable: 'never' },
    { title: "Phone Number", field: "phone", type: "numeric" , editable: 'never' },
    { title: "Email", field: "email", type: "email" , editable: 'never' },
    { title: "Batch", field: "batch" ,
    lookup: { "2020j": "2020 June", "2020r": "2020 Regular", "2021r": "2021 Regular","2021j": "2021 June", "2022r": "2022 Regular","2022j": "2022 June", "2023r": "2023 Regular", "2024r": "2024 Regular","2024j": "2024 June", "2025r": "2025 Regular","2026j": "2026 June", "2026r": "2026 Regular" }, editable: 'never' },
    { title: "Specialization", field: "specialization" , editable: 'never' },
    {
      title: "Privilege",
      field: "privilege",
      lookup: { student: "student", admin: "admin", examiners: "examiners", supervisors: "supervisors", "co-supervisors": "co-supervisors", "project_coordinator": "project coordinator" , "project_member": "project member" },
    },
    {
      title: "Access",
      field: "access",
      lookup: { 0: "Deny", 1: "Allow" },
    },
  ];

  const pageRefresh = () => {
    const url = "http://localhost:3500/user_api";
    axios.get(url).then((response) => setUser(response["data"]));
  };

  const validation = ( privilege, access ) => {
    console.log("bb");
    var Error = false;

    if (privilege === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Privilege Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (access === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Access Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (newRow, oldRow) => {
    if (
      validation(newRow["privilege"],newRow["access"])
    ) {
      const url = "http://localhost:3500/user_api/" + oldRow["id"];
      const data = JSON.stringify({privilege: newRow["privilege"],access: newRow["access"]});
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
    const url = "http://localhost:3500/user_api/";
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

  return (
    <div>
      <br />
      <MaterialTable
        title="Users Table"
        columns={col_data}
        data={user}
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
              removeData(selectedRow._id);
              setTimeout(() => resolve(), 300);
            }),
        }}
      />
      <br />
    </div>
  );
}

export default All_Users;
