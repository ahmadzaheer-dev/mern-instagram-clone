import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  xSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Comment = ({ user, comment }) => {
  const classes = useStyles();
  console.log(user);
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
    </div>
  );
};

export default Comment;
