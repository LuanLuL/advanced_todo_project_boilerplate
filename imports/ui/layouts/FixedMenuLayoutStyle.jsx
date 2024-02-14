const fixedMenuLayoutStyle = {
	containerFixedMenuRouter: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		overflowY: 'auto',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		margin: 0
	},
	containerHomeIconButton: {
		display: 'flex',
		alignItems: 'center'
	},
	routerSwitch: {
		width: '100%',
		height: 'calc(100% - 48px)',
		overflowY: 'auto',
		overflowX: 'hidden'
	},
	homeIconButton: {
		maxHeight: 50,
		maxWidth: 80,
		width: '80px',
		height: '50px',
		margin: '4.8px 0 4.4px 27px',
		objectFit: 'contain'
	},
	toolbarFixedMenu: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'end',
		margin: '0px 40px',
		padding: '0px 24px',
		gap: 8,
		height: 75,
		maxHeight: 75
	},
	containerAppRouter: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		overflowY: 'auto',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		margin: 0
	}
};

export { fixedMenuLayoutStyle };
