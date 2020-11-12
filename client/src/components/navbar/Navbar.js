import { useState } from "react";
import Logo from "../../Images/logo.png";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
import "../../styles/navbar.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    searchString: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, search: e.target.value });
  };

  const { search } = formData;

  return (
    <nav className="navbar">
      <div className="row flex">
        <img className="navbar__logo" src={Logo} alt="logo" />
        <form className="searchbar">
          <input
            className="searchbar__input"
            type="text"
            name="search"
            value={search}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Search"
          />
        </form>
        <ul className="menu">
          <li className="menu__item">
            <Link className="menu__link" to="">
              <HomeIcon fontSize="inherit" />
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="">
              <SendIcon fontSize="inherit" />
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="">
              <FavoriteBorderIcon fontSize="inherit" />
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="">
              <Avatar className={classes.small}>A</Avatar>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
