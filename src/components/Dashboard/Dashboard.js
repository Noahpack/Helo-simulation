import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'


 class Dashboard extends Component {
constructor() {
    super()
    this.state={
        searchInput: "",
        posts: [],
        myPosts: true
    }
}

handleSearchInput = (e) => {
    this.setState({
        searchInput: e.target.value
    })
}

handleSearch = () => {
    this.setState({
        searchInput: ""
    })
    this.getPosts()
}

handleReset = () => {
 this.getPosts();
}

toggleMyPosts = () => {
    this.setState({
        myPosts: !this.state.myPosts
    })
}

componentDidUpdate(prevProps, prevState){
    if(prevState.myPosts !== this.state.myPosts){
        this.getPosts()
    }
}

componentDidMount(){
    this.getPosts()
}

getPosts = async () => {
    try{
        const posts = await axios.get(`/dashboard/posts/${this.props.id}?search=${this.state.searchInput}&userposts=${this.state.myPosts}`)
        this.setState({
            posts: posts.data
        })
    }
    catch(err){
        alert(err)
    }
}

    render(){
        const mappedPosts = this.state.posts.map((post, index) => {
            return (
                <div key={index}>
                    <Link className='posts' to={`/post/${post.id}`}>
                        <h1>{post.title}</h1>
                        <div className='rightSidePosts'>
                            <h5>{post.username}</h5>
                            <img alt='profile' src={post.picture}/>
                        </div>
                    </Link>
                </div>
            )
        })
        return(
            <div className='dash'>
                <div className='search'>
                    <div className='searchBar'>
                        <input onChange={this.handleSearchInput} type='text' placeholder='Search by Title' value={this.state.searchInput}/>
                        <button onClick={this.handleSearch}>Search</button>
                        <button onClick={this.handleReset}>Reset</button>
                    </div>
                </div>
                <div className='postContainer'>
                    {mappedPosts}
                </div>
            </div>
        )    
    }
}
function mapStateToProps(state){
    return{
        id: state.id
    }
}
export default connect(mapStateToProps)(Dashboard)