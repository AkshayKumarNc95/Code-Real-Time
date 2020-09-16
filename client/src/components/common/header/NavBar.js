import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";

// Css
import "./nav.css";
import { useHistory } from "react-router-dom";
import { streamDef } from "../../../utils/global";

export default function NavBar(props) {
  const [state, setState] = useState({ activeItem: "home" });

  const history = useHistory();

  function handleItemClick(e, { name }) {
    if (name != "Stream" && streamDef.isStreaming) {
      alert("You cannot navigate to other tabs while streaming!");
      return;
    }

    setState({ activeItem: name });
    //console.log(history)
    history.push(`/${name}`);
  }

  const { activeItem } = state;

  return (
    <div id="nav-outer">
      <Menu pointing secondary color="orange">
        <Menu.Item fitted="vertically">
          <img src="/logo.png" />
        </Menu.Item>

        {props.isAuth && (
          <>
             <Menu.Item
              name="Stream"
              active={activeItem === "Stream"}
              onClick={handleItemClick}
            />
            {" "}
            <Menu.Item
              name="History"
              active={activeItem === "History"}
              onClick={handleItemClick}
            />
         
          </>
        )}
        <Menu.Menu position="right">
          <Menu.Item
            name={props.isAuth ? "Logged In":"Login"}
            disabled = {props.isAuth}
            active={activeItem === "Login"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
}
