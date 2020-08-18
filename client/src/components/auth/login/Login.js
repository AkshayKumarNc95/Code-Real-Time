import React, { useState } from "react";

import { Form, Header, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./login.css";

export default function Login(props) {
  const [error, setError] = useState({
    FirstName: { content: null },
    LastName: { content: null },
    Email: { content: null },
    UserName: { content: null },
    Password: { content: null },
  });

  const history = useHistory();

  return (
    <div id="login-outer">
      <Header as="h2" icon="plug" content="Login to continue!!"></Header>

      <Form>
        <Form.Input
          error={
            error.UserName.content && {
              content: error.LastName.content,
              pointing: "below",
            }
          }
          fluid
          placeholder="User name"
        />
        <Form.Input
          error={
            error.Password.content && {
              content: error.LastName.content,
              pointing: "below",
            }
          }
          fluid
          placeholder="Password"
        />
        <Button.Group>
          <Button onClick={() => history.push("/signup")}>SignUp</Button>
          <Button.Or />
          <Button type="submit" positive>
            Submit
          </Button>
        </Button.Group>
      </Form>
    </div>
  );
}
