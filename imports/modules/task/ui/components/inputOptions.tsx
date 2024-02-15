import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { taskApi } from '/imports/modules/task/api/taskApi';
import Box from '@mui/material/Box';
import { ITask } from '../../api/taskSch';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { isMobile } from '/imports/libs/deviceVerify';

interface IInputOptions {
	task: ITask;
	user: IUserProfile;
	showDrawer: (options?: Object) => void;
	showNotification: (options?: Object | undefined) => void;
	showDeleteDialog: (title: string, message: string, doc: Object, remove: (doc: any) => void) => void;
}

export function InputOptions({ showDrawer, showDeleteDialog, showNotification, user, task }: IInputOptions) {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const removeTask = (doc: ITask) => {
		taskApi.removeTask(doc, (e: IMeteorError) => {
			if (e) {
				console.log('Error:', e);
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Operação não realizada!',
						description: `Erro ao remover a tarefa ${task.title}: ${e.reason}`
					});
			}
		});
	};

	return (
		<Box component="div" sx={{ paddingLeft: { xs: '20px' } }}>
			<IconButton
				color="primary"
				aria-label="options"
				aria-controls="options-menu"
				aria-haspopup="true"
				onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu id="options-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={() => handleEditTask(task)}>Editar</MenuItem>
				<MenuItem onClick={() => handleRemoveTask(task)}>Remover</MenuItem>
			</Menu>
		</Box>
	);

	function handleEditTask(doc: ITask) {
		handleClose();
		if (doc.createdby !== user._id) {
			showNotification &&
				showNotification({
					type: 'warning',
					title: 'Operação não realizada!',
					description: `Apenas o dono da tarefa pode edita-la.`
				});
			return;
		}

		if (doc.status === true) {
			showNotification &&
				showNotification({
					type: 'warning',
					title: 'A tarefa está concluída',
					description: `É preciso reabrir a tarefa para poder edita-la.`
				});
			return;
		}

		if (isMobile) {
			navigate(`/task/edit/${doc._id}`);
		} else {
			showDrawer && showDrawer({ url: `/task/edit/${doc._id}` });
		}
	}

	function handleRemoveTask(doc: ITask) {
		handleClose();
		console.log(doc.createdby !== user._id);
		if (doc.createdby !== user._id) {
			showNotification &&
				showNotification({
					type: 'warning',
					title: 'Operação não realizada!',
					description: `Apenas o dono da tarefa pode removê-la.`
				});

			return;
		}
		showDeleteDialog && showDeleteDialog('Remover tarefa', `Deseja remover a tarefa ${doc.title}?`, doc, removeTask);
	}
}
