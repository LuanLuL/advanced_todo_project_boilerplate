// region Imports
import { ProductBase } from '../../../api/productBase';
import { taskSch, ITask } from './taskSch';
import { IMeteorError } from 'imports/typings/BoilerplateDefaultTypings';

class TaskApi extends ProductBase<ITask> {
	constructor() {
		super('task', taskSch, {
			enableCallMethodObserver: true,
			enableSubscribeObserver: true
		});
	}

	updateTask(task: ITask, callback = (e: IMeteorError, r: any) => {}) {
		return this.callMethod('updateTask', task, callback);
	}

	removeTask(task: ITask, callback = (e: IMeteorError, r: any) => {}) {
		return this.callMethod('removeTask', task, callback);
	}
}

export const taskApi = new TaskApi();
