import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
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
          // "http://localhost:5000/projects?quantity=2&step=1"
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
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {data?.length > 0 ? (
            data?.map((e) => (
              <>
                <Col md={4} className="project-card">
                  <ProjectCard item={e} />
                </Col>
              </>
            ))
          ) : (
            <>
              <Col md={4} className="project-card">
                <Spinner animation="border" variant="warning" />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
