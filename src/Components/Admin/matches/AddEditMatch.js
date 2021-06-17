import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";
import Form from "../../utils/Form";
import { validate } from "../../utils/miscellanous";

// to use dbs of matches and teams, we need to import the firebaseDB
import {
  matchesCollection,
  teamsCollection,
  firebaseDB,
} from "../../../firebase";
import { firebaseLooper } from "../../utils/miscellanous";

class AddEditMatch extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formData: {
      date: {
        element: "input",
        value: "",
        config: {
          name: "date_input",
          type: "date",
          label: "Event Date",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      local: {
        /* name, local, is what is set on db */ element: "select",
        value: "",
        config: {
          name: "select_local",
          type: "select",
          label: "Select a local team",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: false,
      },
      resultLocal: {
        /* name, resultLocal, is what is set on db */
        element: "input",
        value: "",
        config: {
          name: "result_local_input",
          type: "text",
          label: "Result Local",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: false,
      },
      away: {
        /* name, local, is what is set on db */
        element: "select",
        value: "",
        config: {
          name: "select_local",
          type: "select",
          label: "Select a local team",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: false,
      },
      resultAway: {
        /* name, resultLocal, is what is set on db */
        element: "input",
        value: "",
        config: {
          name: "result_local_input",
          type: "text",
          label: "Result Local",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: false,
      },
      referee: {
        element: "input",
        value: "",
        config: {
          name: "referee_input",
          type: "text",
          label: "Refree",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          name: "stadium_input",
          type: "text",
          label: "Stadium",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      result: {
        /* name, local, is what is set on db */ element: "select",
        value: "",
        config: {
          name: "select_result",
          type: "select",
          label: "Team Result",
          options: [
            { key: "w", value: "W" },
            { key: "L", value: "L" },
            { key: "D", value: "D" },
            { key: "N/A", value: "N/A" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      final: {
        /* name, local, is what is set on db */ element: "select",
        value: "",
        config: {
          name: "select_played",
          type: "select",
          label: "Game Played ?",
          options: [
            { key: "Yes", value: "Yes" },
            { key: "No", value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
    },
  };

  successForm(message) {
    this.setState({
      formSuccess: message,
    });

    // reset message on form submit to null
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

    /* get the away and local teams thumbnails from db first before submission and loop through to get the thumbnail ppties for dataToSubmit */
    this.state.teams.forEach((team) => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }

      if (team.shortName === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });

    if (formIsValid) {
      // console.log(dataToSubmit)
      // if we have a valid form, edit an existing match or add a new match based on formType on state
      if (this.state.formType === "Edit Match") {
        // push the edit to db
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Update Successful");
          })
          .catch((err) => {
            this.setState({ formError: true });
          });
      } else {
        // add a new match
        matchesCollection
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_matches");
          })
          .catch((e) => {
            this.setState({
              formError: true,
            });
          });
      }
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  //
  updateForm(element) {
    // console.log(element);
    const newFormData = { ...this.state.formData };

    const newElement = { ...newFormData[element.id] };

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

  updateFields(match, teamOptions, teams, type, matchId) {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      // console.log("key is " + key);
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }

      /* for the fields which are <options> only, since not all newFormData properties are used as select options (some are text inputs) */
      if (key === "local" || key === "away") {
        newFormData[key].config.options = teamOptions;
      }

      this.setState({
        matchId,
        formType: type,
        formData: newFormData,
        teams,
      });
    }
  }

  // get match data from db
  componentDidMount() {
    // with react-router, we can get the id from the params on props
    const matchId = this.props.match.params.id;
    // console.log(this.props);

    const getTeams = (match, type) => {
      teamsCollection.once("value").then((snapshot) => {
        const teams = firebaseLooper(snapshot);
        // console.log(teams);

        /* created teamOptions because we are only looping through a <options></options> of <select> form field and what we get from db/firebaseLooper() is an object with properties we do not need */
        const teamOptions = [];

        snapshot.forEach((childSnapshot) => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName,
          });
        });
        // console.log(teamOptions);

        this.updateFields(match, teamOptions, teams, type, matchId);
      });
    };

    if (!matchId) {
      // add match if no matchId
      getTeams(false, "Add Match");
    } else {
      // fetch match details from the id
      firebaseDB
        .ref(`matches/${matchId}`)
        .once("value")
        .then((snapshot) => {
          const match = snapshot.val();
          console.log(match);
          getTeams(match, "Edit Match");
        });
    }
  }

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={(evt) => this.submitForm(evt)}>
              <Form
                id={"date"}
                formData={this.state.formData.date}
                change={(element) => this.updateForm(element)}
              />

              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <Form
                      id={"local"}
                      formData={this.state.formData.local}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="">
                    <Form
                      id={"resultLocal"}
                      formData={this.state.formData.resultLocal}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>

                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <Form
                      id={"away"}
                      formData={this.state.formData.away}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="">
                    <Form
                      id={"resultAway"}
                      formData={this.state.formData.resultAway}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
                {/*  */}
              </div>
              {/*  */}
              <div className="split_fields">
                <Form
                  id={"referee"}
                  formData={this.state.formData.referee}
                  change={(element) => this.updateForm(element)}
                />

                <Form
                  id={"stadium"}
                  formData={this.state.formData.stadium}
                  change={(element) => this.updateForm(element)}
                />
              </div>
              {/*  */}
              <div className="split_fields last">
                <Form
                  id={"result"}
                  formData={this.state.formData.result}
                  change={(element) => this.updateForm(element)}
                />

                <Form
                  id={"final"}
                  formData={this.state.formData.final}
                  change={(element) => this.updateForm(element)}
                />
              </div>
              {/*  */}
              <div className="success_label">{this.state.formSuccess}</div>
              {/* should there be an error */}
              {this.state.formError && (
                <div className="error_label">Something is wrong</div>
              )}

              <div className="admin_submit">
                <button onClick={(event) => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
              {/*  */}
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatch;
