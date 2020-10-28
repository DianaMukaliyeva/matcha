import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Typography, IconButton, Box, Avatar, useMediaQuery } from '@material-ui/core';
import { MenuItem, Menu } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { getNotifications } from '../../../actions/notifications';
import { navStyles } from '../../../styles/navStyles';

const ProfileMenu = ({ handleNavigation, active, setActive }) => {
    const notifications = useSelector((state) => state.notifications);
    const { user, socket } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [profileSettings, setProfileSettings] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');
    const classes = navStyles();

    useEffect(() => {
        socket.on('UPDATE_NOTIFICATIONS', (type) => {
            dispatch(getNotifications());
        });
    }, [socket, dispatch]);

    const amount = (amount) => {
        return amount < 100 ? amount : '99+';
    };

    const clickMenu = (menuItem) => {
        setActive('Profile');
        handleNavigation(menuItem.pageUrl);
        setProfileSettings(null);
    };

    const profileMenu = [
        {
            title: 'My profile',
            pageUrl: '/profile/me',
        },
        {
            title: 'Account Settings',
            pageUrl: '/settings',
        },
        {
            title: 'Visit history',
            pageUrl: '/visits/allvisits',
            notification: notifications.visit ? amount(notifications.visit) : '',
            color: notifications.visit > 0 ? 'primary.main' : 'transparent',
        },
    ];

    return (
        <>
            <IconButton
                className={
                    active === 'profile' || active === 'settings' || active === 'visits'
                        ? classes.iconButtonActive
                        : classes.iconButton
                }
                onClick={(event) => setProfileSettings(event.currentTarget)}>
                <Typography variant="button" className={classes.mobileText} color="textPrimary">
                    <Badge
                        className={classes.pr}
                        badgeContent={amount(notifications.visit)}
                        color="primary">
                        {isMobile ? (
                            <PersonOutlineIcon />
                        ) : (
                            <Avatar className={classes.avatar}>{user.username.charAt(0)}</Avatar>
                        )}
                    </Badge>
                    Profile
                </Typography>
            </IconButton>
            <Menu
                className={classes.menu}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                elevation={0}
                anchorEl={profileSettings}
                open={Boolean(profileSettings)}
                onClose={() => setProfileSettings(null)}>
                {profileMenu.map((menuItem) => (
                    <MenuItem
                        className={classes.menuItem}
                        key={menuItem.title}
                        onClick={() => clickMenu(menuItem)}>
                        {menuItem.title}
                        <Box
                            ml={2}
                            borderRadius="50%"
                            width="20px"
                            height="20px"
                            textAlign="center"
                            bgcolor={menuItem.color}>
                            {menuItem.notification}
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ProfileMenu;
