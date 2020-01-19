import React from 'react';
import Housing from './containers/Housing';
import './App.css';
// import './NewColors.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        userInfo: '',
        token: ''
      }
  }

  loginHandler = (infoOnUser, userToken) => {
    this.setState({
      userInfo: infoOnUser,
      token: userToken
    })
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


