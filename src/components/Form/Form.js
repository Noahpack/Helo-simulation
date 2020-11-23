import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


 class Form extends Component {
constructor(){
    super()
    this.state = {
        title: "", 
        image: "https://static.thenounproject.com/png/340719-200.png",
        content: ""
    }
}
    componentDidUpdate(){
        if(this.state.image === "") {
            this.setState({
                image: "https://static.thenounproject.com/png/340719-200.png"
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addPost = () => {
        try{
            axios.post(`/form`, this.state)
            this.props.history.push('/dashboard')
        }
        catch(err){
            alert(err)
        }
    }


    render(){
        return(
            <div className='Form'>
                <div className='newPost'>
                    <h1>New Post</h1>
                    <div className='newPostContent'>
                        <h5>Title:</h5>
                        <input name='title' onChange={this.handleChange}></input>
                        <img alt= 'post' src={this.state.image}/>
                        <h5>Image URL: </h5>
                        <input name ='image' onChange={this.handleChange}></input>
                        <h5>Content: </h5>
                        <input name= "content" onChange={this.handleChange}></input>
                    </div>
                    <button onClick={this.addPost}>Post</button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        id: state.id,
    }
}

export default connect(mapStateToProps)(Form)