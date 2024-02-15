import React, { useState, useEffect, useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { taskApi } from '../../api/taskApi';
import { ListTask } from '/imports/modules/task/ui/components/listTask';
import Pagination from '@mui/material/Pagination';
import { isMobile } from '/imports/libs/deviceVerify';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ReactiveVar } from 'meteor/reactive-var';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { myTasksStyle } from './style/taskListStyle';
import { nanoid } from 'nanoid';
import { IDefaultContainerProps, IDefaultListProps } from '/imports/typings/BoilerplateDefaultTypings';
import { ITask } from '../../api/taskSch';
import { FixedMenuLayoutContext } from '../../../../ui/layouts/FixedMenuLayout';
import { IConfigList } from '/imports/typings/IFilterProperties';
import { showLoading } from '/imports/ui/components/Loading/Loading';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { SearchTask } from '../components/searchTask';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import { useNavigate } from 'react-router-dom';

interface ITaskList extends IDefaultListProps {
	tasksCompleted: ITask[];
	tasksNotCompleted: ITask[];
	user: IUserProfile;
	showNotification: (options?: Object | undefined) => void;
	showDeleteDialog: (title: string, message: string, doc: Object, remove: (doc: any) => void) => void;
	showDrawer: (options?: Object | undefined) => void;
}

const TaskList = (props: ITaskList) => {
	const {
		tasksCompleted,
		tasksNotCompleted,
		showDeleteDialog,
		user,
		showNotification,
		showDrawer,
		setPage,
		tasksCompletedLength,
		tasksNotCompletedLength
	} = props;

	const { handleOcultarAppBar, handleExibirHeaderBar } = useContext(FixedMenuLayoutContext);

	const navigate = useNavigate();

	useEffect(() => {
		handleExibirHeaderBar('/');
		return () => {
			handleOcultarAppBar();
			handleExibirHeaderBar();
		};
	}, []);

	const [text, setText] = React.useState<string>('');

	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const [openNotCompletedTasks, setOpenNotCompletedTasks] = useState<boolean>(true);
	const [openCompletedTasks, setOpenCompletedTasks] = useState<boolean>(true);

	const idTask = nanoid();

	const handleChangePageNotCompletedTasks = (newPage: number) => {
		console.log(newPage);
		setPage(newPage, false);
	};

	const handleChangePageCompletedTasks = (newPage: number) => {
		console.log(newPage);
		setPage(newPage, true);
	};

	return (
		<Box component="div" sx={{ ...myTasksStyle.bodyMyTasks }}>
			<Box component="div" sx={{ ...myTasksStyle.containerMyTasks }}>
				<Box component="div" sx={{ ...myTasksStyle.contentSearch }}>
					<TextField
						name={'pesquisar'}
						label={'Pesquisar'}
						value={text}
						onChange={change}
						//onKeyPress={keyPress}
						placeholder="Pesquisar tarefas..."
						//action={{ icon: 'search', onClick: click }}
					/>
				</Box>
				{text.trim() !== '' ? (
					<SearchTask
						text={text}
						showNotification={showNotification}
						showDeleteDialog={showDeleteDialog}
						showDrawer={showDrawer}
						user={user}
					/>
				) : (
					<>
						<Box
							component="div"
							sx={{
								...myTasksStyle.boxMyTasks
							}}>
							<Box
								component="div"
								sx={{
									...myTasksStyle.titleMyTasks
								}}
								onClick={() => toggleBoxNotCompletedTasks()}>
								{openNotCompletedTasks ? (
									<KeyboardArrowUpIcon fontSize="large" />
								) : (
									<KeyboardArrowDownIcon fontSize="large" />
								)}
								<Typography sx={{ ...myTasksStyle.labelTitleMyTasks }}>
									Não Concluídas ({tasksNotCompletedLength})
								</Typography>
							</Box>
							<Divider />
							<Box
								component="div"
								sx={{
									...(openNotCompletedTasks ? myTasksStyle.openList : myTasksStyle.closeList),
									height: openNotCompletedTasks
										? `calc((83.5px * ${tasksNotCompleted.length}) + ${Math.ceil(tasksNotCompletedLength / 4) <= 1 ? '0px' : '62px'})`
										: '0px'
								}}>
								<ListTask
									user={user}
									tasks={tasksNotCompleted}
									showDeleteDialog={showDeleteDialog}
									showDrawer={showDrawer}
									showNotification={showNotification}
								/>
								{Math.ceil(tasksNotCompletedLength / 4) <= 1 ? (
									<></>
								) : (
									<Box sx={{ ...myTasksStyle.paginationContent }}>
										<Pagination
											style={{ margin: '15px 0px' }}
											onChange={(e, p) => handleChangePageNotCompletedTasks(p)}
											color="primary"
											count={Math.ceil(tasksNotCompletedLength / 4)}
											shape="rounded"
											renderItem={(item) => (
												<PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
											)}
										/>
									</Box>
								)}
							</Box>
						</Box>
						<Box
							component="div"
							sx={{
								...myTasksStyle.boxMyTasks
							}}>
							<Box component="div" sx={{ ...myTasksStyle.titleMyTasks }} onClick={() => toggleBoxCompletedTasks()}>
								{openCompletedTasks ? (
									<KeyboardArrowUpIcon fontSize="large" />
								) : (
									<KeyboardArrowDownIcon fontSize="large" />
								)}
								<Typography sx={{ ...myTasksStyle.labelTitleMyTasks }}>Concluídas ({tasksCompletedLength})</Typography>
							</Box>
							<Divider />
							<Box
								component="div"
								sx={{
									...(openCompletedTasks ? myTasksStyle.openList : myTasksStyle.closeList),
									height: openCompletedTasks
										? `calc((83.5px * ${tasksCompleted.length}) + ${Math.ceil(tasksCompletedLength / 4) <= 1 ? '0px' : '62px'})`
										: '0px'
								}}>
								<ListTask
									user={user}
									tasks={tasksCompleted}
									showDeleteDialog={showDeleteDialog}
									showDrawer={showDrawer}
									showNotification={showNotification}
								/>
								{Math.ceil(tasksCompletedLength / 4) <= 1 ? (
									<></>
								) : (
									<Box sx={{ ...myTasksStyle.paginationContent }}>
										<Pagination
											style={{ margin: '15px 0px' }}
											onChange={(e, p) => handleChangePageCompletedTasks(p)}
											color="primary"
											count={Math.ceil(tasksCompletedLength / 4)}
											shape="rounded"
											renderItem={(item) => (
												<PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
											)}
										/>
									</Box>
								)}
							</Box>
						</Box>
					</>
				)}
				<Box component="div" sx={{ ...myTasksStyle.contentRouterAddTask }}>
					<Button
						sx={{ ...myTasksStyle.routerAddTask }}
						startIcon={<AddIcon fontSize="large" />}
						onClick={() => goToAdd()}>
						{'Adicionar'}
					</Button>
				</Box>
			</Box>
		</Box>
	);

	function toggleBoxCompletedTasks() {
		setOpenCompletedTasks(!openCompletedTasks);
	}

	function toggleBoxNotCompletedTasks() {
		setOpenNotCompletedTasks(!openNotCompletedTasks);
	}

	function goToAdd() {
		if (isMobile) {
			navigate(`/task/create/${idTask}`);
		} else {
			showDrawer && showDrawer({ url: `/task/create/${idTask}` });
		}
	}
};

export const pageTasksCompleted = new ReactiveVar<IConfigList>({
	pageProperties: { currentPage: 1, pageSize: 4 }
});

export const pageTasksNotCompleted = new ReactiveVar<IConfigList>({
	pageProperties: { currentPage: 1, pageSize: 4 }
});

export const TaskListContainer = withTracker((props: IDefaultContainerProps) => {
	const configCompletedTasks = pageTasksCompleted.get();
	const configNotCompletedTasks = pageTasksNotCompleted.get();

	const subHandleCompletedTasks = taskApi.subscribe('getTaskCompleted');
	const tasksCompleted = subHandleCompletedTasks?.ready()
		? taskApi
				.find(
					{ status: true },
					{
						sort: {
							createdat: -1
						},
						limit: configCompletedTasks.pageProperties.pageSize,
						skip: (configCompletedTasks.pageProperties.currentPage - 1) * configCompletedTasks.pageProperties.pageSize
					}
				)
				.fetch()
		: [];
	const tasksCompletedLength = subHandleCompletedTasks?.ready() ? taskApi.find({ status: true }).fetch().length : [];

	const subHandleNotCompletedTasks = taskApi.subscribe('getTaskNotCompleted');
	const tasksNotCompleted = subHandleNotCompletedTasks?.ready()
		? taskApi
				.find(
					{ status: false },
					{
						sort: {
							createdat: -1
						},
						limit: configNotCompletedTasks.pageProperties.pageSize,
						skip:
							(configNotCompletedTasks.pageProperties.currentPage - 1) * configNotCompletedTasks.pageProperties.pageSize
					}
				)
				.fetch()
		: [];
	const tasksNotCompletedLength = subHandleNotCompletedTasks?.ready()
		? taskApi.find({ status: false }).fetch().length
		: 0;

	return {
		tasksCompleted,
		tasksNotCompleted,
		tasksCompletedLength: tasksCompletedLength,
		tasksNotCompletedLength: tasksNotCompletedLength,
		loading:
			!!subHandleNotCompletedTasks &&
			!subHandleNotCompletedTasks.ready() &&
			!!subHandleCompletedTasks &&
			!subHandleCompletedTasks.ready(),
		setPage: (page = 1, completed: boolean) => {
			if (completed) {
				configCompletedTasks.pageProperties.currentPage = page;
				pageTasksCompleted.set(configCompletedTasks);
			} else {
				configNotCompletedTasks.pageProperties.currentPage = page;
				pageTasksNotCompleted.set(configNotCompletedTasks);
			}
		}
	};
})(showLoading(TaskList));
