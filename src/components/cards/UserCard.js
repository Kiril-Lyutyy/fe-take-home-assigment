import React from 'react';
import { connect } from 'react-redux';

const UserCard = () => {
    return (<div>User card</div>);
};

const mapStateToProps = state => {
    console.log(state);
    return {

    };
};

const mapDispatchToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);