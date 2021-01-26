import React from "react";

const Post = ({ title, body, author, id, onDelete }) => (
    <div className="postView">
        <h2>{title}</h2>
        <p className="body">{body}</p>
        <p>Posted by: {author}</p>
        <button onClick={() => onDelete(id)}>Delete</button>
    </div>
);

export default Post;
