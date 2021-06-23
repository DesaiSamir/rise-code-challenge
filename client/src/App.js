import { Typography } from '@material-ui/core';
import TabPanel from './components/control/TabPanel';
import { makeStyles } from '@material-ui/core/styles';

function App() {
    const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<Typography variant='h4' gutterBottom>
					Tab-Block
				</Typography>
				<TabPanel />
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		width: 800,
	}
}));

export default App;
