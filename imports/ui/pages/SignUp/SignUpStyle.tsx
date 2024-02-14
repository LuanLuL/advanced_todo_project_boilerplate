import { primary, secondary } from '../../../materialui/styles';

export const signUpStyle = {
	containerSignUp: {
		width: '100vw',
		backgroundColor: secondary,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '40px',
		padding: '0px 20px'
	},
	labelRegisterSystem: {
		marginTop: '15px',
		textAlign: 'center',
		fontSize: '55px',
		fontFamily: '"Roboto", sans-serif',
		color: primary,
		fontWeight: 900,
		lineHeight: '60px'
	},
	formSignUp: {
		textAlign: 'center',
		width: '100%',
		maxWidth: 600
	},
	inputSignUp: {
		marginBottom: '20px'
	},
	containerButtonOptions: {
		marginTop: '16px'
	},
	containerRouterSignIn: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center'
	},
	routersSignUp: {
		color: primary,
		fontSize: '16px',
		fontWeight: 'bold'
	}
};
