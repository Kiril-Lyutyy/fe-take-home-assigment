import React from 'react';
import { connect } from 'react-redux';
import { submitFormData } from '../../redux/actions';

class CreateUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUserName: '',
        };
    }

    submitHandler = e => {
        e.preventDefault();
        const { newUserName } = this.state;
        if (newUserName.length) {
            this.props.submitForm(newUserName);
            this.setState({ newUserName: '' });
        }
    };

    changeInputHandler = e => {
        e.persist();
        this.setState(prev => ({
            ...prev, ...{
                [e.target.name]: e.target.value
            }
        }));
    };

    render() {
        return (
            <div>
                <h5>Create new user</h5>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">*User name</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="newUserName"
                            value={this.state.newUserName}
                            name="newUserName"
                            onChange={this.changeInputHandler}/>
                    </div>
                    <button disabled={!!this.props.loading} type="submit" className="btn btn-primary mb-4">
                        { !this.props.loading ? 'Submit' : 'Loading...' }
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        submitForm: userName => {
            dispatch(submitFormData(userName));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm);