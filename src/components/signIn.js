import React from 'react';
import axios from 'axios';

export default class SignInSide extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userName: '',
      userPassword: ''
    }
  }
  
  updateUserName = (e) => {
    this.setState({userName: e.target.value})
  }
  updatePassword = (e) => {
    this.setState({userPassword: e.target.value})
  }

  signIn = async () => {
    try {
        const {data} = await axios.post("https://baby-spock.herokuapp.com/auth/local",{
            identifier: this.state.userName,
            password: this.state.userPassword
        })
       this.props.updateUser(data.jwt)
    } catch (error) {
        console.log(error)
    }
  }

  render(){
    return (
      <div style={{textAlign:"center", paddingTop:"10vh", }}>
        <input style={{height:"7vh", width:"10vw"}}type="text" name="username" hint="username" onChange={this.updateUserName} className="username" />
        <input style={{height:"7vh", width:"10vw"}} type="password" name="password" hint="password" onChange={this.updatePassword}  className="password" />
        <button  style={{height:"8vh", width:"10vw"}} name="submit" onClick={this.signIn} className="loginButton"> Submit</button>
      </div>
    );

  }

}