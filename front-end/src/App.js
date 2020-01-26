import React from 'react';
import Housing from './containers/Housing';
import './App.css';
import './NewColors.scss';
import Cookie from "react-cookies";
// import './NewColors.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        userInfo: (Cookie.load("userInfo") !== '') ? Cookie.load("userInfo") : "",
        token: (Cookie.load("token") !== '') ? Cookie.load("token") : "",
      }
  }

  loginHandler = (infoOnUser, userToken, rememberMe) => {
    this.setState({
      userInfo: infoOnUser,
      token: userToken
    })
    if ( rememberMe ) {
      Cookie.save("userInfo", infoOnUser, { path: "/"});
      Cookie.save("token", userToken, { path: "/"});
      console.log("cookies worked");
    }
  }

  logOutHandler = () => {
    this.setState({
      userInfo: '',
      token: ''
    })
  }

  render() {
    return (
      <div className="App">
        <Housing  userInfoAndToken={this.state} 
                  loginHandler={this.loginHandler}
                  logOutHandler={this.logOutHandler} />
      </div>
    );
  }
}


