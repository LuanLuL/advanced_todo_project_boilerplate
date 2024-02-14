import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modules from '../../modules';
import { isMobile } from '/imports/libs/deviceVerify';
import AppBar from '@mui/material/AppBar';
import { fixedMenuLayoutStyle } from './FixedMenuLayoutStyle';
import Toolbar from '@mui/material/Toolbar';
import { IAppMenu } from '/imports/modules/modulesTypings';
import { FormControlLabel, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import Box from '@mui/material/Box';
import { appNavBarStyles } from './AppNavBarStyle';

interface IAppNavBar extends ILayoutProps {}

export const AppNavBar = (props: IAppNavBar) => {
	const navigate = useNavigate();
	const location = useLocation();

	const { user, theme, themeOptions } = props;

	const pathIndex = (Modules.getAppMenuItemList() || [])
		.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
		.findIndex(
			(menuData) =>
				(menuData?.path === '/' && location.pathname === '/') ||
				(menuData?.path !== '/' && location && location.pathname.indexOf(menuData?.path as string) === 0)
		);
	if (isMobile) {
		return (
			<Box
				sx={{
					minHeight: 55,
					width: '100%',
					backgroundColor: theme.palette.primary.main
				}}>
				<FormControlLabel
					control={
						<Switch
							color={'secondary'}
							value={themeOptions?.isDarkThemeMode}
							onChange={(evt) => themeOptions?.setDarkThemeMode(evt.target.checked)}
						/>
					}
					label="DarkMode"
				/>
				<Box sx={{ width: '100%' }}>
					{(Modules.getAppMenuItemList() || [])
						.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
						.map((menuData, menuIndex) => (
							<Button key={menuData?.path} onClick={() => navigate(menuData?.path as string)}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: isMobile ? 'column' : 'row',
										alignItems: 'center',
										justifyContent: 'center',
										paddingTop: 10
									}}>
									{menuData?.icon ? menuData?.icon : null}
								</Box>
							</Button>
						))}
				</Box>
			</Box>
		);
	}

	return (
		<AppBar position="static" enableColorOnDark>
			<Toolbar sx={fixedMenuLayoutStyle.toolbarFixedMenu}>
				{(Modules.getAppMenuItemList() || [])
					.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
					.map((menuData, ind) => (
						<Button
							variant={pathIndex !== ind ? 'outlined' : 'contained'}
							sx={{
								...appNavBarStyles.buttonMenuItem,
								borderBottom: pathIndex !== ind ? 'none' : '5px solid black'
							}}
							key={menuData?.path}
							onClick={() => navigate(menuData?.path as string)}>
							{menuData?.name}
						</Button>
					))}
			</Toolbar>
		</AppBar>
	);
};
