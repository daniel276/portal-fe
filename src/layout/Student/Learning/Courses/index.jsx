import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Collapse } from "reactstrap";
import { getModulesByStudentId } from "../../../../actions/moduleActions";
import "./styles.scss";

class Courses extends Component {

  constructor(){
    super();

    this.state = {
      security: {},
      studentModules: [],
      activeIndex: null,
      isOpenToggle: false
    }
  }


  handleOpenToggle = id => e => {
    this.setState(prevState => ({
      isOpenToggle: !prevState.isOpenToggle,
      activeIndex: id
    }))
  };

  componentDidMount() {
    const { security: { user } = {} } = this.props;
    this.props.getModulesByStudentId(user.id);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { studentModules } = nextProps;

    this.setState({
      studentModules
    })
  }

  render() {

    const { studentModules = [] } = this.state;

    return (
        <div className="course-box">

          <div className="jumbotron" style={{paddingTop: '2rem', paddingBottom:'2rem'}}>
            <h1 className="display-4">Your enrolled course(s)</h1>
            <p className="lead">See your list of active course(s) below. </p>
          </div>

          {studentModules.length > 0 ? studentModules.map((value,idx) => (
            <div className="course-card" key={idx}>
              <div className="course-header">
                <p>{value.module.code} - {value.module.name} ({value.module.credit})</p>
                <button className="btn btn-outline-primary btn-sm" onClick={this.handleOpenToggle(value.id)}>See Schedule</button>
              </div>
              <Collapse isOpen={this.state.activeIndex === value.id}>
                <div className="panel-content">
                 {value.module.classList && value.module.classList.map((value, idx) => (
                     <div key={idx}>
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
                         <tr>
                           <td>{value.name}</td>
                           <td>{value.location}</td>
                           <td>{value.startTime}</td>
                           <td>{value.endTime}</td>
                         </tr>
                         </tbody>
                       </table>
                     </div>
                 ))}
                </div>
              </Collapse>

            </div>
          )) :
          <div className="alert alert-primary" role="alert">
            You are not enrolled in any active module
          </div>
          }
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentModules: state.module.studentModules,
  security: state.security
});

export default connect(mapStateToProps, { getModulesByStudentId })(Courses);