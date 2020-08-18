import React, { useState } from "react";

import { Form, Button, Header } from "semantic-ui-react";
import "./signup.css";

export default function SignUp(props) {
  const [error, setError] = useState({
    FirstName: { content: null },
    LastName: { content: null },
    Email: { content: null },
    UserName: { content: null },
    Password: { content: null },
  });

  return (
    <div id="sign-up-outer">
      <Header as="h2" icon="plug" content="Please Sign Up"></Header>

      <Form>
        <Form.Input
          error={
            error.FirstName.content && {
              content: error.content,
              pointing: "above",
            }
          }
          fluid
          placeholder="First name"
          id="form-input-first-name"
        />
        <Form.Input
          error={
            error.LastName.content && {
              content: error.LastName.content,
              pointing: "below",
            }
          }
          fluid
          placeholder="Last name"
        />
        <Form.Input
          error={
            error.Email.content && {
              content: error.LastName.content,
              pointing: "below",
            }
          }
          fluid
          placeholder="Email"
        />
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
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
