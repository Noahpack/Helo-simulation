import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUserData} from '../../redux/reducer';
import './Auth.css';

class Auth extends Component{
    constructor(){
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    registerUser = async () => {
        const {username, password} = this.state;
        try{
            const user = await axios.post('/auth/register', {username, password})
            this.props.getUserData(user.data.id, user.data.username, user.data.picture)
            this.props.history.push('/dashboard')
        }
        catch(err){
            alert(err.response.request.response)
        }
    }

    login = async () => {
        const {username, password} = this.state;
        try{
            const user = await axios.post('/auth/login', {username, password})
            this.props.getUserData(user.data.id, user.data.username, user.data.picture)
            this.props.history.push('/dashboard')
        }catch(err){
            alert(err.response.request.response)
        }
    }


    render(){
        return(
            <div className='authBody'>
                <div className='loginBox'>
                    <h1>Helo</h1>
                    <div className = 'username'>
                        <h5>Username   </h5>
                        <input onChange={this.handleUsername} type='text'/>
                    </div>

                    <div className='password'>
                        <h5>Password   </h5>
                        <input onChange={this.handlePassword} type='password'/>
                    </div>

                    <div className='buttons'>
                        <button onClick={this.login} className='loginButoon'>Login</button>
                        <button onClick={this.registerUser} className='registerButton'>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getUserData})(Auth);