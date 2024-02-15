/*!

 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import { isMobile } from '/imports/libs/deviceVerify';
import { primary, secondary } from '../../../materialui/styles';

const homeStyles = {
	bodyHome: {
		color: primary,
		backgroundColor: '#fff',
		padding: '1px',
		width: '100vw',
		height: 'auto'
	},
	containerHome: {
		maxWidth: '960px',
		padding: '10px 24px',
		margin: { xs: '40px auto', sm: '60px auto', md: '60px auto', lg: '60px auto', xl: '60px auto' }
	},
	contentLabelHome: {
		display: 'flex',
		flexDirection: 'column',
		gap: { xs: '25px', sm: '31px', md: '31px', lg: '31px', xl: '31px' }
	},
	mainLabelHome: {
		color: primary,
		fontFamily: '"Roboto", sans-serif',
		fontWeight: 'bold',
		fontSize: { xs: '45px', sm: '60px', md: '60px', lg: '60px', xl: '60px' }
	},
	descriptionLabelHome: {
		fontFamily: '"Roboto", sans-serif',
		fontSize: '18px'
	},
	contentListHome: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: { xs: '45px', sm: '74px', md: '74px', lg: '74px', xl: '74px' }
	},
	subLabelHome: {
		color: primary,
		fontFamily: '"Roboto", sans-serif',
		fontWeight: 'bold',
		fontSize: '22px',
		marginBottom: '10px'
	},
	contentRouterNext: {
		position: 'absolute',
		bottom: '50px',
		left: '50%',
		transform: 'translateX(-50%)'
	},
	routerNext: {
		textTransform: 'none',
		textAlign: 'center',
		fontSize: '18px',
		backgroundColor: '#C4C4C4',
		color: primary,
		borderRadius: '30px',
		height: '50px',
		padding: '10px 30px',
		marginTop: '30px',
		'&: hover': {
			backgroundColor: '#979797'
		},
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
	}
};

export { homeStyles };
