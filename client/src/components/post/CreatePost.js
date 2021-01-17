import { React, useState } from "react";
import { connect } from "react-redux";
import "../../styles/createpost.css";
import Avatar from "@material-ui/core/Avatar";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import { Link } from "react-router-dom";
import { createPost } from "../../actions/post";
import { setAlert } from "../../actions/alert";
const CreatePost = ({ createPost, user, alerts, setAlert }) => {
  const [data, setData] = useState({
    image: { selectedImage: null, url: null },
    caption: null,
  });

  const { image, caption } = data;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (caption) {
      createPost(image.selectedImage, caption);
    } else {
      setAlert("Please enter caption to create post", "DANGER");
    }
  };

  const handleOnImageChange = (e) => {
    if (e.target.files[0]) {
      setData({
        ...data,
        image: {
          selectedImage: e.target.files[0],
          url: URL.createObjectURL(e.target.files[0]),
        },
      });
    }
  };

  const handleOnCaptionChange = (e) => {
    setData({
      ...data,
      caption: e.target.value,
    });
  };

  return (
    <div className="create-post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={user.username}
          src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
          variant="circle"
        />

        <Link to="#" className="post__user">
          {user.username}
        </Link>
      </div>

      <form className="create-post__form" onSubmit={(e) => handleFormSubmit(e)}>
        <input
          className="create-post__select"
          id="image-upload"
          type="file"
          onChange={(e) => handleOnImageChange(e)}
        />
        {!image.selectedImage ? (
          <div>
            <label className="create-post__btn" htmlFor="image-upload">
              <span className="create-post__btn--inner">Select Image</span>
            </label>
          </div>
        ) : (
          <div className="create-post__image-cont">
            <img
              className="create-post__image"
              src={image.url}
              alt="Selected Img"
            />
            <label className="create-post__label--image" htmlFor="image-upload">
              <span className="create-post__label--inner">
                <ImageSearchIcon fontSize="inherit" />
              </span>
            </label>
          </div>
        )}

        <textarea
          className="create-post__input"
          type="text"
          value={caption}
          placeholder="Enter caption"
          onChange={(e) => handleOnCaptionChange(e)}
        />
        {alerts !== null &&
          alerts.length > 0 &&
          alerts.map((alert) => (
            <p
              className={`alert_${alert.alertType} create-post__alert`}
              key={alert.id}
            >
              {alert.msg}
            </p>
          ))}
        <input className="create-post__submit" type="submit" value="Create" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  alerts: state.alerts,
});

export default connect(mapStateToProps, { createPost, setAlert })(CreatePost);
