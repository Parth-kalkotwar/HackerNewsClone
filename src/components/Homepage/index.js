import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PostList from '../PostList';


class Homepage extends Component {
    render() {
        // if(!this.props.loggedIn) {
        //     return <Redirect to="/login" />
        // }
        return (
            <div>
                <PostList />
            </div>
        );
    }
}

const mapStateToProps= (state) => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(Homepage);