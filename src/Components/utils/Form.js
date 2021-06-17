import React from "react";

const Form = (props) => {
  const { formData, id } = props;

  const showError = () => {
    let errorMessage = (
      <div className="error_label">
        {formData.validation && !formData.valid
          ? formData.validationMessage
          : null}
      </div>
    );

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      // text type of input on forms
      case "input":
        formTemplate = (
          <div>
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <input
              {...formData.config}
              value={formData.value}
              onChange={(event) => props.change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;

      // select type of input on form
      case "select":
        formTemplate = (
          <div>
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <select
              value={formData.value}
              onChange={(event) => props.change({ event, id })}
            >
              <option value="">Select one</option>
              {formData.config.options.map((item) => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                );
              })}
            </select>
            {showError()}
          </div>
        );
        break;

      default:
        formTemplate = null;
        break;
    }

    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};

export default Form;
