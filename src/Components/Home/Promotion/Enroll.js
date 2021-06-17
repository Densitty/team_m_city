import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Form from "../../utils/Form";
import { validate } from "../../utils/miscellanous";
import { promotionsCollection } from "../../../firebase";

class Enroll extends Component {
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
    },
  };

  updateForm(element) {
    // console.log(element)
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

  resetFormSuccess(type) {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      newFormData[key].value = "";
      newFormData[key].valid = false;
      newFormData[key].validationMessage = "";
    }

    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: type ? "Congratulations" : "Already on the database",
    });

    this.clearSuccessmessage();
  }

  clearSuccessmessage() {
    setTimeout(() => {
      this.setState({
        formSuccess: "",
      });
    }, 2000);
  }

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
      // console.log(dataToSubmit);
      promotionsCollection
        .orderByChild("email")
        .equalTo(dataToSubmit.email)
        .once("value")
        .then((snapshot) => {
          if (snapshot.val() === null) {
            // if entered mail add is not in DB, push the data to it
            promotionsCollection.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            // if entered mail add is already in db
            this.resetFormSuccess(false);
          }
        });
      // reset the form
      // this.resetFormSuccess();
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form action="" onSubmit={(e) => this.submitForm(e)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <Form
                id={"email"}
                formData={this.state.formData.email}
                change={(ele) => this.updateForm(ele)}
              />
              {this.state.formError ? (
                <div className="error_label">
                  Something is wrong, try again.
                </div>
              ) : null}
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={(event) => this.submitForm(event)}>
                Enroll
              </button>
              <div className="enroll_discl">
                Shipping costs and taxes are to be borne by the winner. We are
                only responsible for sending your prize to your location, while
                the shipping agency charges you for the rest.
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
