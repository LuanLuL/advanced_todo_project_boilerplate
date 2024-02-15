import React, { useState, useEffect, useContext } from 'react';
import { FixedMenuLayoutContext } from '../../../../ui/layouts/FixedMenuLayout';
import { withTracker } from 'meteor/react-meteor-data';
import { userprofileApi } from '../../../api/UserProfileApi';
import Close from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '../../../../ui/components/SimpleFormFields/TextField/TextField';
import ImageCompactField from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { isMobile } from '/imports/libs/deviceVerify';
import { Loading } from '/imports/ui/components/Loading/Loading';
import { userDetailStyles } from './userDetailsStyle';
import { IDefaultDetailProps } from '/imports/typings/BoilerplateDefaultTypings';

interface IUserDetail extends IDefaultDetailProps {
	closeComponent: () => void;
	save: (doc: IUserProfile, _callback?: any) => void;
}

const UserProfileDetail = ({ screenState, loading, user, save, navigate, closeComponent }: IUserDetail) => {
	if (loading || !user) {
		return <Loading />;
	}

	const handleSubmit = (doc: IUserProfile) => {
		save(doc);
	};

	const { handleExibirHeaderBar } = useContext(FixedMenuLayoutContext);

	useEffect(() => {
		if (isMobile) {
			handleExibirHeaderBar('/task');
		}
		return;
	}, [isMobile]);

	const toggleIsMobile = !isMobile;

	return (
		<Box component="div" sx={{ ...userDetailStyles.containerUserDetail }}>
			<Box component="div" sx={{ ...userDetailStyles.contentLabelUserDetail }}>
				<Typography sx={{ ...userDetailStyles.labelUserDetail }}>
					{screenState === 'edit'
						? 'Editar usuário'
						: screenState === 'view'
							? 'Visualizar usuário'
							: 'Adicionar Usuário'}
				</Typography>
				{toggleIsMobile && (
					<IconButton
						onClick={() => {
							closeComponent();
						}}>
						<Close color="primary" />
					</IconButton>
				)}
			</Box>
			<Box component="div" sx={{ ...userDetailStyles.formUserDetail, height: 'auto' }}>
				<SimpleForm
					mode={screenState}
					schema={userprofileApi.schema}
					doc={user}
					onSubmit={handleSubmit}
					loading={loading}>
					<ImageCompactField label={'Foto'} name={'photo'} />
					<FormGroup>
						<TextField placeholder="Nome do Usuário" name="username" sx={{ marginBottom: '10px' }} />
						<TextField placeholder="Email" name="email" sx={{ marginBottom: '10px' }} />
						<TextField placeholder="Telefone" name="phone" sx={{ marginBottom: '10px' }} />
					</FormGroup>
					<div
						key={'Buttons'}
						style={{
							paddingTop: 20,
							paddingBottom: 20,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						{screenState !== 'view' && (
							<Button
								sx={{ marginRight: '40px' }}
								onClick={() => {
									if (screenState === 'edit') {
										navigate(`/userprofile/view/${user._id}`);
									}
								}}
								color={'secondary'}
								variant="contained">
								{'Cancelar'}
							</Button>
						)}

						{screenState === 'view' ? (
							<Button onClick={() => navigate(`/userprofile/edit/${user._id}`)} color={'primary'} variant="contained">
								{'Editar'}
							</Button>
						) : null}
						{screenState !== 'view' ? (
							<Button id="submit" color={'primary'} variant="contained">
								{'Salvar'}
							</Button>
						) : null}
					</div>
				</SimpleForm>
			</Box>
		</Box>
	);
};

export const UserProfileDetailContainer = withTracker((props: IDefaultDetailProps) => {
	const { screenState, id } = props;
	const subHandle = userprofileApi.subscribe('userProfileDetail', { _id: id });
	const user = subHandle.ready() ? userprofileApi.findOne({ _id: id }) : {};

	return {
		screenState,
		user,
		save: (doc: IUserProfile) =>
			userprofileApi.update(doc, (e, r) => {
				if (!e) {
					props.navigate(`/userprofile/view/${screenState === 'create' ? r : doc._id}`);
					props.showNotification &&
						props.showNotification({
							type: 'success',
							title: 'Operação realizada!',
							description: `O usuário foi ${doc._id ? 'atualizado' : 'cadastrado'} com sucesso!`
						});
				} else {
					console.log('Error:', e);
					props.showNotification &&
						props.showNotification({
							type: 'warning',
							title: 'Operação não realizada!',
							description: `Erro ao realizar a operação: ${e.reason}`
						});
				}
			})
	};
})(UserProfileDetail);
