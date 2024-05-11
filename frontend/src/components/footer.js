import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Divider,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";

class Footer extends React.Component {
  render() {
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Box
          style={{
            backgroundColor: "#343A40",
            color: "#fff",
            textAlign: "center",
            padding: "20px",
            width: "100%",
            position: "absolute",
            bottom: "0",
            left: "0",
          }}
        >
          <Divider style={{ marginTop: "20px", backgroundColor: "#fff" }} />
          <Container>
            <Row>
              <Col md={6}>
                <p>&copy; 2024 My Website. All rights reserved.</p>
              </Col>
              <Col md={6}>
                <p className="text-end">Powered by React and Bootstrap</p>
              </Col>
            </Row>
          </Container>
        </Box>
      </div>
    );
  }
}

export default Footer;