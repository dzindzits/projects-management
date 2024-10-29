import React, { useContext, useState } from "react";
import { CommentContext } from "../contexts/comment.context";
import Comment from "./Comment";

function Comments({ taskId, comments }) {
  const { addComment } = useContext(CommentContext);
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    addComment(taskId, comment);
    setComment("");
  };

  return (
    <section>
      <h4>Comments</h4>
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>Comment</button>
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
}

export default Comments;
