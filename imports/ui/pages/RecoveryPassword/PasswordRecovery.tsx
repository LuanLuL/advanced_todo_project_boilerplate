// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import TextField from '../../components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import { signUpStyle } from '../SignUp/SignUpStyle';
import Typography from '@mui/material/Typography';
import { passwordRecoveryStyle } from './PasswordRecoveryStyle';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';
import { Box, Container } from '@mui/material';

export const PasswordRecovery = (props: IDefaultContainerProps) => {
	const { showNotification, navigate } = props;

	const { handleExibirAppBar, handleOcultarAppBar } = useContext(FixedMenuLayoutContext);

	const handleSubmit = (doc: { email: string }) => {
		const { email } = doc;

		Accounts.forgotPassword({ email }, (err?: Meteor.Error | Error | undefined) => {
			if (err) {
				if (err.message === 'User not found [403]') {
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Problema na recuperação da senha!',
							description: 'Este email não está cadastrado em nossa base de dados!'
						});
				} else {
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Problema na recuperação da senha!',
							description: 'Erro ao recriar a senha, faça contato com o administrador!!'
						});
				}
			} else {
				showNotification &&
					showNotification({
						type: 'sucess',
						title: 'Senha enviada!',
						description: 'Acesse seu email e clique no link para criar uma nova senha.'
					});
				navigate('/');
			}
		});
	};

	useEffect(() => {
		handleOcultarAppBar();
	}, []);

	return (
		<Container sx={{ ...passwordRecoveryStyle.containerRecoveryPassword }}>
			<Box>
				<Typography sx={{ ...signUpStyle.labelRegisterSystem, sm: { fontSize: '20px' } }}>Acessar o sistema</Typography>
			</Box>
			<Box sx={{ ...passwordRecoveryStyle.formPasswordR }}>
				<SimpleForm
					schema={{
						email: { type: 'String', label: 'Email', optional: false }
					}}
					onSubmit={handleSubmit}>
					<TextField label="Email" icon="user" name="email" type="email" placeholder="Digite seu email" />
					<Box sx={passwordRecoveryStyle.containerButtonOptions}>
						<Button color={'primary'} variant={'outlined'} onClick={() => navigate('/signin')}>
							Voltar
						</Button>
						<Button id="submit" color={'primary'} variant={'outlined'}>
							Recuperar
						</Button>
					</Box>
				</SimpleForm>
			</Box>
		</Container>
	);
};
