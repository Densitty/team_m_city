import React, {
  Component
} from "react";

import AdminLayout from "../../../HOC/AdminLayout";
import Form from "../../utils/Form";
import {
  validate,
  firebaseLooper
} from "../../utils/miscellanous";
import Fileuploader from "../../utils/Fileuploader";

import {
  playersCollection,
  firebaseDB,
  firebase
} from "../../../firebase";

export default class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          label: "Player Name",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      lastname: {
        /* name, local, is what is set on db */
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          label: "Player Lastname",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      number: {
        /* name, resultLocal, is what is set on db */
        element: "input",
        value: "",
        config: {
          name: "number_input",
          type: "number",
          label: "Player Number",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      position: {
        /* name, local, is what is set on db */
        element: "select",
        value: "",
        config: {
          name: "name_input",
          type: "select_position",
          label: "Select the player position",
          options: [{
              key: "Keeper",
              value: "Keeper"
            },
            {
              key: "Defender",
              value: "Defender"
            },
            {
              key: "Midfielder",
              value: "Midfielder"
            },
            {
              key: "Striker",
              value: "Striker"
            },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  };

  updateForm(element, content = "") {
    // console.log(element);
    const newFormData = {
      ...this.state.formData
    };

    const newElement = {
      ...newFormData[element.id]
    };

    // if content is empty, we are dealing with ordinary element but if not, we are dealing with an image upload
    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

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

  successForm = (message) => {
    this.setState({
      formSuccess: message
    })

    setTimeout(() => {
      this.setState({
        formSuccess: ""
      })
    }, 2000)
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
      if (this.state.formType === "Edit player") {
        // submit the updated/edited player data
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            // this.successForm("Update correctly");
            this.props.history.push("/admin_players");
          })
          .catch((e) => {
            this.setState({
              formError: true
            });
          });
      } else {
        playersCollection
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
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

  resetImage = () => {
    const newFormData = {
      ...this.state.formData
    };
    newFormData["image"].value = "";
    newFormData["image"].valid = false;

    this.setState({
      defaultImg: "",
      formData: newFormData,
    });
  };

  storeFilename = (filename) => {
    this.updateForm({
        id: "image",
      },
      filename
    );
  };

  updateFields = (player, playerId, type, imageAddress) => {
    const newFormData = {
      ...this.state.formData
    };

    console.log(imageAddress)
    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId: playerId,
      defaultImg: imageAddress,
      formType: type,
      formData: newFormData,
    });
  };

  componentDidMount() {
    console.log(this.props);
    const playerID = this.props.match.params.id;

    if (!playerID) {
      // if there is no playerID add player
      this.setState({
        formType: "Add Player",
      });
    } else {
      // edit player
      console.log("Getting the edit to work");
      firebaseDB
        .ref(`players/${playerID}`)
        .once("value")
        .then((snapshot) => {
          const playerData = snapshot.val();
          console.log(playerData);
          // console.log(snapshot);
          // to get the image url
          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then((url) => {
              console.log(url)
              this.updateFields(playerData, playerID, "Edit Player", url);
            })
            .catch((e) => {
              this.updateFields({
                  ...playerData,
                  image: "",
                },
                playerID,
                "Edit player",
                ""
              );
            });
        });
    }
  }

  render() {
    return ( <
        AdminLayout >
        <
        div className = "editplayers_dialog_wrapper" >
        <
        h2 > {
          this.state.formType
        } < /h2>  <
        div >
        <
        form onSubmit = {
          (event) => this.submitForm(event)
        } >
        <
        Fileuploader directory = "players"
        tag = {
          "Player image"
        }
        defaultImg = {
          this.state.defaultImg
        }
        defaultImgName = {
          this.state.formData.image.value
        }
        resetImage = {
          () => this.resetImage()
        }
        filename = {
          (filename) => this.storeFilename(filename)
        }
        />

        <
        Form id = {
          "name"
        }
        formData = {
          this.state.formData.name
        }
        change = {
          (element) => this.updateForm(element)
        }
        />

        <
        Form id = {
          "lastname"
        }
        formData = {
          this.state.formData.lastname
        }
        change = {
          (element) => this.updateForm(element)
        }
        />

        <
        Form id = {
          "number"
        }
        formData = {
          this.state.formData.number
        }
        change = {
          (element) => this.updateForm(element)
        }
        />

        <
        Form id = {
          "position"
        }
        formData = {
          this.state.formData.position
        }
        change = {
          (element) => this.updateForm(element)
        }
        />

        <
        div className = "success_label" > {
          this.state.formSuccess
        } <
        /div>  {
        this.state.formError && ( <
          div className = "error_label" > Something is wrong < /div>
        )
      }

      <
      div className = "admin_submit" >
      <
      button onClick = {
        (event) => this.submitForm(event)
      } > {
        this.state.formType
      } <
      /button>  < /
    div > <
      /form>  < /
    div > <
      /div>  < /
    AdminLayout >
  );
}
}