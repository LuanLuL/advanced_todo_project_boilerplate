import { IDoc } from '/imports/typings/IDoc';

export const taskSch = {
	title: {
		type: String,
		label: 'Título',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição',
		optional: false
	},
	status: {
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	category: {
		type: String,
		label: 'Categoria',
		optional: false,
		options: [
			{ value: 'Normal', label: 'Normal' },
			{ value: 'Pessoal', label: 'Pessoal' }
		]
	}
};

export interface ITask extends IDoc {
	title: string;
	description: string;
	status: boolean;
	category: string;
}
