import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Particle from "../Particle";
import config from "../../config.json";
import laptopImg from "../../Assets/about.png";
import ContactForm from "./ContactForm";

function Projects() {
  const [data, setData] = useState([]);
  const [next, setNext] = useState({
    quantity: 1,
    step: 10,
  });
  useEffect(() => {
    const Fun = async () => {
      try {
        const res = await axios.get(
          `${config.SERVER_URL}projects?quantity=${next.quantity}&step=${next.step}`
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
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
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