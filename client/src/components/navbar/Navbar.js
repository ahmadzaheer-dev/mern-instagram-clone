import Logo from "../../Images/logo.png";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
import "../../styles/navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { connect } from "react-redux";
import Loading from "../loading/Loading";
import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const Navbar = ({ user, isLoading, isAuthenticated }) => {
  const classes = useStyles();

  return (
    <nav className="navbar">
      {!isLoading ? (
        <div className="row flex space-between">
          <img className="navbar__logo" src={Logo} alt="logo" />
          <Search />
          {isAuthenticated ? (
            <ul className="menu">
              <li className="menu__item">
                <Link className="add-post__btn" to="/post/create">
                  <AddToPhotosIcon fontSize="inherit" />
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="/">
                  <HomeIcon fontSize="inherit" />
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="/chat">
                  <SendIcon fontSize="inherit" />
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to="/notifications">
                  <FavoriteBorderIcon fontSize="inherit" />
                </Link>
              </li>
              <li className="menu__item">
                <Link className="menu__link" to={`/${user.username}`}>
                  <Avatar className={classes.small}>A</Avatar>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="menu">
              <li className="menu__item--btn">
                <Link className="menu__btn" to="/signup">
                  Signup
                </Link>
              </li>

              <li className="menu__item--btn">
                <Link className="menu__btn" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Navbar);
