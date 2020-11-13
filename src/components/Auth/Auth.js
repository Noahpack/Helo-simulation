import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../../redux/reducer'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            newUser: false
            
        }
    }

    toggleNewUser = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    register = async (e) => {
        e.preventDefault();
        const {password, username} = this.state
        try {
            const user = await axios.post('/auth/register', {password, username})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        }
        catch(err){
            alert(err.response.request.response)
        }
    }

    login = async (e) => {
        e.preventDefault()
        const {username, password} = this.state
        try {
            const user = await axios.post('/auth/login', {username, password})
            this.props.loginUser(user.data)
            this.props.histoy.push('/dashboard')
        }catch(err) {
            alert(err.response.request.response)
        }
    }

    render(){
        const {username, password} = this.state
        return(<div>
                {this.state.newUser ?
                <div>
                    <h3>Register</h3>
                    <form onSubmit={e=> this.register(e)}>
                        <input
                        name="username" 
                        value={username} 
                        placeholder="username" 
                        onChange={ e => this.changeHandler(e)}
                    />
                    <input 
                        name="password" 
                        type="password"
                        value={password} 
                        placeholder="password" 
                        onChange={ e => this.changeHandler(e)}
                    />
                    <button>Register</button>
                        </form>

                        </div>
                        :
                        <div>
                            <h3>Login</h3>
                            <form onSubmit={e => this.login(e)}>
                                <input 
                                name='username'
                                value={username}
                                placeholder='Username'
                                onChange={ e => this.changeHandler(e)}
                                />
                                <input
                                name='password'
                                value={password}
                                placeholder='Username'
                                onChange={e => this.changeHandler(e)}
                                />
                                <button>Login</button>
                            </form>
                            
                 </div>}
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {loginUser})(Auth)