import * as React from "react";

class Edge extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center", lineHeight: "1.25rem" }}>
        <p>
          |<br />
          {this.props.load}
          <br />v
        </p>
      </div>
    );
  }
}

export default Edge;
