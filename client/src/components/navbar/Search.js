import { React, useState } from "react";
import { connect } from "react-redux";
import { searchByUsername, setSearchDefault } from "../../actions/search";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const Search = ({ searchByUsername, setSearchDefault, searchedUsers }) => {
  const [searchString, setSearchString] = useState({
    string: "",
  });

  const [timer, setTimer] = useState({
    id: null,
    interval: 3000,
  });

  const onChangeHandler = (e) => {
    setSearchString({ string: e.target.value });
  };

  const clearProfiles = (e) => {
    setSearchString({ string: "" });
    setSearchDefault();
  };

  let doneTypingInterval = 1000;

  const onKeyUpHandler = (e) => {
    clearTimeout(timer.id);
    if (searchString.string) {
      setTimer({
        ...timer,
        id: setTimeout(() => {
          searchByUsername(searchString.string);
          if (searchString.string === "" && searchString.string < 1) {
            setSearchDefault();
          }
        }, doneTypingInterval),
      });
    }
  };
  return (
    <form className="searchbar">
      <input
        className="searchbar__input"
        type="text"
        name="search"
        value={searchString.string}
        onChange={(e) => onChangeHandler(e)}
        onKeyUp={(e) => onKeyUpHandler(e)}
        placeholder="Search"
      />

      {searchedUsers && searchedUsers.length > 0 && (
        <div className="search-result">
          {searchedUsers.map((user) => {
            return (
              <div className="search-result__user">
                <Avatar
                  alt={user.username.toUpperCase()}
                  src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
                  variant="circle"
                />
                <Link
                  className="search-result__username"
                  to={`/${user.username}`}
                >
                  {user.username}
                </Link>
              </div>
            );
          })}
          <button
            onClick={(e) => clearProfiles(e)}
            className="search-result__close"
          >
            x
          </button>
        </div>
      )}
    </form>
  );
};

const mapStateToProps = (state) => ({
  searchedUsers: state.search.users,
});

export default connect(mapStateToProps, { searchByUsername, setSearchDefault })(
  Search
);
