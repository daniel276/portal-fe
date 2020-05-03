import React, {Component} from 'react';
import { Modal, ModalBody, ModalHeader, } from "reactstrap";
import { connect } from "react-redux";
import { changePassword, changeProfile, getAccount } from "../../../actions/securityActions";
import { getUserBiometrics, uploadBiometrics, uploadProfilePicture, deleteBiometrics } from "../../../actions/storageActions";
import moment from "moment";
import DEFAULT_PICTURE from "../../../assets/user.jpeg"
import "./styles.scss";
import ModalFooter from "reactstrap/es/ModalFooter";

class Account extends Component {

  constructor(){
    super();

    this.state = {
      isOpenProfileModal: false,
      isOpenLoginInfoModal: false,
      isOpenPreviewModal: false,
      selectedFileId: null,
      selectedUrl: "",
      selectedProfileFile: null,
      selectedBiometricFile: null,
      id: null,
      username: "",
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
      profile_picture: "",
      password: "",
      address: "",
      user: {},
      security: {}
    }
  }

  handleChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleOnBiometricFileChange = e => {
    let selectedBiometricFile = e.target.files[0];
    this.setState(() => ({ selectedBiometricFile: selectedBiometricFile }));
  };

  handleOnFileChange = e => {
    let selectedProfileFile = e.target.files[0];
    this.setState(() => ({ selectedProfileFile: selectedProfileFile }));
  };

  onUploadBiometricFile = e => {
    const formData = new FormData();
    formData.append("file", this.state.selectedBiometricFile, this.state.selectedBiometricFile.name);

    this.props.uploadBiometrics(formData, this.state.username);
  };

  onUploadProfile = e => {
    const formData = new FormData();
    formData.append("file", this.state.selectedProfileFile, this.state.selectedProfileFile.name);
    this.props.uploadProfilePicture(formData, this.state.username);
  };

  deleteBiometricFile = (username, file_id) => e => {
    this.props.deleteBiometrics(username, file_id)
  };

  handleOpenProfileModal = e => {
    this.setState(prevState => ({
      isOpenProfileModal: !prevState.isOpenProfileModal
    }))
  };

  handleOpenLoginProfileModal = e => {
    this.setState(prevState => ({
      isOpenLoginInfoModal: !prevState.isOpenLoginInfoModal
    }))
  };

  handleOpenPreviewModal = (url, id) => e => {
    this.setState(prevState => ({
      isOpenPreviewModal: !prevState.isOpenPreviewModal,
      selectedFileId: id,
      selectedUrl: url
    }));
  };

  onSubmitNewPassword = e => {
    e.preventDefault();

    const newPassword = {
      id: this.state.id,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dob: this.state.dob,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      password: this.state.password,
    };
    this.props.changePassword(newPassword);
  };

  onSubmitChangeProfile = e => {
    e.preventDefault();

    const newProfile = {
      id: this.state.id,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      profile_picture: this.state.profile_picture,
      phone: this.state.phone,
      dob: this.state.dob,
      email: this.state.email,
      address: this.state.address
    };

    this.props.changeProfile(newProfile);
  };

  urlName = (url) => {
    return url.split('/').pop().split('#')[0].split('?')[0];
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { biometrics} = nextProps.storage;
    const { user } = nextProps.security;
    const {
      id,
      username,
      firstName,
      lastName,
      profile_picture,
      dob,
      address,
      phone,
      email, } = user;

    this.setState({
      user,
      biometrics,
      id,
      username,
      firstName,
      lastName,
      profile_picture,
      dob,
      address,
      phone,
      email
    })
   }

  componentDidMount() {
    const { user } = this.props.security;
    this.props.getUserBiometrics(user.username);
    this.props.getAccount(user.id);
  }

  render() {

    const { biometrics = [] } = this.state;

    return (
        <div className="account-page">
          <div className="row" style={{marginTop:'32px'}}>
            <div className="col-md-4">
              <div className="left-row">
                <div className="profile-picture-box">
                  <img className="profile-picture" alt="profile" src={this.state.profile_picture ? this.state.profile_picture :DEFAULT_PICTURE}/>
              </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row info">
                <div className="header">
                  <p>Account Info</p>
                  <button type="button" className="btn btn-outline-dark btn-sm" onClick={this.handleOpenProfileModal}>Change</button>
                </div>
                <div className="content">
                  <p>ID: {this.state.id && this.state.id}</p>
                  <p>Name: {this.state.firstName && this.state.firstName} {this.state.lastName && this.state.lastName}</p>
                  <p>Date of Birth: {this.state.dob ? moment(this.state.dob).format("DD MMM YYYY") : "-"}</p>
                  <p>Contact Phone: {this.state.phone ? this.state.phone : "-"}</p>
                  <p>Address: {this.state.address ? this.state.address : "-"}</p>
                  <hr/>
                  <p className="mb-1">Change Profile Picture: </p>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{cursor:'pointer'}}
                            onClick={this.state.selectedProfileFile ? this.onUploadProfile : undefined}>
                        Upload
                      </span>
                    </div>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="inputGroupFile01" accept="image/*" onChange={this.handleOnFileChange}/>
                        <label className="custom-file-label"
                               htmlFor="inputGroupFile01">
                          {this.state.selectedProfileFile ? this.state.selectedProfileFile.name : "Choose profile picture..."}
                        </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row info" style={{marginTop: '32px'}}>
                <div className="header">
                  <p>Login Info</p>
                  <button type="button" className="btn btn-outline-dark btn-sm" onClick={this.handleOpenLoginProfileModal}>Change</button>
                </div>
                <div className="content">
                  <p>Registered Email: {this.state.email}</p>
                  <p>Username : {this.state.username}</p>
                  <p>Password: *******</p>
                </div>
              </div>
              <div className="row info" style={{marginTop: '32px'}}>
                <div className="header">
                  <p>
                    Upload Face Biometric
                  </p>
                </div>
                <div className="content">
                    <p className="mb-1">
                      You currently have total of {biometrics.length} biometric(s) uploaded. It is recommended to upload more sample photo of yours to increase face recognition accuracy.
                    </p>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"
                            style={{cursor: 'pointer'}}
                            onClick={this.state.selectedBiometricFile ? this.onUploadBiometricFile : undefined}
                            aria-disabled={this.state.selectedBiometricFile}>Upload</span>
                    </div>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" onChange={this.handleOnBiometricFileChange} accept="image/*" id="inputGroupFile01"/>
                      <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.selectedBiometricFile ? this.state.selectedBiometricFile.name : "Choose picture"}</label>
                    </div>
                  </div>
                  <div className="image-list-view">
                    {biometrics.length > 0 ? biometrics.map(value => (
                      <div className="list" key={value.id} onClick={this.handleOpenPreviewModal(value.url, value.id)}>
                        <p>{this.urlName(value.url)}</p>
                        <button type="button" className="btn btn-outline-primary btn-sm">Click to preview</button>
                      </div>
                    )): (
                        <div className="alert alert-primary text-center" role="alert">
                          No file(s) uploaded.
                        </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>

          <Modal isOpen={this.state.isOpenProfileModal} toggle={this.handleOpenProfileModal} >
            <ModalHeader>Change Profile</ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmitChangeProfile}>
                <div className="form-group d-flex">
                  <div className="col-sm-4">
                    <label htmlFor="studentId" className="v-align-middle">Student ID:</label>
                  </div>
                  <div className="col-sm-7">
                    <input type="text" id="studentId" className="form-control" value={this.state.id} name="id" disabled/>
                  </div>
                </div>

                <div className="form-group d-flex">
                  <div className="col-sm-4">
                    <label htmlFor="name" className="v-align-middle">Name:</label>
                  </div>
                  <div className="col-sm-4">
                    <input type="text" id="name" className="form-control" value={this.state.firstName} onChange={this.handleChangeForm} name="firstName" disabled/>
                  </div>
                  <div className="col-sm-4">
                    <input type="text" id="name" className="form-control" value={this.state.lastName} onChange={this.handleChangeForm} name="lastName" disabled/>
                  </div>
                </div>

                <div className="form-group d-flex">
                <div className="col-sm-4">
                  <label htmlFor="dob" className="v-align-middle">Date of Birth:</label>
                </div>
                <div className="col-sm-7">
                  <input type="date" id="dob" className="form-control" name="dob" value={this.state.dob} disabled/>
                </div>
              </div>

                <div className="form-group d-flex">
                  <div className="col-sm-4">
                    <label htmlFor="phone" className="v-align-middle">Phone: </label>
                  </div>
                  <div className="col-sm-7">
                    <input type="text" id="phone" className="form-control" name="phone" onChange={this.handleChangeForm} value={this.state.phone}/>
                  </div>
                </div>

                <div className="form-group d-flex">
                  <div className="col-sm-4">
                    <label htmlFor="address" className="v-align-middle">Address:</label>
                  </div>
                  <div className="col-sm-7">
                    <textarea id="address" className="form-control" onChange={this.handleChangeForm} value={this.state.address} name="address"/>
                  </div>
                </div>

                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Save</button>
                </div>

              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={this.state.isOpenLoginInfoModal} toggle={this.handleOpenLoginProfileModal}>
            <ModalHeader>Change Password</ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmitNewPassword}>
                <div className="form-group d-flex">
                  <div className="col-sm-4">
                    <label htmlFor="email" className="v-align-middle">Registered Email:</label>
                  </div>
                  <div className="col-sm-7">
                    <input type="text" id="email" className="form-control" name="email" value={this.state.email ? this.state.email : ""} disabled/>
                  </div>
                </div>

                <div className="form-group d-flex">
                  <div className="col-sm-4">
                    <label htmlFor="username" className="v-align-middle">Username:</label>
                  </div>
                  <div className="col-sm-7">
                    <input type="text" id="username" className="form-control" name="username" value={this.state.username} disabled/>
                  </div>
                </div>

                <div className="form-group d-flex">
                  <div className="col-sm-4">
                    <label htmlFor="password" className="v-align-middle">Password:</label>
                  </div>
                  <div className="col-sm-7">
                    <input type="password" id="password" placeholder="*****" className="form-control" name="password" onChange={this.handleChangeForm} value={this.state.password}/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="confirm">
                    <button type="submit" className="btn btn-success">Confirm</button>
                  </div>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={this.state.isOpenPreviewModal} toggle={this.handleOpenPreviewModal()}>
            <ModalHeader>Preview</ModalHeader>
            <ModalBody>
              <img className="d-block ml-auto mr-auto" style={{maxHeight: '300', maxWidth: '400px'}} src={this.state.selectedUrl} alt="img"/>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={this.deleteBiometricFile(this.state.username, this.state.selectedFileId)}>Delete</button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security,
  storage: state.storage
});

export default connect(mapStateToProps, {
  changeProfile,
  changePassword,
  getAccount,
  getUserBiometrics,
  uploadBiometrics,
  uploadProfilePicture,
  deleteBiometrics})
(Account);