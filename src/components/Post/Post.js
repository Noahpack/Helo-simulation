import axios from 'axios';
import React, { Component } from 'react';
import {connect} from 'react-redux';


class Post extends Component{
    constructor(){
        super();
        
        this.state={
            title: "",
            image: "",
            content: "",
            username: "",
            profilePicture: "",
            userId: null
        }
    }

    componentDidMount(){
        this.getPost();
    }

    getPost = async () => {
        try{
            const post = await axios.get(`/post/${this.props.match.params.postid}`)
            this.setState({
                title: post.data[0].title,
                image: post.data[0].postpicture,
                content: post.data[0].content,
                username: post.data[0].username,
                profilePicture: post.data[0].picture,
                userId: post.data[0].id
            });
        }
        catch(err){
            alert(err);
        }
    }

    deletePost = async () => {
        try{
            const response = axios.delete(`/post/delete/${this.props.match.params.postid}`);
            if (response === "You can only delete posts you created."){
                alert(response);
            }
            this.props.history.push('/dashboard')
        }
        catch(err){
            alert(err);
        }
    }

    render(){
        return(
            <div className="Post">
                  <div className="content">
                    <div className="postTitle">
                        <h1>{this.state.title}</h1>
                        <div className = "postTitleProfile">
                            <h5>{this.state.username}</h5>
                            <img alt="Profile" src={this.state.profilePicture}/>
                        </div>
                    </div>
                    <div className="postContent">
                        <img alt="Post" src={this.state.image}/>
                        <p>{this.state.content}</p>
                    </div>
                    <button onClick={this.deletePost}>Delete</button>
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
export default connect(mapStateToProps)(Post);