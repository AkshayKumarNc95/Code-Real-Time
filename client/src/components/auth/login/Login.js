import React, { useState, useContext } from "react";

import { Form, Header, Button, Dimmer, Loader } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./login.css";

import { requestLogin } from "../../../api/AuthService";

import {authContext} from '../../../utils/global';

export default function Login(props) {
  const history = useHistory();


  const {auth,setAuth}= useContext(authContext);


  const defaultError = {
    UserName: { content: null },
    Password: { content: null },
  };

  const defaultForm = {
    UserName: "",
    Password: "",
  };

  const [error, setError] = useState({ ...defaultError });

  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({ ...defaultForm });

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

  const handleInputChange = (e) =>
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  // Handlers
  function onSubmit() {
    //Validate inputs
    if (!validateInputs()) {
      return;
    }
    
    // Show loader
    setIsLoading(true);
    //Api Call to update the results.
    requestLogin(formValues)
      .then((response) => {
        setIsLoading(false);

        const token_new = response.data.token;
        const userId = response.data.userId;
        //Todo -  Save the token and proceed =>
      
        setAuth({isAuthenticated : true, token: token_new, userName : formValues.UserName, userId});
        // Now: Redirect to the Login Page...
        history.push("/");
      })
      .catch((err) => {
        // check status code.
        // console.log(err.response.status);
        if (err.response && err.response.status == 405) {
          alert("UserName already exists!");
        } else if (err.response && err.response.status >= 500) {
          alert("Server Error!");
        } else {
          alert("No response from the server!");
        }

        setIsLoading(false);
      });

    // Show save failure message.
  }

  return (
    <div id="login-outer">
      <Header as="h2" icon="plug" content="Login to continue!!"></Header>
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      <Form>
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
        <Button.Group>
          <Button onClick={() => history.push("/signup")}>SignUp</Button>
          <Button.Or />
          <Button type="submit" positive onClick={onSubmit}>
            Submit
          </Button>
        </Button.Group>
      </Form>
    </div>
  );
}
