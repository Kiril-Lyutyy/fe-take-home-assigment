import React from 'react';
import CreateUserForm from '../forms/CreateUserForm';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortAlphabetically } from '../../helpers/helpers';

export const HomePage = ({ users, posts, error }) => {
    return (
        <div className="row">
            <div className="col-12">
                { error && <div className="alert alert-danger" role="alert">{ error }</div> }
                <CreateUserForm/>
                <hr />
                <div className="row">
                    { users?.sort(SortAlphabetically).map(user => {
                        return (
                            <div className="col-lg-4 col-md-6 col-sm-12" key={user.id}>
                                <div className="card mb-4 bg-light">
                                    <div className="card-header">
                                        <h5 className="card-title m-0">
                                            <NavLink user={user} to={`/users/${user.id}`}>{user.name}</NavLink>
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        { posts?.filter(post => post.userId === user.id).sort(SortAlphabetically).map(post =>
                                            <p key={post.id}>{post.title}</p>
                                        ) }
                                    </div>
                                </div>
                            </div>
                        )
                    }) }
                </div>
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
