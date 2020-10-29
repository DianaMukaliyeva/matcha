import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Link, Badge, Box } from '@material-ui/core';
import { ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
// import OnlineBadge from './OnlineBadge';
import { chatStyles } from '../../styles/chatStyles';

const ConversationBox = ({
    unread,
    conversation,
    active,
    handleChange,
    partnerTyping,
    lastMessage,
    socket,
}) => {
    const [partnerIsOnline, setPartnerIsOnline] = useState({ online: false, partnerId: 0 });
    const history = useHistory();
    const classes = chatStyles();

    useEffect(() => {
        socket.on('ONLINE', (userId, online) => {
            setPartnerIsOnline({ online: online, partnerId: userId });
        });
    }, [partnerIsOnline, socket]);

    return (
        <ListItem
            className={
                active === conversation.partner_id
                    ? classes.conversationActiveList
                    : classes.conversationList
            }
            button
            // alignItems="flex-start"
        >
            <Link
                onClick={() => history.push(`/profile/${conversation.partner_id}`)}
                component="button">
                <ListItemAvatar>
                    <Avatar alt={conversation.partner_name} src={conversation.avatar} />
                </ListItemAvatar>
            </Link>
            <ListItemText
                style={{ color: active === conversation.partner_id ? '#ca416e' : '#219bf1' }}
                onClick={(e) => handleChange(e, conversation.partner_id, conversation.sender_id)}
                primary={
                    <>
                        {conversation.partner_name} {conversation.partner_surname}{' '}
                        <div style={{ float: 'right', color: '#b5bad3' }}>
                            {/* <OnlineBadge
                                lastSeen={
                                    partnerIsOnline.partnerId === conversation.partner_id &&
                                    partnerIsOnline.online
                                        ? 'online'
                                        : conversation.last_seen
                                }
                            /> */}
                        </div>
                    </>
                }
                secondary={
                    <Box component="span" display="block" textOverflow="ellipsis" overflow="hidden">
                        {partnerTyping.typing && partnerTyping.chatId === conversation.chat_id
                            ? 'is typing...'
                            : lastMessage.chatId === conversation.chat_id
                            ? lastMessage.text
                            : conversation.last_message}{' '}
                        {unread && (
                            <Badge
                                badgeContent={unread}
                                max={99}
                                color="primary"
                                className={classes.floatRight}></Badge>
                        )}
                    </Box>
                }
            />
        </ListItem>
    );
};

export default ConversationBox;
