import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";

// Css
import "./nav.css";
import { useHistory } from "react-router-dom";

export default function NavBar(props) {
  const [state, setState] = useState({ activeItem: "home" });

  const history = useHistory();

  function handleItemClick(e, { name }) {
    setState({ activeItem: name });
    //console.log(history)
    name = name === "home" ? "" : name;
    history.push(`/${name}`);
  }

  const { activeItem } = state;

  return (
    <div id="nav-outer">
      <Menu pointing secondary color="orange">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Stream"
          active={activeItem === "Stream"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="Login"
            active={activeItem === "Login"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
}
