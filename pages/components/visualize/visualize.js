import * as React from "react";

import Node from "./node";
import Edge from "./edge";

class Visualize extends React.Component {
  render() {
    const { reasoning } = this.props;

    return reasoning.map(({ type, load }) => {
      console.log("THIS IS A TEST");
      switch (type) {
        case "node":
          return <Node load={load} />;
        case "edge":
          return <Edge load={load} />;
      }
    });
  }
}

export default Visualize;
