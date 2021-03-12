import * as React from "react";
import { Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

class Node extends React.Component {
  render() {
    return (
      <Card style={{ margin: "0.5rem" }}>
        <Card.Body style={{ textAlign: "center" }}>{this.props.load}</Card.Body>
      </Card>
    );
  }
}

export default Node;
