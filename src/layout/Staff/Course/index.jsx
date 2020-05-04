import React, {Component} from 'react';
import { connect } from "react-redux";
import { addModule, getModules, getModule } from "../../../actions/moduleActions";
import "./styles.scss";

class CoursePage extends Component {

  constructor(){
    super();

    this.state = {
      selectedId: null,
      module: {},
      modules: [],
      code: "",
      name: "",
      credit: "",
      startDate: "",
      endDate: "",
      isOpenDetailModal: false
    }
  }

  handleChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleOpenDetailModal = id => e => {
    this.setState(prevState => ({
      isOpenDetailModal: !prevState.isOpenDetailModal,
      selectedId: id
    }));

    if(id){
      this.props.getModule(id)
    }

  };

  onSubmit = e => {
    e.preventDefault();

    const module = {
      code: this.state.code,
      name: this.state.name,
      credit: this.state.credit,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    this.props.addModule(module, this.props.history);
  };

  renderAllModules = () => {
    const { modules } = this.props.module;

    return modules.map(value => (
        <tr key={value.id}>
          <td>{value.code}</td>
          <td>{value.name}</td>
          <td>{value.credit}</td>
          <td>{value.startDate}</td>
          <td>{value.endDate}</td>
          <td><button className="btn btn-info" onClick={this.courseDetail(value.id)}>Detail</button></td>
        </tr>
    ))
  };

  courseDetail = id => e=> {
    this.props.history.push(`/staff/course/${id}`)
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { module } = nextProps;

    this.setState({
      module
    })
  }

  componentDidMount() {
    this.props.getModules();
  }

  render() {

    return (
        <div className="container course-page">
          <div className="row panel">
            <div className="panel table">
              <div className="panel-header">
                Course(s) List
              </div>
              <div className="panel-content">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Course code</th>
                      <th scope="col">Course name</th>
                      <th scope="col">Credit</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderAllModules()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row row-panel">
            <div className="col-md-12">
              <div className="panel">
                <div className="panel-header">
                  Add Course
                </div>
                <div className="panel-content">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Course code</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control" name="code" onChange={this.handleChangeForm}  value={this.state.code} id="inputEmail3" placeholder="Course code"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Course name</label>
                      <div className="col-sm-6">
                        <input required type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChangeForm} id="inputEmail3" placeholder="Course name"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Course credit</label>
                      <div className="col-sm-6">
                        <input required type="number" min={0} onInput={() => this.value = Math.abs(this.value)} className="form-control" name="credit" value={this.state.credit} onChange={this.handleChangeForm} id="inputEmail3" placeholder="Course credit"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Start date</label>
                      <div className="col-sm-6">
                        <input required type="date" className="form-control" name="startDate" value={this.state.startDate} onChange={this.handleChangeForm} id="inputEmail3" placeholder="Start date"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">End date</label>
                      <div className="col-sm-6">
                        <input required type="date" className="form-control" name="endDate" value={this.state.endDate} onChange={this.handleChangeForm} id="inputEmail3" placeholder="end date"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <button type="submit" className="btn btn-success ml-auto mr-auto" style={{marginLeft: '5rem', marginRight: '5rem'}}>
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
    );
  }
}

const mapStateToProps = state => ({
  module: state.module
});

export default connect(mapStateToProps, { addModule, getModules, getModule })(CoursePage);