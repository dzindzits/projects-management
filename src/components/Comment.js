import React from "react";
import User from "./User";

function Comment({ comment }) {
  return (
    <li>
      <span>
        {comment.text} - <User username={comment.user} />
      </span>
      <br></br>
      <span>{comment.date}</span>
    </li>
  );
}

export default React.memo(Comment);
