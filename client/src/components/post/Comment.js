import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteComment } from "../../actions/feed";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  xSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Comment = ({ user, comment, deleteComment, id, post }) => {
  const classes = useStyles();
  const onDeleteHandler = () => {
    deleteComment(post, id);
  };
  return (
    <div className="comment">
      <Avatar
        className={`comment__avatar ${classes.xSmall}`}
        alt={user.name}
        src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
        variant="circle"
      />
      <caption className="comment__data">
        <Link to={`/${user.username}`} className="comment__username">
          {user.username}
        </Link>

        <span className="comment__text">&nbsp;{comment}</span>
      </caption>
      <button onClick={onDeleteHandler} className="comment__deletebtn">
        <DeleteIcon style={{ color: "#d11a2a", fontSize: 20 }} />
      </button>
    </div>
  );
};

export default connect(null, { deleteComment })(Comment);
