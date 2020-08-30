import React, { useState } from "react";

import { Form, Button, Header, Loader, Dimmer } from "semantic-ui-react";
import "./signup.css";
import { requestSignup } from "../../../api/AuthService";

import { useHistory } from "react-router-dom";

export default function SignUp(props) {
  const defaultError = {
    FirstName: { content: null },
    LastName: { content: null },
    Email: { content: null },
    UserName: { content: null },
    Password: { content: null },
  };

  const defaultForm = {
    FirstName: "",
    LastName: "",
    Email: "",
    UserName: "",
    Password: "",
  };

  // State =>
  const [error, setError] = useState({ ...defaultError });

  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({ ...defaultForm });

  const history = useHistory();

  // Utility Functions
  function validateInputs() {
    const errorLocal = { ...defaultError };
    let isErr = false;
    // Is  empty?
    for (const prop in formValues) {
      if (formValues[prop].trim() === "") {
        (function (val) {
          let propNew = (" " + val).slice(1);
          errorLocal[val].content = propNew + " should not be empty.";
        })(prop);
        isErr = true;
      }
    }

    if (isErr) {
      setError({ ...errorLocal });
      return false;
    } else {
      setError({ ...defaultError });
      return true;
    }
  }

  // Handlers
  function onSubmit() {
    //Validate inputs
    if (!validateInputs()) {
      return;
    }
    // Show loader
    setIsLoading(true);

    //Api Call to update the results.
    requestSignup(formValues)
      .then((response) => {
        console.log(response);

        setIsLoading(false);

        // Now: Redirect to the Login Page...
        history.push("/login");
      })
      .catch((err) => {
        // check status code.
        // console.log(err.response.status);
        if (err.reponse && err.response.status == 405) {
          alert("UserName already exists!");
        } else if (err.reponse && err.response.status >= 500) {
          alert("Server Error!");
        } else {
          alert("No resonse from the server!");
        }

        setIsLoading(false);
      });

    // Show save failure message.
  }

  const handleInputChange = (e) =>
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  return (
    <div id="sign-up-outer">
      <Header as="h2" icon="plug" content="Please Sign Up"></Header>
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      <Form>
        <Form.Input
          error={
            error.FirstName.content && {
              content: error.FirstName.content,
              pointing: "below",
            }
          }
          fluid
          placeholder="First name"
          id="form-input-first-name"
          name="FirstName"
          value={formValues.FirstName}
          onChange={handleInputChange}
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
          name="LastName"
          value={formValues.LastName}
          onChange={handleInputChange}
        />
        <Form.Input
          error={
            error.Email.content && {
              content: error.Email.content,
              pointing: "below",
            }
          }
          fluid
          placeholder="Email"
          name="Email"
          value={formValues.Email}
          onChange={handleInputChange}
        />
        <Form.Input
          error={
            error.UserName.content && {
              content: error.UserName.content,
              pointing: "below",
            }
          }
          fluid
          placeholder="User name"
          name="UserName"
          value={formValues.UserName}
          onChange={handleInputChange}
        />
        <Form.Input
          error={
            error.Password.content && {
              content: error.Password.content,
              pointing: "below",
            }
          }
          fluid
          placeholder="Password"
          name="Password"
          value={formValues.Password}
          onChange={handleInputChange}
        />
        <Button type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
