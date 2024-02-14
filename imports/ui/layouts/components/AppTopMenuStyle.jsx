export const appTopMenuStyle = {
	mainContainer: {
		width: '100%',
		backgroundColor: '#c4c4c4',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	contentTopMenu: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 75,
		maxHeight: 75
	},
	boxTitleContentTopMenu: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '15px'
	},
	buttonTitleContentTopMenu: {
		width: 30,
		height: 30,
		color: '#4e4e4e',
		'&: hover': {
			cursor: 'pointer'
		},
		padding: '2px'
	},
	titleContentTopMenu: {
		fontFamily: "'Roboto', sans-serif",
		fontSize: 30,
		color: '#000000',
		fontWeight: 'bold'
	},
	accountCircle: {
		color: 'rgba(0, 0, 0, 0.6)',
		backgroundColor: '#979797',
		borderRadius: '50%',
		padding: 5,
		width: 30,
		height: 30
	},
	optionsAccountCircle: {
		color: '#000'
	}
};
