import React from "react";

function Priority({ priority }) {
  switch (priority) {
    case "Low":
      return <span>!</span>;
    case "Medium":
      return <span>!!</span>;
    case "High":
      return <span>!!!</span>;
    default:
      return <span>-</span>;
  }
}

export default React.memo(Priority);
