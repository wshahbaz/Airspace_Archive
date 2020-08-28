import React from 'react';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import './login.css';
import '../default-view/defaultView.css'

const GCP_ENDPOINT = 'process.env.gcp';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      res: null,
      show: true
    }

    this.onContinueClick = this.onContinueClick.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async onUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  // onLoginButtonClick(e) {
  //   //execute the query with the given input data
  //   this.setState({
  //       show: "loading..."
  //   })

  //     let req1 = GCP_ENDPOINT + `/query/domestic_travel_by_username?username_id=${this.state.username}`;
  //     axios.get(req1)
  //       .then(res => {
  //         console.log("RES1: ", res)
  //         this.setState({ res: res});
  //       })
  //       .catch(err => console.log(err))
  // }

  async onContinueClick(e) {
    //execute the query with the given input data
      if (this.state.username == "") {
        this.setState({ show: "Please enter a username"})
        return;
      }
      // first try loggin in
      let logged = false;
      let req1 = GCP_ENDPOINT + `/query/login_user?name=${this.state.username}`;
      await axios.get(req1)
        .then(res => {
          console.log("RES1: ", res)
          if (res.data.length != 0) {
            this.setState({ res: res, show: ""});
            logged = true;
          }
        })
        .catch(err => console.log(err))

      if (!logged) {
        let req2 = GCP_ENDPOINT + `/query/register_user?name=${this.state.username}`;
        await axios.get(req2)
          .then(res => {
            console.log("RES1: ", res)
            this.setState({ res: res});
          })
          .catch(err => console.log(err))
      }
    
      //continue to main app
      this.props.login(this.state.username);
  }

  handleClose(e) {
    //don't do anything... defined to get rid of warnings
    //users only let passed after giving valid username
  }

  render() {
    let resultComp = this.state.show;


    return (
      <div className="defaultView background">
        <Modal  class='modal' show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register/Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div>
                  Enter your username to continue!
                </div>
                <div>
                   <TextField className="input-box" id="username" label="username" onChange={this.onUsernameChange}/>
                </div>
                <div className='bad'>
                  {resultComp}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={this.onContinueClick}>
                  Continue
                </Button>
            </Modal.Footer>
          </Modal>
      </div>
          
    )
  }
}

export default LoginView;