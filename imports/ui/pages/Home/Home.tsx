import React, { useEffect, useContext } from 'react';
import { homeStyles } from './HomeStyle';
import { NavigateFunction } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Loading } from '../../components/Loading/Loading';
import { ListTask } from '/imports/modules/task/ui/components/listTask';
import { useTracker } from 'meteor/react-meteor-data';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { taskApi } from '/imports/modules/task/api/taskApi';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';

interface IHome {
	user: IUserProfile;
	showNotification: (options?: Object | undefined) => void;
	showDeleteDialog: (title: string, message: string, doc: Object, remove: (doc: any) => void) => void;
	navigate: NavigateFunction;
	showDrawer: (options?: Object) => void;
}

export default function Home({ user, showNotification, showDeleteDialog, navigate, showDrawer }: IHome) {
	const { handleExibirHeaderBar } = useContext(FixedMenuLayoutContext);

	useEffect(() => {
		handleExibirHeaderBar();
		const subTasks = taskApi.subscribe('getTaskToHome');
		return () => {
			subTasks?.stop();
		};
	}, []);

	const tasks = useTracker(() => taskApi.find({}, { sort: { lastupdate: -1 } }).fetch());

	console.log('user front ===', user);

	if (!user || !tasks) {
		return <Loading />;
	}

	return (
		<Box component="div" sx={{ ...homeStyles.bodyHome }}>
			<Box component="div" sx={{ ...homeStyles.containerHome }}>
				<Box component="div" sx={{ ...homeStyles.contentLabelHome }}>
					<Typography sx={{ ...homeStyles.mainLabelHome }}>Olá, {user?.username}</Typography>
					<Typography sx={{ ...homeStyles.descriptionLabelHome }}>
						Seus projetos muito mais organizados. Veja as taefas adicionadas por seu time, por você e para você!
					</Typography>
				</Box>
				<Box component="div" sx={{ ...homeStyles.contentListHome }}>
					<Typography sx={{ ...homeStyles.subLabelHome }}>Adicionadas Recentemente</Typography>
					<Divider />
					{tasks.length === 0 ? (
						<Typography sx={{ ...homeStyles.descriptionLabelHome, marginTop: '1rem' }}>
							<Divider sx={{ marginBottom: '20px' }} />
							Não há nenhuma tarefa adicionada recentemente.
						</Typography>
					) : (
						<ListTask
							user={user}
							tasks={tasks}
							showNotification={showNotification}
							showDrawer={showDrawer}
							showDeleteDialog={showDeleteDialog}
						/>
					)}
				</Box>
			</Box>
			<Box component="div" sx={{ ...homeStyles.contentRouterNext }}>
				<Button
					sx={{ ...homeStyles.routerNext }}
					endIcon={<KeyboardDoubleArrowRightIcon fontSize="large" />}
					onClick={() => navigate('/task')}>
					Ir para Tarefas
				</Button>
			</Box>
		</Box>
	);
}
