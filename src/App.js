import React from 'react';
import './App.css';
import SignInSide from './components/signIn'
import MainPage from './components/mainStore'
class App extends React.Component {
  state={
    user:"",
    validUser:false,
  }
  updateUser = (user) => {
    this.setState({ user, validUser:true})
  }

  render(){
    return (
      <div className="App-header" style={{ height:"100vh",backgroundColor: "#282c34",
        fontSize: "calc(10px + 2vmin)",
        color: "white"}}>
        {this.state.validUser?
            <MainPage />
            :
            <SignInSide updateUser={this.updateUser}/>
          }
      </div>
    );
  }
}

export default App;
