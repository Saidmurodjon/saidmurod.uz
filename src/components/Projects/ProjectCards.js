import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiLinkExternal } from "react-icons/bi";

function ProjectCards({ item }) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={item.images[0]} alt="card-img" />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {item.description}.
          {item.video ? (
            <a href={item.video} target="_blank">
              {" "}
              get video
            </a>
          ) : (
            ""
          )}
        </Card.Text>
        {item.gitPath ? (
          <Button variant="primary m-2" href={item.gitPath} target="_blank">
            <BiLinkExternal /> &nbsp; "View Code"
          </Button>
        ) : (
          false
        )}
        {item.path ? (
          <Button variant="primary m-2" href={item.path} target="_blank">
            <BiLinkExternal /> &nbsp; "View Project"
          </Button>
        ) : (
          false
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
