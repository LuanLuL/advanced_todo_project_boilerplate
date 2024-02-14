// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useLocation, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import Typography from '@mui/material/Typography';
import { signinStyle } from './SigninStyle';
import Box from '@mui/material/Box';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

interface ISignIn {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignIn = (props: ISignIn) => {
	const [redirectToReferer, setRedirectToReferer] = useState(false);

	const location = useLocation();

	const { showNotification, navigate, user } = props;

	const { handleOcultarAppBar, handleOcultarHeaderBar, handleExibirHeaderBar } = useContext(FixedMenuLayoutContext);

	useEffect(() => {
		handleOcultarAppBar();
		handleOcultarHeaderBar();
		return () => handleExibirHeaderBar();
	}, []);

	const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;
		Meteor.loginWithPassword(email, password, (err: any) => {
			if (err) {
				showNotification({
					type: 'warning',
					title: 'Acesso negado!',
					description:
						err.reason === 'Incorrect password'
							? 'Email ou senha inválidos'
							: err.reason === 'User not found'
								? 'Este email não está cadastrado em nossa base de dados.'
								: ''
				});
			} else {
				showNotification({
					type: 'sucess',
					title: 'Acesso autorizado!',
					description: 'Login de usuário realizado em nossa base de dados!'
				});
				setRedirectToReferer(true);
			}
		});
	};

	React.useEffect(() => {
		if (!!user && !!user._id) navigate('/');
	}, [user]);

	React.useEffect(() => {
		if (location.pathname === '/signout') navigate('/signin');
	}, [location.pathname]);

	return (
		<Box sx={signinStyle.containerSignIn}>
			<Box>
				<Typography sx={signinStyle.labelAccessSystem}>ToDo List</Typography>
				<Box sx={signinStyle.containerSubLabelSignUp}>
					<Typography sx={signinStyle.subLabelAccessSystem}>Boas-vindas a sua lista de tarefas. </Typography>
					<Typography sx={signinStyle.subLabelAccessSystem}>Insira seu e-mail e senha para efetuar o login:</Typography>
				</Box>
			</Box>
			<Box sx={signinStyle.formSignIn}>
				<SimpleForm
					schema={{
						email: { type: 'String', label: 'Email', optional: false },
						password: { type: 'String', label: 'Senha', optional: false }
					}}
					onSubmit={handleSubmit}>
					<Box>
						<TextField
							label="Email"
							fullWidth={true}
							name="email"
							type="email"
							placeholder="Digite seu email"
							style={signinStyle.inputSignIn}
						/>
						<TextField
							label="Senha"
							fullWidth={true}
							name="password"
							placeholder="Digite sua senha"
							type="password"
							style={signinStyle.inputSignIn}
						/>
						<Box sx={signinStyle.containerButtonOptions}>
							<Button id="submit" variant={'outlined'} color={'primary'}>
								Entrar
							</Button>
						</Box>
					</Box>
				</SimpleForm>
			</Box>
			<Box sx={signinStyle.containerRouterSignUp}>
				<Typography sx={signinStyle.routersSignIn}>
					Esqueceu sua senha?{' '}
					<Link style={signinStyle.routersSignIn} to="/password-recovery" id="forgotPassword" color={'primary'}>
						Clique aqui
					</Link>
				</Typography>
				<Typography sx={signinStyle.routersSignIn}>
					Novo por aqui?{' '}
					<Link style={signinStyle.routersSignIn} to="/signup" id="newUser" color={'primary'}>
						Cadastre-se
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};
