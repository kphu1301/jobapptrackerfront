import React from "react";
import axios from "axios";
import { SERVER_URL } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import JobAppForm from "./JobAppForm";

toast.configure();

class JobAppList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jobApps: [] };
  }

  componentDidMount() {
    this.getJobApps();
  }

  confirmDelete = jobAppId => {
    confirmAlert({
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteJobApp(jobAppId)
        },
        {
          label: "No"
        }
      ]
    });
  };

  getJobApps = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      const path = `/api/users/${this.props.userId}/jobapps`;
      const response = await axios.get(SERVER_URL + path, {
        headers: {
          Authorization: token
        }
      });

      this.setState({ jobApps: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  addJobApp = async jobApp => {
    try {
      const token = sessionStorage.getItem("jwt");
      const path = `/api/users/${this.props.userId}/jobapps`;
      await axios.post(SERVER_URL + path, JSON.stringify(jobApp), {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      toast.success("Job Application Added", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER
      });
      this.getJobApps();
    } catch (error) {
      toast.error(
        "Failed to Add Job Application. ( * ) Fields are Required. If Recruiter Email is entered, make sure to enter valid email address",
        {
          autoClose: 7000,
          position: toast.POSITION.TOP_CENTER
        }
      );
      console.error(error);
    }
  };

  editJobApp = async jobApp => {
    try {
      const token = sessionStorage.getItem("jwt");
      const path = `/api/users/${this.props.userId}/jobapps/${jobApp.id}`;
      await axios.put(SERVER_URL + path, JSON.stringify(jobApp), {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      toast.success("Edit Successful", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      });
      this.getJobApps();
    } catch (error) {
      toast.error(
        "Failed to Edit Job Application. ( * ) Fields are Required. If Recruiter Email is entered, enter valid email address",
        {
          autoClose: 10000,
          position: toast.POSITION.TOP_CENTER
        }
      );
      console.error(error);
    }
  };

  deleteJobApp = async jobAppId => {
    try {
      const token = sessionStorage.getItem("jwt");
      const path = `/api/users/${this.props.userId}/jobapps/${jobAppId}`;
      await axios.delete(SERVER_URL + path, {
        headers: {
          Authorization: token
        }
      });

      toast.success("Job Application Deleted", {
        position: toast.POSITION.TOP_CENTER
      });

      this.getJobApps();
    } catch (error) {
      toast.error("Unable to Delete", {
        position: toast.POSITION.TOP_CENTER
      });
      console.error(error);
    }
  };

  renderList = () => {
    return this.state.jobApps.map(jobApp => {
      return (
        <tr key={jobApp.id}>
          <td className="center aligned" data-label="Company">
            {jobApp.company}
          </td>
          <td className="center aligned" data-label="Position">
            {jobApp.position}
          </td>
          <td className="center aligned" data-label="Job Posting Link">
            {jobApp.jobPostingLink}
          </td>
          <td className="center aligned" data-label="Recruiter Name">
            {jobApp.recruiterName}
          </td>
          <td className="center aligned" data-label="Recruiter Email">
            {jobApp.recruiterEmail}
          </td>
          <td className="center aligned" data-label="Status">
            {jobApp.status}
          </td>
          <td className="center aligned">
            <JobAppForm
              addOrEdit={this.editJobApp}
              classText="ui blue small button"
              buttonText="Edit"
              headerText="Edit Job Application"
              jobApp={jobApp}
              action="edit"
            />
            <button
              className="ui mini red button"
              onClick={() => this.confirmDelete(jobApp.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  renderTable = () => {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th className="center aligned">Company</th>
            <th className="center aligned">Position</th>
            <th className="center aligned">Job Posting Link</th>
            <th className="center aligned">Recruiter Name</th>
            <th className="center aligned">Recruiter Email</th>
            <th className="center aligned">Status</th>
            <th className="center aligned">Action</th>
          </tr>
        </thead>
        <tbody>{this.renderList()}</tbody>
      </table>
    );
  };

  render() {
    const emptyJobApp = {
      id: "",
      company: "",
      position: "",
      jobPostingLink: "",
      recruiterName: "",
      recruiterEmail: "",
      status: ""
    };

    return (
      <div className="ui segments">
        <div className="ui segment">
          <h1 className="ui header center aligned">Job Application List</h1>
        </div>
        <JobAppForm
          addOrEdit={this.addJobApp}
          buttonText="New Job Application"
          headerText="Create New Job Application"
          classText="ui green small button"
          jobApp={emptyJobApp}
          action="add"
        />

        <div className="ui divider" />
        {this.renderTable()}
      </div>
    );
  }
}

export default JobAppList;
