// region Imports
import { Recurso } from '../config/Recursos';
import { taskSch, ITask } from './taskSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IContext } from '/imports/typings/IContext';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
// endregion

class TaskServerApi extends ProductServerBase<ITask> {
	constructor() {
		super('task', taskSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;

		const addGenericPublication = (name: string, serverFilter: Object, serverOptions: Object) => {
			this.addTransformedPublication(
				name,
				(filter = {}, options: Object) => {
					const user = Meteor.user();

					if (!user) {
						return new Meteor.Error('Not authorized');
					}

					return this.defaultListCollectionPublication(
						{
							$or: [
								{ createdby: user._id, ...filter, ...serverFilter },
								{ category: 'Normal', ...filter, ...serverFilter }
							]
						},
						{
							projection: {
								title: 1,
								description: 1,
								createdby: 1,
								status: 1,
								lastupdate: 1,
								username: 1,
								category: 1,
								createdat: 1
							},
							...{ ...options, ...serverOptions }
						}
					);
				},
				(doc: ITask & { username: string }) => {
					const userProfileDoc = userprofileServerApi.getCollectionInstance().findOne({ _id: doc.createdby });
					return { ...doc, username: userProfileDoc?.username };
				}
			);
		};

		addGenericPublication(
			'getTaskNotCompleted',
			{ status: false },
			{
				sort: {
					lastupdate: -1
				}
			}
		);

		addGenericPublication(
			'getTaskCompleted',
			{ status: true },
			{
				sort: {
					lastupdate: -1
				}
			}
		);

		addGenericPublication(
			'getTaskToHome',
			{},
			{
				sort: {
					lastupdate: -1
				},
				limit: 5
			}
		);

		this.addPublication('getAllTasks', (filter = {}, protection = {}) => {
			return this.defaultDetailCollectionPublication(filter, protection);
		});

		function isHisTask(createdby: string | null | undefined, context: IContext) {
			return createdby === context.user._id;
		}

		this.registerMethod('updateTask', (doc: ITask | Partial<ITask>, context: IContext) => {
			try {
				check(doc._id, String);
				if (isHisTask(doc.createdby, context)) {
					console.log();
					doc = this._checkDataBySchema(doc as ITask, this.auditFields);
					this._includeAuditData(doc, 'update');
					const oldData = this.getCollectionInstance().findOne({ _id: doc._id }) || {};
					const nullValues = {};
					var preparedData = this._prepareDocForUpdate(doc as ITask, oldData, nullValues);
					const action: { [key: string]: any } = {
						$set: preparedData
					};
					if (Object.keys(nullValues).length > 0) {
						action['$unset'] = nullValues;
					}
					const result = this.getCollectionInstance().update({ _id: doc._id }, action);
					preparedData._id = doc._id;
					this.afterUpdate(preparedData, context);
					return result;
				}
				return null;
			} catch (error) {
				this.onUpdateError(doc, error);
				throw error;
			}
		});

		this.registerMethod('removeTask', (task: ITask | Partial<ITask>, context: IContext) => {
			try {
				if (isHisTask(task.createdby, context)) {
					check(task._id, String);
					const result = this.getCollectionInstance().remove(task._id);
					this.afterRemove(task, context);
					return result;
				}
				return null;
			} catch (error) {
				this.onRemoveError(task, error);
				throw error;
			}
		});

		this.addRestEndpoint(
			'view',
			(params, options) => {
				console.log('Params', params);
				console.log('options.headers', options.headers);
				return { status: 'ok' };
			},
			['post']
		);

		this.addRestEndpoint(
			'view/:taskId',
			(params, options) => {
				console.log('Rest', params);
				if (params.taskId) {
					return self
						.defaultCollectionPublication(
							{
								_id: params.taskId
							},
							{}
						)
						.fetch();
				} else {
					return { ...params };
				}
			},
			['get']
		);
	}
}

export const taskServerApi = new TaskServerApi();
