import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Task } from './task';
import { ITask } from '../../api/taskSch';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { IDefaultListProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';

interface TypeListTask {
	tasks: ITask[];
	user: IUserProfile;
	showNotification: (options?: Object | undefined) => void;
	showDeleteDialog: (title: string, message: string, doc: Object, remove: (doc: any) => void) => void;
	showDrawer: (options?: Object) => void;
}

export function ListTask({ tasks, user, showNotification, showDeleteDialog, showDrawer }: TypeListTask) {
	return (
		<List>
			{tasks.map((task) => (
				<>
					<Task
						key={'KEYLIST' + task._id}
						task={task}
						user={user}
						showDeleteDialog={showDeleteDialog}
						showNotification={showNotification}
						showDrawer={showDrawer}
					/>
					<Divider component="li" />
				</>
			))}
		</List>
	);
}
