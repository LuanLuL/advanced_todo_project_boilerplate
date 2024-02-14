import { primary, secondary } from '../../../materialui/styles';

export const passwordRecoveryStyle = {
	containerRecoveryPassword: {
		padding: '0px 20px',
		width: '100%',
		marginTop: '80px',
		backgroundColor: secondary,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '120px'
	},
	labelAccessSystem: {
		textAlign: 'center',
		fontSize: '60px',
		fontFamily: '"Roboto", sans-serif',
		color: primary,
		fontWeight: 900,
		lineHeight: '60px'
	},
	formPasswordR: {
		textAlign: 'center',
		width: '100%',
		maxWidth: 600
	},
	containerButtonOptions: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
};
