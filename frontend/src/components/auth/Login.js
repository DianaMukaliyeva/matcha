import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton, Button, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { login } from '../../actions/auth';
import Input from '../common/Input';
import Form from '../common/IndividualForm';
import { useStyles } from '../../styles/custom';

const Login = ({ login, isAuthenticated, user, history }, path) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ usernameError: '', passwordError: '' });

    const classes = useStyles();
    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRedirect = newRoute => {
        history.push(newRoute);
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (!username || !password) {
            setErrors({
                usernameError: !username && 'username required',
                passwordError: !password && 'password required',
            });
            return;
        }
        const res = await login(formData);
        if (res.error) {
            setErrors({
                usernameError: res.error,
                passwordError: res.error,
            });
        }
    };

    // Redirect if logged in
    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    return (
        <Box pt="150px">
            <Box>
                <IconButton onClick={() => handleRedirect('/')}>
                    <ArrowBackIosIcon fontSize="large" />
                </IconButton>
            </Box>
            <Form onSubmit={onSubmit}>
                <Input
                    header="Enter username and password"
                    type="username"
                    handleChange={onChange}
                    value={username}
                    helperText={errors.usernameError}
                />
                <Input
                    type="password"
                    handleChange={onChange}
                    value={password}
                    helperText={errors.passwordError}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.customButton}>
                    Next
                </Button>
                <Button
                    className={classes.customTransparentButton}
                    onClick={() => handleRedirect('/forgetPwd')}
                    color="secondary">
                    Forgot password?
                </Button>
            </Form>
        </Box>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
