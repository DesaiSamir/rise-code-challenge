import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar, Tabs, Tab, Box, Paper
} from '@material-ui/core';
const http = require('../../utils/http');

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Paper
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box p={3}>
                <div style={{whiteSpace: 'pre-line'}}>{children}</div>
            </Box>
        )}
        </Paper>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [blocksData, setBlocksData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const callback = (data) => {
            if(data && data.length > 0){
                const tabs = data[0].tabs;
                tabs.forEach((tab) =>{
                    tab.selected && setValue(tab.id)
                })
                setBlocksData(tabs);
            }
        };

        http.getBlocksData(callback);
    }, [])

    const handleChange = (event, newValue) => {
        const tabId = newValue;
        setValue(tabId);
        http.updateSelectedTab(tabId);
    };

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const imageMedia = (url) => {
        const imageDiv = !isOpen 
            ? <div><br /><img className={classes.image} alt="small" src={url} onClick={handleOpen} /></div>
            : <Paper className={classes.expandedImage} onClick={handleClose}><img src={url} alt="large"/></Paper>
        return (imageDiv)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    { blocksData && blocksData.length > 0 &&
                        blocksData.map((block) => {
                            return <Tab className={classes.tab} label={block.title} {...a11yProps(block.id)} key={block.id}/>
                        })
                    }
                </Tabs>
            </AppBar>
            { blocksData && blocksData.length > 0 &&
                blocksData.map((block) => {
                    return (
                        <TabPanel value={value} index={block.id} key={block.id}>
                            {block.description}
                            {
                                block.media 
                                ? 
                                    imageMedia(block.media.url)
                                : '' 
                            }                            
                        </TabPanel>
                    );
                })
            }
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tab: {
        padding: 10,
        width: 50,
    },
    image: {
        maxWidth: 650,
        cursor: 'zoom-in',
    },
    expandedImage:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        cursor: 'zoom-out',
        display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
    }
}));