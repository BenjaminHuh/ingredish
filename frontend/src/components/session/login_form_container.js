import { connect } from "react-redux";
import React from 'react';
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { openModal, closeModal } from "../../actions/modal_actions";
import '../modal/modal.scss';

const mapStateToProps = state => {
    return {
        errors: state.errors.session
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(login(user)),
        closeModal: () => dispatch(closeModal()),
        otherForm: (<button onClick={() => dispatch(openModal('signup'))}>Signup</button>),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
