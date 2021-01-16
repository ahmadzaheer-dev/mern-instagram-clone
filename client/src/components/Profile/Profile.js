import { useEffect } from "react";
import ProfileData from "./ProfileData";
import ProfileGallery from "./ProfileGallery";
import { getProfileByUsername } from "../../actions/profile";
import { connect } from "react-redux";
import { loadPosts } from "../../actions/profile";
import Loading from "../loading/Loading";

const Profile = ({
  profile,
  isLoading,
  match,
  getProfileByUsername,
  loadPosts,
}) => {
  useEffect(() => {
    getProfileByUsername(match.params.username);
  }, [match.params.username, getProfileByUsername]);

  useEffect(() => {
    if (!isLoading) {
      loadPosts(profile.user.username);
    }
  }, [isLoading]);

  return (
    <div className="profile row">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ProfileData profile={profile} />
          <div className="divider"></div>
          <ProfileGallery />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.data,
  isLoading: state.profile.isLoading,
  userIsLoading: state.auth.user,
});

export default connect(mapStateToProps, { getProfileByUsername, loadPosts })(
  Profile
);
