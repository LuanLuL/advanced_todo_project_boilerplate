import { primary, secondary } from '../../../materialui/styles';

export const passwordRecoveryStyle = {
	containerRecoveryPassword: {
		padding: '0px 20px',
		width: '100%',
		marginTop: { xs: '0px', sm: '60px', md: '60px', lg: '60px', xl: '60px' },
		marginBottom: '50px',
		backgroundColor: secondary,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: { xs: '60px', sm: '60px', md: '80px', lg: '80px', xl: '80px' }
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
		marginTop: { xs: '60px', sm: '60px', md: '70px', lg: '70px', xl: '70px' },
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
};
