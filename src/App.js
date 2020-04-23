import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import UserDetailPage from './components/pages/UserDetailPage';
import { connect } from 'react-redux';
import { getUsers } from './redux/actions';
import { ErrorPage } from './components/pages/ErrorPage';

const App = ({ fetchData }) => {
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <div className="container pt-3">
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/users/:id" component={UserDetailPage} />
                    <Route path="*" component={ErrorPage} />
                </Switch>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => {
            dispatch(getUsers());
        }
    }
};

export default connect(null, mapDispatchToProps)(App);