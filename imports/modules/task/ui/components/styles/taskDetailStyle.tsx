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
import { primary, secondary } from '../../../../../materialui/styles';

const maxWidthSize = 600;

const taskDetailStyles = {
	containerTaskDetail: {
		display: 'flex',
		justifyContent: 'start',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		padding: '20px 10px 0px 10px'
	},
	contentLabelTaskDetail: {
		maxWidth: maxWidthSize,
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '30px'
	},
	groupTitle: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '10px'
	},
	labelTaskDetail: {
		whiteSpace: 'nowrap',
		width: '200px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		color: '#000',
		fontSize: '22px',
		fontWeight: '400',
		fontFamily: '"Roboto", sans-serif',
		letterSpacing: '1.15px'
	},
	formTaskDetail: {
		textAlign: 'center',
		width: '100%',
		maxWidth: maxWidthSize
	},
	inputTaskDetail: {
		marginBottom: '20px'
	},
	contentButton: {
		display: 'flex',
		justifyContent: 'center',
		alginItems: 'center',
		width: '100%'
	},
	buttonTaskDetail: {
		textTransform: 'none',
		textAlign: 'center',
		fontSize: '18px',
		backgroundColor: '#C4C4C4',
		color: primary,
		borderRadius: '30px',
		height: '40px',
		padding: '10px 30px',
		marginTop: '0.5rem',
		'&: hover': {
			backgroundColor: '#979797'
		},
		marginBottom: '20px'
	},
	descriptionTitle: {
		textTransform: 'none',
		textAlign: 'left',
		fontWight: '700',
		fontSize: '14px',
		color: primary,
		fontFamily: '"Roboto", sans-serif',
		lineHeight: '16.41px'
	},
	descriptionLabel: {
		textTransform: 'none',
		textAlign: 'left',
		fontSize: '18px',
		padding: '2px 0px 16px 0px',
		fontFamily: '"Roboto", sans-serif',
		marginTop: '0.5rem'
	},
	finalContent: {
		textAlign: 'right',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0px 15px'
	}
};

export { taskDetailStyles };
