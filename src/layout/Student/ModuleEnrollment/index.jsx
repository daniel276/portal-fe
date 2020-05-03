import React, {Component} from 'react';
import { connect } from "react-redux";
import { getModules, addStudentModule, getModulesByStudentId } from "../../../actions/moduleActions";
import "./styles.scss";

class ModuleEnrollment extends Component {

  constructor(){
    super();

    this.state = {
      user: {},
      modules: [],
      studentModules: []
    }
  }

  componentDidMount() {
    this.props.getModules();
    this.props.getModulesByStudentId(this.props.user.id); //TODO CHANGE TO STATE
  }

  enrollStudentModule = module_id => e => {
    const { id: student_id } = this.state.user;
    const data = {
      grade: 0
    };

    this.props.addStudentModule(data, student_id, module_id);
  };



  componentWillReceiveProps(nextProps, nextContext) {
    const { modules, user, studentModules } = nextProps;

    this.setState({
      modules,
      user,
      studentModules
    })
  }

  render() {

    const { studentModules, modules } = this.state;

    let filteredModule = modules.filter(item => !studentModules.some(other => item.id === other.module.id));

    return (
        <div className="module-enrollment">
          <div className="jumbotron" style={{paddingTop: '2rem', paddingBottom:'2rem'}}>
            <h1 className="display-4">Module Enrollment</h1>
            <p className="lead">You can enroll for module(s) here if eligible </p>
          </div>

          <div className="enrollment-panel" style={{marginTop: '16px'}}>
            {filteredModule.length > 0 ? filteredModule.map((value) => (
              <div className="module-card" key={value.id}>
                <p>{value.code} - {value.name} ({value.credit})</p>
                <p><button className="btn btn-primary btn-sm" onClick={this.enrollStudentModule(value.id)}>Enroll</button></p>
              </div>
            )) :
                <p className="text-center">No Module available</p>
            }
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.security.user,
  modules: state.module.modules,
  studentModules: state.module.studentModules
});

export default connect(mapStateToProps,
    { getModules,
      addStudentModule,
      getModulesByStudentId
    })
(ModuleEnrollment);