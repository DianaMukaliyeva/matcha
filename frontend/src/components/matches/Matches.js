import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';

import { AppBar, Tabs, Tab, Container, Box } from '@material-ui/core';
import { Search, Whatshot, Favorite, PersonPin, Help, QueryBuilder, WbIncandescent } from '@material-ui/icons';

<<<<<<< HEAD
import Match from '../common/matchGallery/GetMatches';
import Filter from './filter/Index';
import { resetFilter } from '../../actions/match';
import { useDispatch } from 'react-redux';
=======

import Match from "../common/matchGallery/GetMatches";
import Filter from "./filter/Index";
import { resetFilter } from "../../actions/match";
import { useDispatch } from "react-redux";

>>>>>>> 59d9de3f714b8f6b421664d51751e3cef5245e70

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const Matches = ({ resetFilter, match, history, previousPath }) => {
    const { page } = match.params;
    const route = '/match/' + page;
    const indexToTabName = ['recommend', 'search', 'online', 'new', 'popular', 'random', 'nearby'];
    const [value, setValue] = React.useState(indexToTabName.indexOf(page));
    // const [back, setBack] = React.useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("use effect");
<<<<<<< HEAD
=======

>>>>>>> 59d9de3f714b8f6b421664d51751e3cef5245e70
        if (previousPath === '') {
            // console.log("1", previousPath, back);
            resetFilter();
        } else if (previousPath === 'otherUser') {
            // console.log("2", previousPath, back);
            dispatch({ type: 'UPDATE_PATH', payload: '' });
        }
    }, [dispatch, previousPath, resetFilter]);
<<<<<<< HEAD
=======

>>>>>>> 59d9de3f714b8f6b421664d51751e3cef5245e70

    const handleChange = (event, newValue) => {
        history.push(`/matches/${indexToTabName[newValue]}`);
        setValue(newValue);
        resetFilter();
    };

    // window.onpopstate = e => {
    //     setBack(true);
    //     console.log("back", e);
    //     // console.log("previousPath", previousPath);
    // }

    return (
        <Box>
<<<<<<< HEAD
            <AppBar color="secondary" position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example">
                    <Tab label="Recommended" icon={<Favorite />} {...a11yProps(0)} />
                    <Tab label="Search" icon={<Search />} {...a11yProps(1)} />
                    <Tab label="Online" icon={<QueryBuilder />} {...a11yProps(2)} />
                    <Tab label="New People" icon={<WbIncandescent />} {...a11yProps(3)} />
                    <Tab label="Popular" icon={<Whatshot />} {...a11yProps(4)} />
                    <Tab label="Random" icon={<Help />} {...a11yProps(5)} />
                    <Tab label="Nearby" icon={<PersonPin />} {...a11yProps(6)} />
                </Tabs>
=======
            <AppBar
                color="secondary"
                position="static"
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
                <Container>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab
                            label="Recommended"
                            icon={<Favorite />}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Search"
                            icon={<Search />}
                            {...a11yProps(1)}
                        />
                        <Tab
                            label="Online"
                            icon={<QueryBuilder />}
                            {...a11yProps(2)}
                        />
                        <Tab
                            label="New People"
                            icon={<WbIncandescent />}
                            {...a11yProps(3)}
                        />
                        <Tab
                            label="Popular"
                            icon={<Whatshot />}
                            {...a11yProps(4)}
                        />
                        <Tab label="Random" icon={<Help />} {...a11yProps(5)} />
                        <Tab
                            label="Nearby"
                            icon={<PersonPin />}
                            {...a11yProps(6)}
                        />
                    </Tabs>
                </Container>

>>>>>>> 59d9de3f714b8f6b421664d51751e3cef5245e70
            </AppBar>
            <Container>
                <TabPanel value={value} index={0}>
                    <Filter route={route} setting={false}></Filter>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Filter route={route} setting={true}></Filter>
                </TabPanel>
                {value > 1 && value < 7 && (
                    <TabPanel value={value} index={value}>
                        <Match route={route} filterIsOn={1} />
                    </TabPanel>
                )}
            </Container>
        </Box>
    );
};

Matches.propTypes = {
    resetFilter: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    previousPath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    previousPath: state.auth.previousPath,
});

export default connect(mapStateToProps, {
    resetFilter,
})(Matches);
