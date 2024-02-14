import { primary, secondary } from '../../../materialui/styles';

const signinStyle = {
	containerSignIn: {
		padding: '0px 20px',
		width: '100%',
		backgroundColor: secondary,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	labelAccessSystem: {
		textAlign: 'center',
		fontSize: '55px',
		fontFamily: '"Roboto", sans-serif',
		color: primary,
		fontWeight: 900,
		marginTop: '10px'
	},
	formSignIn: {
		textAlign: 'center',
		width: '100%',
		maxWidth: 600
	},
	inputSignIn: {
		marginBottom: '20px'
	},
	containerSubLabelSignUp: {
		margin: '40px auto'
	},
	subLabelAccessSystem: {
		textAlign: 'center',
		fontSize: '18px',
		fontFamily: 'Roboto, sans-serif',
		color: primary
	},
	containerButtonOptions: {
		marginTop: '16px'
	},
	containerRouterSignUp: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '5px',
		marginTop: '40px'
	},
	routersSignIn: {
		color: primary,
		fontSize: '16px',
		fontWeight: 'bold'
	}
};

export { signinStyle };
