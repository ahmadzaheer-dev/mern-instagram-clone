import { useState } from "react";
import Comment from "./Comment";
import { addComment } from "../../actions/feed";
import { connect } from "react-redux";

const Comments = ({ comments, addComment, id }) => {
  const [comment, setComment] = useState({ caption: "" });

  const { caption } = comment;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addComment(id, caption);
    setComment({ ...comment, caption: "" });
  };

  const handleOnChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  return (
    <div className="comments">
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <Comment
              user={comment.user}
              comment={comment.caption}
              key={comment.id}
              id={comment.id}
              post={id}
            />
          );
        })}
      <form className="comments__add" onSubmit={(e) => handleFormSubmit(e)}>
        <input
          className="comments__input"
          type="text"
          name="caption"
          value={caption}
          placeholder="Add a comment..."
          onChange={(e) => handleOnChange(e)}
        />
        <input className="comments__submit" type="submit" value="Post" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(Comments);
