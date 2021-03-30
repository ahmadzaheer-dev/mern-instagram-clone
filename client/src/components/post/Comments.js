import { useState } from "react";
import Comment from "./Comment";
import { addComment } from "../../actions/feed";
import { connect } from "react-redux";
import { profileAddComment } from "../../actions/profile";

const Comments = ({
  comments,
  addComment,
  id,
  classes,
  children,
  isProfilePost = false,
  profileAddComment,
}) => {
  const [comment, setComment] = useState({ caption: "" });

  const { caption } = comment;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isProfilePost) {
      profileAddComment(id, caption);
    } else {
      addComment(id, caption);
    }
    setComment({ ...comment, caption: "" });
  };

  const handleOnChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  return (
    <div className={`comments ${classes}`}>
      <div className="comments-cont">
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <Comment
                user={comment.user}
                comment={comment.caption}
                key={comment._id}
                id={comment._id}
                post={id}
              />
            );
          })}
      </div>
      {children}
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

export default connect(null, { addComment, profileAddComment })(Comments);
