import React, { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppNavBar } from './AppNavBar';
import { AppRouterSwitch } from './AppRouterSwitch';
import { IUserProfile } from '../../userprofile/api/UserProfileSch';
import { fixedMenuLayoutStyle } from './FixedMenuLayoutStyle';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import Box from '@mui/material/Box';
import { AppTopMenu } from './components/AppTopMenu';

interface FixedMenuLayoutContextType {
	handleOcultarAppBar: () => void;
	handleExibirAppBar: () => void;
	handleOcultarHeaderBar: () => void;
	handleExibirHeaderBar: (title?: string) => void;
	user: IUserProfile;
}

interface MyState {
	open: boolean;
	title?: string;
}

export const FixedMenuLayoutContext = createContext({} as FixedMenuLayoutContextType);

export const FixedMenuLayout = (props: ILayoutProps) => {
	const { isMobile, theme, user } = props;

	const [showAppBar, setShowAppBar] = useState<boolean>(true);
	const [showHeaderBar, setShowHeaderBar] = useState<MyState>({ open: true, title: undefined });

	const handleOcultarAppBar = () => {
		setShowAppBar(false);
	};

	const handleExibirAppBar = () => {
		setShowAppBar(true);
	};

	const handleOcultarHeaderBar = () => {
		setShowHeaderBar({ open: false, title: undefined });
	};

	const handleExibirHeaderBar = (title?: string) => {
		setShowHeaderBar({ open: true, title: title });
	};

	return (
		<Router>
			<FixedMenuLayoutContext.Provider
				value={{ handleOcultarAppBar, handleExibirAppBar, handleOcultarHeaderBar, handleExibirHeaderBar, user }}>
				{showHeaderBar.open && <AppTopMenu activeGoBack={showHeaderBar.title} {...props} />}
				{showAppBar && !isMobile && <AppNavBar {...props} />}
				<Box sx={fixedMenuLayoutStyle.routerSwitch}>
					<AppRouterSwitch {...props} />
				</Box>
				{showAppBar && isMobile && <AppNavBar {...props} />}
			</FixedMenuLayoutContext.Provider>
		</Router>
	);
};
