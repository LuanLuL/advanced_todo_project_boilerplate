import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Container, Menu, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { DayNightToggle } from './DayNightToggle';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { appTopMenuStyle } from './AppTopMenuStyle';
import { isMobile } from '/imports/libs/deviceVerify';

interface IAppTopMenu extends ILayoutProps {
	activeGoBack: string | undefined;
}

export const AppTopMenu = (props: IAppTopMenu) => {
	const { user, showDrawer, showWindow, theme, themeOptions } = props;

	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<Object | null>(null);
	const open = Boolean(anchorEl);

	const openPage = (url: string) => () => {
		handleClose();
		navigate(url);
	};

	const viewProfile = () => {
		handleClose();
		if (isMobile) {
			navigate(`/userprofile/view/${user._id}`);
		} else {
			showDrawer && showDrawer({ url: `/userprofile/view/${user._id}` });
		}
	};

	const handleMenu = (event: React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={appTopMenuStyle.mainContainer}>
			<Container sx={appTopMenuStyle.contentTopMenu}>
				<Box sx={appTopMenuStyle.boxTitleContentTopMenu}>
					{props.activeGoBack !== undefined ? (
						<ArrowBackIcon
							onClick={() => {
								navigate(`${props.activeGoBack}`);
							}}
							sx={{
								...appTopMenuStyle.buttonTitleContentTopMenu
							}}
						/>
					) : (
						<></>
					)}
					<Typography sx={appTopMenuStyle.titleContentTopMenu}>ToDo List</Typography>
				</Box>
				<Button
					aria-label="account of current user"
					aria-controls="menu-appbar"
					onClick={handleMenu}
					id="Perfil"
					sx={{
						'&:hover': {
							color: '#979797',
							backgroundColor: 'transparent'
						},
						'&:active': {
							color: 'transparent'
						}
					}}>
					<PersonIcon fontSize="large" id="Perfil" name="Perfil" style={appTopMenuStyle.accountCircle} />
					<ArrowDropDownIcon
						style={{
							color: 'rgba(0, 0, 0, 0.6)',
							width: 20
						}}
					/>
				</Button>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl as Element}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={open}
					onClose={handleClose}>
					{!user || !user._id
						? [
								<MenuItem sx={appTopMenuStyle.optionsAccountCircle} key={'signin'} onClick={openPage('/signin')}>
									Entrar
								</MenuItem>
							]
						: [
								<MenuItem sx={appTopMenuStyle.optionsAccountCircle} key={'userprofile'} onClick={viewProfile}>
									{user.username || 'Editar'}
								</MenuItem>,
								<MenuItem sx={appTopMenuStyle.optionsAccountCircle} key={'signout'} onClick={openPage('/signout')}>
									<ExitToAppIcon fontSize="small" /> Sair
								</MenuItem>
							]}
				</Menu>
			</Container>
		</Box>
	);
};
