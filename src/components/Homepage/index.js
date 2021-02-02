import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import PostList from '../PostList';


class Homepage extends Component {
    render() {
        if(!localStorage.getItem('loggedIn')) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <PostList />
            </div>
        );
    }
}

export default Homepage;