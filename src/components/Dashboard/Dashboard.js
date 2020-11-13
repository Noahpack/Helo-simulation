import React, {Component} from 'react'
import {connect} from 'react-redux'
 class Dashboard extends Component {

    render(){
        return(
            <div>
                {!this.props.isLoggedIn ?
            <div>This is the Dashboard</div>
            :
            <div>{this.props.username}</div>}
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Dashboard)