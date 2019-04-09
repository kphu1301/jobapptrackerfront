import React from "react";
import Skylight from "react-skylight";

class JobAppForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.jobApp.id,
      company: this.props.jobApp.company,
      position: this.props.jobApp.position,
      jobPostingLink: this.props.jobApp.jobPostingLink,
      recruiterName: this.props.jobApp.recruiterName,
      recruiterEmail: this.props.jobApp.recruiterEmail,
      status: this.props.jobApp.status
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newJobApp = {
      id: this.state.id,
      company: this.state.company,
      position: this.state.position,
      jobPostingLink: this.state.jobPostingLink,
      recruiterName: this.state.recruiterName,
      recruiterEmail: this.state.recruiterEmail,
      status: this.state.status
    };

    this.props.addOrEdit(newJobApp);
    if (this.props.action === "add") {
      this.setState({
        id: "",
        company: "",
        position: "",
        jobPostingLink: "",
        recruiterName: "",
        recruiterEmail: "",
        status: ""
      });
    }
    this.refs.addDialog.hide();
  };

  cancelSubmit = event => {
    event.preventDefault();
    this.refs.addDialog.hide();
  };

  render() {
    console.log("rendered form");
    return (
      <div>
        <Skylight hideOnOverlayClicked ref="addDialog">
          <h3 className="ui header center aligned">{this.props.headerText}</h3>
          <form className="ui form">
            <div className="field">
              <label>Company ( * )</label>
              <input
                type="text"
                value={this.state.company}
                name="company"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Position ( * )</label>
              <input
                type="text"
                value={this.state.position}
                name="position"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Job Posting Link</label>
              <input
                type="text"
                name="jobPostingLink"
                value={this.state.jobPostingLink}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Recruiter Name</label>
              <input
                type="text"
                name="recruiterName"
                value={this.state.recruiterName}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Recruiter Email</label>
              <input
                type="text"
                name="recruiterEmail"
                value={this.state.recruiterEmail}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Status ( * )</label>
              <input
                type="text"
                name="status"
                value={this.state.status}
                onChange={this.handleChange}
              />
            </div>
            <button
              className="ui green small button"
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <button className="ui red small button" onClick={this.cancelSubmit}>
              Cancel
            </button>
          </form>
        </Skylight>
        <button
          className={this.props.classText}
          onClick={() => this.refs.addDialog.show()}
        >
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

export default JobAppForm;
