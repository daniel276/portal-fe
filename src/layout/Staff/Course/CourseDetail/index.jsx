import React, {Component} from 'react';
import { connect } from "react-redux";
import { getModule, getClasses, addClass, getClass } from "../../../../actions/moduleActions";
import "./styles.scss";

class CourseDetail extends Component {

  constructor(){
    super();

    this.state = {
      classObj: {},
      classes: [],
      module: {},
      id: null,
      selectedId: null,
      newName: "",
      newLocation: "",
      newStartDate: "",
      newStartTime: "",
      newEndTime: "",
      name: "",
      location: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getModule(id);
    this.props.getClasses(id);
  }

  handleChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();

    const startDate = this.state.startDate;
    const start_time = this.state.startTime;
    const formattedStartTime = startDate.concat(" "+ start_time);

    const endDate = this.state.startDate; // to make sure class is held in a day
    const endTime = this.state.endTime;
    const formattedEndTime = endDate.concat(" "+ endTime);

    const data = {
      name: this.state.name,
      location: this.state.location,
      startTime: formattedStartTime,
      endTime: formattedEndTime
    };

    this.props.addClass(data, this.props.match.params.id);

  };

  renderClasses = e => {
    return this.props.classes.length > 0 ? this.props.classes.map(value => (
        <tr key={value.id}>
          <td>{value.name}</td>
          <td>{value.location}</td>
          <td>{value.startTime}</td>
          <td>{value.endTime}</td>
        </tr>
    )) : (<tr className="-align-right"><td>No classes available.</td></tr>)
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { module, classes } = nextProps;
    const {
      name: newName,
      location: newLocation,
      startTime: newStartTime,
      endTime: newEndTime
    } = nextProps.classObj;

    this.setState({
      module,
      classes,
      newName,
      newLocation,
      newStartTime,
      newEndTime
    })
  }

  render() {

    return (
        <div className="container course-detail-page">
          <div className="row">
            <div className="course-title">
              {this.state.module.code} - {this.state.module.name} ({this.state.module.credit})
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="panel">
                <div className="panel-header">
                  Add Class
                </div>
                <div className="content">
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group row mt-2">
                        <label htmlFor="name" className="col-sm-4 col-form-label">Class Name</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" required name="name" onChange={this.handleChangeForm} value={this.state.name} id="name" placeholder="Name"/>
                        </div>
                      </div>

                    <div className="form-group row">
                      <label htmlFor="location" className="col-sm-4 col-form-label">Location</label>
                      <div className="col-sm-6">
                        <input type="text" required className="form-control" name="location" onChange={this.handleChangeForm} value={this.state.location} id="location" placeholder="Class location"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="startTime" className="col-sm-4 col-form-label">Date</label>
                      <div className="col-sm-6">
                        <input type="date" required className="form-control" name="startDate"  onChange={this.handleChangeForm} value={this.state.startDate} id="startDate" placeholder="Start Date"/>
                      </div>

                    </div>

                    <div className="form-group row">
                      <label htmlFor="endTime" className="col-sm-4 col-form-label">Start Time/End Time</label>
                      <div className="col-sm-3">
                        <input type="time" required className="form-control" name="startTime" onChange={this.handleChangeForm} value={this.state.startTime} id="startTime" placeholder="Start Time"/>
                      </div>
                      <div className="col-sm-3">
                        <input type="time" required className="form-control" name="endTime" onChange={this.handleChangeForm} value={this.state.endTime} id="endTime" placeholder="End Time"/>
                      </div>
                    </div>

                    <div className="button d-block text-center">
                      <button type="submit" className="btn btn-success ml-auto mr-auto">Save</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel">
                <div className="panel-header">
                  Classes
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Location</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderClasses()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
    );
  }
}

const mapStateToProps = state => ({
  module: state.module.module,
  classes: state.module.classes,
  classObj: state.module.classObj
});

export default connect(mapStateToProps, { getModule, getClasses, addClass, getClass })(CourseDetail);