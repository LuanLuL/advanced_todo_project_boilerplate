import React, { useState, useEffect, useContext } from 'react';
import { isMobile } from '/imports/libs/deviceVerify';
import { FixedMenuLayoutContext } from '../../../../ui/layouts/FixedMenuLayout';
import { withTracker } from 'meteor/react-meteor-data';
import { taskApi } from '../../api/taskApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import { ITask, taskSch } from '../../api/taskSch';
import { IDefaultContainerProps, IDefaultDetailProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { Loading, showLoading } from '/imports/ui/components/Loading/Loading';
import Close from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { taskDetailStyles } from '../components/styles/taskDetailStyle';
import { showNotification } from '/imports/ui/GeneralComponents/ShowNotification';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { taskStyles } from '../components/styles/taskStyle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { SwitchField } from '/imports/ui/components/SimpleFormFields/SwitchField/SwitchField';
import SelectField from '/imports/ui/components/SimpleFormFields/SelectField/SelectField';

interface ITaskDetail extends IDefaultDetailProps {
	taskDoc: ITask;
	user: IUserProfile;
	save: (doc: ITask, _callback?: any) => void;
	closeComponent: () => void;
}

const TaskDetail = (props: ITaskDetail) => {
	const { screenState, loading, taskDoc, save, closeComponent, navigate, user } = props;

	if (!user) {
		return <Loading />;
	}

	const toggleIsMobile = !isMobile;

	const { handleExibirHeaderBar } = useContext(FixedMenuLayoutContext);

	useEffect(() => {
		if (isMobile) {
			handleExibirHeaderBar('/task');
		}
		return;
	}, [isMobile]);

	const handleSubmit = (doc: ITask) => {
		save(doc);
	};

	if (screenState === 'view') {
		return (
			<Box component="div" sx={{ ...taskDetailStyles.containerTaskDetail }}>
				<Box component="div" sx={{ ...taskDetailStyles.contentLabelTaskDetail }}>
					<Box component="div" sx={{ ...taskDetailStyles.groupTitle }}>
						{taskDoc.status ? (
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
						<Typography
							sx={{ ...taskDetailStyles.labelTaskDetail, ...(taskDoc.status ? taskStyles.completedTask : {}) }}>
							{taskDoc.title}
						</Typography>
					</Box>
					{toggleIsMobile && (
						<IconButton
							onClick={() => {
								closeComponent();
							}}>
							<Close color="primary" />
						</IconButton>
					)}
				</Box>
				<Box component="div" sx={{ ...taskDetailStyles.formTaskDetail }}>
					<Typography sx={{ ...taskDetailStyles.descriptionTitle }}>{'Descrição'}</Typography>
					<Typography sx={{ ...taskDetailStyles.descriptionLabel }}>{taskDoc.description}</Typography>
					<Typography sx={{ ...taskDetailStyles.descriptionTitle }}>{'Tipo'}</Typography>
					<Typography sx={{ ...taskDetailStyles.descriptionLabel }}>{taskDoc.category}</Typography>

					<Box component="div" sx={{ ...taskDetailStyles.contentButton }}>
						{taskDoc.createdby !== user._id ? (
							<></>
						) : (
							<Button
								id="submit"
								sx={{ ...taskDetailStyles.buttonTaskDetail }}
								onClick={() => {
									if (taskDoc.status === true) {
										showNotification &&
											showNotification({
												type: 'warning',
												title: 'A tarefa está concluída',
												description: `É preciso reabrir a tarefa para poder edita-la.`
											});
										return;
									}
									navigate(`/task/edit/${taskDoc._id}`);
								}}>
								Editar
							</Button>
						)}
					</Box>
					<Box sx={{ ...taskDetailStyles.finalContent }}>
						<Typography component="p" sx={{ ...taskDetailStyles.subLabelTask }}>
							Criada por:{' '}
							<Typography component="span" sx={{ ...taskDetailStyles.subLabelTask, ...taskStyles.userNameTask }}>
								{taskDoc.createdby === user?._id ? 'Você' : taskDoc.username}
							</Typography>
						</Typography>
					</Box>
				</Box>
			</Box>
		);
	}

	return (
		<Box component="div" sx={{ ...taskDetailStyles.containerTaskDetail }}>
			<Box component="div" sx={{ ...taskDetailStyles.contentLabelTaskDetail }}>
				<Typography sx={{ ...taskDetailStyles.labelTaskDetail }}>
					{screenState === 'edit' ? 'Editar Tarefa' : 'Adicionar Tarefa'}
				</Typography>
				{toggleIsMobile && (
					<IconButton
						onClick={() => {
							closeComponent();
						}}>
						<Close color="primary" />
					</IconButton>
				)}
			</Box>
			<Box component="div" sx={{ ...taskDetailStyles.formTaskDetail }}>
				<SimpleForm
					key={'Task-SimpleFormKEY'}
					mode={screenState}
					schema={taskApi.getSchema()}
					doc={taskDoc}
					onSubmit={handleSubmit}
					loading={loading}>
					<Box>
						<TextField
							key={'tituloKEY'}
							fullWidth={true}
							placeholder="Dê um título para sua tarefa"
							name="title"
							sx={{ ...taskDetailStyles.inputTaskDetail }}
						/>
						<TextField
							multiline={true}
							rows={5}
							fullWidth={true}
							placeholder="Adicione aqui, a descrição da tarefa"
							key={'descricaoKEY'}
							name="description"
							sx={{ ...taskDetailStyles.inputTaskDetail }}
						/>
						<SwitchField key={'tipoKEY'} label="Categoria" name="category" schema={taskSch.category} />

						{/* <SelectField
							key={'tipoKEY'}
							label="Categoria"
							placeholder="Selecione um tipo"
							name="category"
							sx={{ ...taskDetailStyles.inputTaskDetail }}
						/> */}

						<Box component="div" sx={{ ...taskDetailStyles.contentButton }}>
							<Button id="submit" sx={{ ...taskDetailStyles.buttonTaskDetail }}>
								{screenState === 'edit' || screenState === 'create' ? 'Salvar' : 'Editar'}
							</Button>
						</Box>
					</Box>
				</SimpleForm>
			</Box>
		</Box>
	);

	function toggleStatusTask() {
		if (taskDoc.createdby === user?._id) {
			taskDoc.status = !taskDoc.status;
			taskApi.update(taskDoc, (e: IMeteorError) => {
				if (e) {
					console.log('Error:', e);
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Operação não realizada!',
							description: `Erro ao ${taskDoc.status ? 'concluir' : 'reabrir'} a tarefa ${taskDoc.title}: ${e.reason}`
						});
					taskDoc.status = !taskDoc.status;
				}
			});
		} else {
			showNotification &&
				showNotification({
					type: 'warning',
					title: 'Operação não realizada!',
					description: `Apenas o dono da tarefa pode ${taskDoc.status ? 'reabri-la' : 'concluí-la'}.`
				});
		}
	}
};

interface ITaskDetailContainer extends IDefaultContainerProps {}

export const TaskDetailContainer = withTracker((props: ITaskDetailContainer) => {
	const { screenState, id, navigate, showNotification, user } = props;

	const subHandle = !!id ? taskApi.subscribe('getAllTasks', { _id: id }) : null;
	const taskDoc = id && subHandle?.ready() ? taskApi.findOne({ _id: id }) : {};

	return {
		screenState,
		user,
		taskDoc,
		save: (doc: ITask, _callback: () => void) => {
			if (!doc.status) {
				doc.status = false;
				doc.username = user?.username;
			}
			const selectedAction = screenState === 'create' ? 'insert' : 'update';
			taskApi[selectedAction](doc, (e: IMeteorError, r: string) => {
				if (!e) {
					navigate(`/task/view/${screenState === 'create' ? r : doc._id}`);
					showNotification &&
						showNotification({
							type: 'success',
							title: 'Operação realizada!',
							description: `A tarefa foi ${doc._id ? 'atualizada' : 'cadastrada'} com sucesso!`
						});
				} else {
					console.log('Error:', e);
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Operação não realizada!',
							description: `Erro ao realizar a operação: ${e.reason}`
						});
				}
			});
		}
	};
})(showLoading(TaskDetail));
