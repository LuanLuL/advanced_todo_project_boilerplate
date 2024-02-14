// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed

// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useEffect } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import TextField from '../../components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../userprofile/api/UserProfileApi';
import { signUpStyle } from './SignUpStyle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	const { showNotification } = props;

	const { handleOcultarAppBar, handleOcultarHeaderBar, handleExibirHeaderBar } = useContext(FixedMenuLayoutContext);

	useEffect(() => {
		handleOcultarAppBar();
		handleOcultarHeaderBar();
		return () => handleExibirHeaderBar();
	}, []);

	const handleSubmit = (doc: { email: string; username: string; password: string }) => {
		const { email, username, password } = doc;
		console.log(doc);

		userprofileApi.insertNewUser({ email, username, password }, (err, r) => {
			if (err) {
				console.log('Login err', err);
				if (err.message === 'Username already exists. [403]') {
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Problema na criação do usuário!',
							description: 'Email já existente no sistema.'
						});
				}
			} else {
				showNotification &&
					showNotification({
						type: 'sucess',
						title: 'Cadastrado com sucesso!',
						description: 'Registro de usuário realizado em nossa base de dados!'
					});
			}
		});
	};

	return (
		<Box sx={signUpStyle.containerSignUp}>
			<Box>
				<Typography sx={{ ...signUpStyle.labelRegisterSystem, sm: { fontSize: '20px' } }}>
					Cadastrar <br />
					no sistema
				</Typography>
			</Box>
			<Box sx={{ ...signUpStyle.formSignUp }}>
				<SimpleForm
					schema={{
						username: {
							type: String,
							label: 'username',
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
							optional: false
						}
					}}
					onSubmit={handleSubmit}>
					<Box>
						<TextField
							label="Email"
							fullWidth={true}
							name="email"
							type="email"
							placeholder="Digite seu email"
							style={{ ...signUpStyle.inputSignUp }}
						/>
						<TextField
							label="Nome de usuário"
							fullWidth={true}
							name="username"
							placeholder="Digite seu nome de usuário"
							type="text"
							style={{ ...signUpStyle.inputSignUp }}
						/>
						<TextField
							label="Senha"
							fullWidth={true}
							name="password"
							placeholder="Digite sua senha"
							type="password"
							style={{ ...signUpStyle.inputSignUp }}
						/>
						<Box sx={{ ...signUpStyle.containerButtonOptions }}>
							<Button id="submit" variant={'outlined'} color={'primary'}>
								Cadastrar
							</Button>
						</Box>
					</Box>
				</SimpleForm>
			</Box>
			<Box sx={{ ...signUpStyle.containerRouterSignIn }}>
				<Typography sx={{ ...signUpStyle.routersSignUp }}>
					Já tem uma conta? Faça login clicando{' '}
					<Link style={{ ...signUpStyle.routersSignUp }} to="/signin" id="newUser" color={'primary'}>
						aqui
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};
