import { IDoc } from '/imports/typings/IDoc';

export const userProfileSch = {
	photo: {
		type: String,
		label: 'Photo',
		defaultValue: '',
		optional: true,
		isImage: true
	},
	username: {
		type: String,
		label: 'UserName',
		defaultValue: '',
		optional: false
	},
	email: {
		type: String,
		label: 'Email',
		optional: false
	},
	password: {
		type: String,
		label: 'Senha',
		optional: true
	},
	phone: {
		type: String,
		label: 'Telefone',
		defaultValue: '',
		optional: true,
		mask: '(##) #####-####'
	},
	roles: {
		type: [String],
		label: 'Access profile',
		defaultValue: [],
		optional: true,
		componentName: 'ChipSelect',
		options: [
			{
				value: 'Administrador',
				label: 'Admnistrador'
			},
			{
				value: 'Usuario',
				label: 'Usuário'
			}
		]
	}
};

export interface IUserProfile extends IDoc {
	photo?: string;
	phone?: string;
	username: string;
	email: string;
	password: string;
	roles?: string[];
}
