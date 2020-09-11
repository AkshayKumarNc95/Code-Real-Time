import React from "react";
import { Header, Button, Popup, Grid, Label } from "semantic-ui-react";

import './popup.css';

const PopupFlowing = (props) => {
  const users = props.users;
  console.log(users);
  return (
    <Popup
      trigger={
        <Label as="a" basic color="red" pointing="left">
          {users.count ? users.count : 0}
        </Label>
      }
      flowing
      hoverable
    >
      <Grid centered divided columns={users.length}>
        {users.map((user) => (
          <Grid.Column textAlign="center">
            <Header as="h3">{user.userName}</Header>
            
            <h5 id = "user-id-par">
            <b> UserId -</b>
              <br /> {user.userId}
            </h5>
          </Grid.Column>
        ))}
      </Grid>
    </Popup>
  );
};

export default PopupFlowing;
