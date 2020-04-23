import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SortAlphabetically } from '../../helpers/helpers';

const UserDetailPage = ({ match, users, posts }) => {
    const { params } = match;

    const [ user, setUser ] = useState({});
    useEffect(() => {
        if (users && users.length)
            setUser(users
                .filter(user => +user.id === +params.id)[0]);
    }, [users, params.id]);

    const [ userPosts, setUserPosts ] = useState([]);
    useEffect(() => {
        if (posts && posts.length)
            setUserPosts(posts
                .filter(post => +post.userId === +params.id)
                .sort(SortAlphabetically));
    }, [posts, params.id]);

    return (
        <div className="row">
            <div className="col">
                { user ?
                    <div key={user.id}>
                        <NavLink to="/" exact className="nav-link">Back to main page</NavLink>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{ user?.name }</h5>
                                <hr />
                                <p><b>username:</b> { user?.username }</p>
                                <p><b>street:</b> { user?.address?.street }</p>
                                <p><b>suite:</b> { user?.address?.suite }</p>
                                <p><b>city:</b> { user?.address?.city }</p>
                                <p><b>zipcode:</b> { user?.address?.zipcode }</p>
                                <p><b>phone:</b> { user?.phone }</p>
                                <p><b>website:</b> { user?.website }</p>
                                <p><b>company name:</b> { user?.company?.name }</p>
                            </div>
                        </div>
                    </div>
                : `User with id ${params.id} not found...` }
                { userPosts && userPosts.map(post => <p key={post.id}>{post.title}</p>) }
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        users: state.users,
        posts: state.posts,
    }
};

export default connect(mapStateToProps, null)(UserDetailPage);