import React from 'react';
import CreateUserForm from '../forms/CreateUserForm';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortAlphabetically } from '../../helpers/helpers';

export const HomePage = ({ users, posts, error }) => {
    return (
        <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-12">
                { error && <div className="alert alert-danger" role="alert">{ error }</div> }
                <CreateUserForm/>
                { users?.sort(SortAlphabetically).map(user => {
                    return (
                        <div className="card mb-4" key={user.id}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <NavLink user={user} to={`/users/${user.id}`}>{user.name}</NavLink>
                                </h5>
                                { posts?.filter(post => post.userId === user.id).sort(SortAlphabetically).map(post =>
                                    <p key={post.id}>{post.title}</p>
                                ) }
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        users: state.users,
        posts: state.posts,
        loading: state.loading,
        error: state.error,
    }
};

export default connect(mapStateToProps, null)(HomePage);
