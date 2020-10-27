import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Box, Button, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "../../styles/custom";

const Landing = ({ isAuthenticated, loading, history, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleRedirect = (newRoute) => {
        history.push(newRoute);
    };

    if (isAuthenticated) {
        return <Redirect to="/matches" />;
    }

    return loading ? (
        <>Loading</>
    ) : (
        <Box
            pt="200px"
            display="flex"
            flexDirection="column"
            textAlign="center"
        >
            <Typography
                variant={isMobile ? "h5" : "h4"}
                style={{ color: theme.palette.info.main }}
            >
                Your love Is Written
            </Typography>
            <Typography
                mb={2}
                className={classes.customHeader}
                variant={isMobile ? "h4" : "h3"}
            >
                In The Stars
            </Typography>
            <Button
                onClick={() => handleRedirect("/register")}
                variant="contained"
                color="primary"
                className={classes.customTransparentButton}
            >
                Create Account
            </Button>
            <Typography className={classes.customHeader} variant="h6">
                or
            </Typography>

            <Button
                onClick={() => handleRedirect("/login")}
                color="secondary"
                className={classes.customButton}
            >
                Log in
            </Button>
            <Button
                onClick={() => handleRedirect("/login")}
                variant="contained"
                // className={classesLanding.googleBtn + ' ' + classes.p2}>
                className={classes.googleBtn}
            >
                <img
                    className={classes.img}
                    alt="google"
                    src={require("../../google.png")}
                />
                Log in with Google
            </Button>
        </Box>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
});

export default connect(mapStateToProps)(withRouter(Landing));
