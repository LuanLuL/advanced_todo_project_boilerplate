import { primary, secondary } from '../../../../../materialui/styles';

export const myTasksStyle = {
	bodyMyTasks: {
		color: primary,
		backgroundColor: secondary,
		width: '100vw',
		height: 'auto',
		padding: '1px 24px'
	},
	containerMyTasks: {
		maxWidth: '1000px',
		margin: '50px auto'
	},
	contentSearch: {
		height: '100px',
		maxWidth: '600px',
		width: '100%',
		padding: '1px 24px',
		marginBottom: '2rem'
	},
	boxMyTasks: {
		width: '100%',
		marginBottom: '2rem'
	},
	titleMyTasks: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: '1rem',
		marginBottom: '1rem',
		width: '270px',
		cursor: 'pointer'
	},
	labelTitleMyTasks: {
		fontFamily: '"Roboto", sans-serif',
		fontWeight: '700',
		fontSize: '22px',
		color: primary,
		letterSpacing: '1.15px'
	},
	closeList: {
		opacity: 0,
		height: 0,
		overflow: 'hidden',
		transition: 'height 0.2s ease-out, opacity 0.3s ease-out'
	},
	openList: {
		opacity: 1,
		transition: 'height 0.2s ease-in, opacity 0.3s ease-in'
	},
	paginationContent: {
		paddingLeft: '30px',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start'
	},
	contentRouterAddTask: {
		position: 'absolute',
		bottom: '50px',
		left: '50%',
		transform: 'translateX(-50%)'
	},
	routerAddTask: {
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
