import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import laptopImg from "../../Assets/about.png";
import ContactForm from "./ContactForm";

function Projects() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [data, setData] = useState([]);
  const [next, setNext] = useState({
    quantity: 1,
    step: 10,
  });
  useEffect(() => {
    const Fun = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}projects?quantity=${next.quantity}&step=${next.step}`
        );

        if (res.status === 200) {
          setData([...data, ...res.data]);
          setNext({ ...next, quantity: next.quantity + 1 });
        }
      } catch (err) {
        console.log(err);
      }
    };
    Fun();
  }, [next]);
  console.log(data);

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          Contact <strong className="purple">US </strong>
        </h1>
        <p style={{ color: "white" }}>Let's Start Conversation</p>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <ContactForm />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
