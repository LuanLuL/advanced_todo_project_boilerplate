import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { taskStyles } from './styles/taskStyle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { ITask } from '../../api/taskSch';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { taskApi } from '/imports/modules/task/api/taskApi';
import { InputOptions } from './inputOptions';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

interface TypeTask {
	task: ITask;
	user: IUserProfile;
	showNotification: (options?: Object | undefined) => void;
	showDeleteDialog: (title: string, message: string, doc: Object, remove: (doc: any) => void) => void;
	showDrawer: (options?: Object) => void;
}

export function Task({ task, user, showNotification, showDeleteDialog, showDrawer }: TypeTask) {
	return (
		<ListItem
			sx={{ ...taskStyles.containerTask }}
			key={'KEY' + task._id}
			secondaryAction={
				<InputOptions task={task} user={user} showNotification={showNotification} showDeleteDialog={showDeleteDialog} />
			}>
			<ListItemAvatar key={task._id}>
				{task.status ? (
					<CheckCircleOutlineIcon
						fontSize="large"
						sx={{ ...taskStyles.buttonTask }}
						color="primary"
						onClick={() => toggleStatusTask()}
					/>
				) : (
					<RadioButtonUncheckedIcon
						fontSize="large"
						sx={{ ...taskStyles.buttonTask }}
						color="primary"
						onClick={() => toggleStatusTask()}
					/>
				)}
			</ListItemAvatar>
			<ListItemText
				key={'KEYTEXT' + task._id}
				color="white"
				primary={
					<Typography
						onClick={() => {
							showDrawer && showDrawer({ url: `/task/view/${task._id}` });
						}}
						component="p"
						sx={{
							...taskStyles.labelTask,
							...(task.status ? taskStyles.completedTask : {})
						}}>
						{task.title}
					</Typography>
				}
				primaryTypographyProps={{
					width: {
						xs: 140,
						sm: 230,
						md: 180,
						lg: 400,
						xl: 400
					},
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap'
				}}
				secondaryTypographyProps={{
					width: {
						xs: 140,
						sm: 230,
						md: 180,
						lg: 400,
						xl: 400
					},
					color: 'white',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap'
				}}
				secondary={
					<Typography component="p" sx={{ ...taskStyles.subLabelTask }}>
						Criada por:{' '}
						<Typography component="span" sx={{ ...taskStyles.subLabelTask, ...taskStyles.userNameTask }}>
							{task.createdby === user?._id ? 'Você' : task.username}
						</Typography>
					</Typography>
				}
			/>
		</ListItem>
	);

	function toggleStatusTask() {
		if (task.createdby === user?._id) {
			task.status = !task.status;
			taskApi.update(task, (e: IMeteorError) => {
				if (e) {
					console.log('Error:', e);
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Operação não realizada!',
							description: `Erro ao ${task.status ? 'concluir' : 'reabrir'} a tarefa ${task.title}: ${e.reason}`
						});
					task.status = !task.status;
				}
			});
		} else {
			showNotification &&
				showNotification({
					type: 'warning',
					title: 'Operação não realizada!',
					description: `Apenas o dono da tarefa pode ${task.status ? 'reabri-la' : 'concluí-la'}.`
				});
		}
	}
}
