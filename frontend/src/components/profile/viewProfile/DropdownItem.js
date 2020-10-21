import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { addInteraction, unblockUser } from "../../../actions/profile";

import { useStyles } from '../../../styles/custom';

const Dropdown = ({
    addInteraction,
    unblockUser,
    profile: { profile },
}) => {
    const userId = profile.user_id;
    const blocked = profile.blocked;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickUnblock = () => {
        unblockUser("profile", [{ user_id: userId }]);
    };
    const handleClickInteraction = (type) => () => {
        // unblockUser("profile", [{ user_id: userId }]);
        addInteraction(type, userId);
    };

    const classes = useStyles();
    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreHorizIcon style={{ fill: "white" }} fontSize="small"/>
            </IconButton>
            <Menu 
                id="actions-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem style={{ backgroundColor: "grey"}}
                    onClick={handleClickInteraction("reported")}
                >
                    REPORT
                </MenuItem>
                {blocked === "1" ? (
                    <MenuItem style={{ backgroundColor: "grey"}}
                        onClick={handleClickUnblock}
                    >
                        UNBLOCK
                    </MenuItem>
                ) : (
                    <MenuItem style={{ backgroundColor: "grey"}}
                        onClick={handleClickInteraction("blocked")}
                    >
                        BLOCK
                    </MenuItem>
                )}

                <MenuItem style={{ backgroundColor: "grey"}}
                onClick={handleClose}>
                    x
                </MenuItem>
            </Menu>
        </>
    );
};

Dropdown.propTypes = {
    addInteraction: PropTypes.func.isRequired,
    unblockUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {
    addInteraction,
    unblockUser,
})(Dropdown);
