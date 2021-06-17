import React, { Component } from "react";
import { firebase } from "../../firebase";
import Form from "../utils/Form";
import { validate } from "../utils/miscellanous";

class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
      },
    },
  };

  submitForm(e) {
    e.preventDefault();

    let dataToSubmit = {};

    let formIsValid = true;

    for (let key in this.state.formData) {
      // console.log(key);
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      console.log(dataToSubmit);
      // to authenticate a user
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          console.log("user is authenticated");
          // push the user to the admin dashboard
          console.log(this.props);
          this.props.history.push("/dashboard");
        })
        .catch((err) => {
          this.setState({
            formError: true,
          });
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  updateForm(element) {
    // console.log(element);
    // make a copy of the state data (formData)
    const newFormData = { ...this.state.formData };
    // target the email property - this time, has updated input value
    const newElement = { ...newFormData[element.id] };

    // console.log(newElement);

    // inside the element parameter, there is event object
    newElement.value = element.event.target.value;

    // to validate our form
    let validData = validate(newElement);
    // console.log(validData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: "100px" }}>
          <form action="" onSubmit={(event) => this.submitForm(event)}>
            <h2>Please Login</h2>
            <Form
              id={"email"}
              formData={this.state.formData.email}
              change={(ele) => this.updateForm(ele)}
            />

            <Form
              id={"password"}
              formData={this.state.formData.password}
              change={(ele) => this.updateForm(ele)}
            />

            <button onClick={(event) => this.submitForm(event)}>Log in</button>
          </form>

          {this.state.formError && (
            <div className="error_label">Something is wrong, try again.</div>
          )}
        </div>
      </div>
    );
  }
}

export default SignIn;
