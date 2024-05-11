import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Button,Box} from '@material-ui/core'

function All_ResearchPaper() {
  const [researchpaper, setResearchPaper] = useState([]);

  useEffect(() => pageRefresh(), []);

  const pageRefresh = () => {
    const url = "http://localhost:3500/research_paper_api";
    axios.get(url).then((response) => setResearchPaper(response["data"]));
  };

  const removeData = (id) => {
    console.log(id)
    const url = "http://localhost:3500/research_paper_api/";
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
    { title: "Title", field: "title" },
    { title: "Journal", field: "journal" },
    { title: "ISSN Number", field: "issn_number" },
    { title: "H index", field: "h_index" },
    { title: "Link", field: "link" },
    { title: 'Paid Image / Doc', field: 'paid' , width: 50, editable: 'never' ,
      render: rowData =>
      rowData != undefined ?(
        (rowData.paid).split(".").pop().toLowerCase()=="jpg"||(rowData.paid).split(".").pop().toLowerCase()=="png" || (rowData.paid).split(".").pop().toLowerCase()=="jpeg" ?
          (
                      <Button
                        variant="contained"
                        style={{ backgroundcolor: '#2196f3', color: '#ffffff' }}
                        href={"http://localhost:3500/"+rowData.paid}
                        download
                      >
                      <Box
                        component="img"
                        sx={{ 
                          height: 50,
                          width: 50,
                          maxHeight: { xs: 25, md: 50 },
                          maxWidth: { xs: 25, md: 50 },
                        }}
                        alt="Image or Docs"
                        src={"http://localhost:3500/"+rowData.paid}
                      />
                      </Button>
                    ):(<Button
                          variant="contained"
                          style={{ backgroundcolor: '#2196f3', color: '#ffffff' }}
                          href={"http://localhost:3500/"+rowData.paid}
                          download
                        >{
                      (rowData.paid).split(".").pop().toLowerCase()=="pdf" ?
                      (<Box
                        component="img"
                        sx={{ 
                          height: 50,
                          width: 50,
                          maxHeight: { xs: 25, md: 50 },
                          maxWidth: { xs: 25, md: 50 },
                        }}
                        alt="Image or Docs"
                        src={"http://localhost:3500/pdf.png"}
                      />):(<Box
                        component="img"
                        sx={{ 
                          height: 50,
                          width: 50,
                          maxHeight: { xs: 25, md: 50 },
                          maxWidth: { xs: 25, md: 50 },
                        }}
                        alt="Image or Docs"
                        src={"http://localhost:3500/doc.png"}
                      />)}
                      </Button>
          )
      ):("")}
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="Research Paper Table"
        columns={col_data}
        data={researchpaper}
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

export default All_ResearchPaper;
