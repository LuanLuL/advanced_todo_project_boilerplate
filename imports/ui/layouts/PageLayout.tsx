import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';

export interface IPageLayout {
	title: string;
	children?: React.ReactNode;
	actions?: React.ReactNode[];
	hiddenTitleBar?: boolean;
	navigate?: { goBack: () => void };
	onBack?: () => void;
}

export const PageLayout = (props: IPageLayout) => {
	const { title, children, actions, hiddenTitleBar, navigate, onBack } = props;

	const theme = useTheme();

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				overflowX: 'hidden',
				maxHeight: '100%',
				padding: 0
			}}>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					paddingBottom: hiddenTitleBar ? 60 : undefined,
					overflowX: 'hidden',
					overflowY: 'auto',
					maxHeight: '100%',
					position: 'relative',
					padding: 0
				}}>
				{children}
			</Box>
		</Box>
	);
};
