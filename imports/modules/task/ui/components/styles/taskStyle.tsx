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

const taskStyles = {
	containerTask: {
		'&: hover': {
			backgroundColor: '#f3f3f3'
		}
	},
	labelTask: {
		whiteSpace: 'nowrap',
		color: '#000',
		backgorundColor: "yellow",
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		width: {
			xs: '150px',
			sm: '400px',
			md: '680px',
			lg: '720px',
			xl: '720px'
		},
		fontSize: {
			xs: '18px',
			sm: '21px',
			md: '21px',
			lg: '21px',
			xl: '21px'
		},
		'&: hover': {
			cursor: 'pointer'
		}
	},
	subLabelTask: {
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		width: {
			xs: '150px',
			sm: '400px',
			md: '680px',
			lg: '720px',
			xl: '720px'
		},
		color: '#999999',
		fontSize: '16px',
		whiteSpace: 'nowrap'
	},
	userNameTask: {
		textDecoration: 'underline'
	},
	completedTask: {
		textDecoration: 'line-through'
	},
	buttonTask: {
		cursor: 'pointer'
	}
};

export { taskStyles };
