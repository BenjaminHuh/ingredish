import { connect } from "react-redux";
import React from 'react';
import { signup } from "../../actions/session_actions";
import SignupForm from "./signup_form";
import { openModal, closeModal } from "../../actions/modal_actions";
import '../modal/modal.scss';

const mapStateToProps = state => {
    return {
        signedIn: state.session.isSignedIn,
        errors: state.errors.session
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signup: user => dispatch(signup(user)),
        closeModal: () => dispatch(closeModal()),
        otherForm: (<button onClick={() => dispatch(openModal('login'))}>Signup</button>),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
