import React, { useState, useEffect, useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { homeStyles } from '../../../../ui/pages/Home/HomeStyle';
import { taskApi } from '../../api/taskApi';
import { ListTask } from '/imports/modules/task/ui/components/listTask';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ReactiveVar } from 'meteor/reactive-var';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { myTasksStyle } from '../pages/style/taskListStyle';
import { IDefaultListProps } from '/imports/typings/BoilerplateDefaultTypings';
import { ITask } from '../../api/taskSch';
import { IConfigList } from '/imports/typings/IFilterProperties';
import { showLoading } from '/imports/ui/components/Loading/Loading';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

interface ISearchTasks extends IDefaultListProps {
	tasks: ITask[];
	user: IUserProfile;
	showNotification: (options?: Object | undefined) => void;
	showDeleteDialog: (title: string, message: string, doc: Object, remove: (doc: any) => void) => void;
	showDrawer: (options?: Object | undefined) => void;
	tasksLength: number;
}

const SearchComponent = (props: ISearchTasks) => {
	const { tasks, navigate, showDeleteDialog, user, showNotification, showDrawer, setPage, tasksLength } = props;

	const handleChangePageCompletedTasks = (newPage: number) => {
		setPage(newPage, true);
	};

	return (
		<Box
			component="div"
			sx={{
				...myTasksStyle.boxMyTasks
			}}>
			<Box component="div" sx={{ ...myTasksStyle.titleMyTasks, cursor: 'auto' }}>
				<KeyboardArrowDownIcon fontSize="large" />
				<Typography sx={{ ...myTasksStyle.labelTitleMyTasks }}>Resultados ({tasksLength})</Typography>
			</Box>
			<Divider />
			{tasksLength === 0 ? (
				<Typography sx={{ ...homeStyles.descriptionLabelHome, marginTop: '1rem', marginLeft: '20px' }}>
					Não foi encontrada nenhuma tarefa com este título.
				</Typography>
			) : (
				<Box
					component="div"
					sx={{
						...myTasksStyle.openList,
						height: `calc((83.5px * ${tasks.length}) + ${Math.ceil(tasksLength / 4) <= 1 ? '0px' : '62px'})`
					}}>
					<ListTask
						user={user}
						tasks={tasks}
						showDeleteDialog={showDeleteDialog}
						showDrawer={showDrawer}
						showNotification={showNotification}
					/>
					{Math.ceil(tasksLength / 4) <= 1 ? (
						<></>
					) : (
						<Box sx={{ ...myTasksStyle.paginationContent }}>
							<Pagination
								style={{ margin: '15px 0px' }}
								onChange={(e, p) => handleChangePageCompletedTasks(p)}
								color="primary"
								count={Math.ceil(tasksLength / 4)}
								shape="rounded"
								renderItem={(item) => (
									<PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
								)}
							/>
						</Box>
					)}
				</Box>
			)}
		</Box>
	);
};

export const searchRV = new ReactiveVar<IConfigList>({
	pageProperties: { currentPage: 1, pageSize: 4 }
});

interface IShowMethods {
	text: string;
	showNotification: (options?: Object | undefined) => void;
	showDeleteDialog: (title: string, message: string, doc: Object, remove: (doc: any) => void) => void;
	showDrawer: (options?: Object | undefined) => void;
	user: IUserProfile;
}

export const SearchTask = withTracker(
	({ text, showNotification, showDeleteDialog, showDrawer, user }: IShowMethods) => {
		const configSearch = searchRV.get();

		const subHandle = taskApi.subscribe('getAllTasks');
		const tasks = subHandle?.ready()
			? taskApi
					.find(
						{ 'title': { $regex: new RegExp(text, 'i') } },
						{
							sort: {
								createdat: -1
							},
							limit: configSearch.pageProperties.pageSize,
							skip: (configSearch.pageProperties.currentPage - 1) * configSearch.pageProperties.pageSize
						}
					)
					.fetch()
			: [];

		const tasksLength = subHandle?.ready()
			? taskApi.find({ 'title': { $regex: new RegExp(text, 'i') } }).fetch().length
			: 0;

		return {
			showNotification,
			showDeleteDialog,
			showDrawer,
			user,
			tasks,
			tasksLength: tasksLength,
			loading: !!subHandle && !subHandle.ready(),
			setPage: (page = 1, completed: boolean) => {
				configSearch.pageProperties.currentPage = page;
				searchRV.set(configSearch);
			}
		};
	}
)(showLoading(SearchComponent));
