import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { exampleApi } from '../../api/exampleApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import TextMaskField from '../../../../ui/components/SimpleFormFields/TextMaskField/TextMaskField';
import RadioButtonField from '../../../../ui/components/SimpleFormFields/RadioButtonField/RadioButtonField';
import SelectField from '../../../../ui/components/SimpleFormFields/SelectField/SelectField';
import UploadFilesCollection from '../../../../ui/components/SimpleFormFields/UploadFiles/uploadFilesCollection';
import ChipInput from '../../../../ui/components/SimpleFormFields/ChipInput/ChipInput';
import SliderField from '/imports/ui/components/SimpleFormFields/SliderField/SliderField';
import AudioRecorder from '/imports/ui/components/SimpleFormFields/AudioRecorderField/AudioRecorder';
import ImageCompactField from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import Print from '@mui/icons-material/Print';
import Close from '@mui/icons-material/Close';
import { PageLayout } from '../../../../ui/layouts/PageLayout';
import { IExample } from '../../api/exampleSch';
import { IDefaultContainerProps, IDefaultDetailProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { useTheme } from '@mui/material/styles';
import { showLoading } from '/imports/ui/components/Loading/Loading';
import ColorPicker from '/imports/ui/components/SimpleFormFields/ColorPicker/ColorPicker';

interface IExampleDetail extends IDefaultDetailProps {
	exampleDoc: IExample;
	save: (doc: IExample, _callback?: any) => void;
}

const ExampleDetail = (props: IExampleDetail) => {
	const { isPrintView, screenState, loading, exampleDoc, save, navigate } = props;

	const theme = useTheme();

	const handleSubmit = (doc: IExample) => {
		save(doc);
	};

	return (
		<PageLayout
			key={'ExemplePageLayoutDetailKEY'}
			title={
				screenState === 'view' ? 'Visualizar exemplo' : screenState === 'edit' ? 'Editar Exemplo' : 'Criar exemplo'
			}
			onBack={() => navigate('/example')}
			actions={[
				!isPrintView ? (
					<span
						key={'ExempleDetail-spanPrintViewKEY'}
						style={{
							cursor: 'pointer',
							marginRight: 10,
							color: theme.palette.secondary.main
						}}
						onClick={() => {
							navigate(`/example/printview/${exampleDoc._id}`);
						}}>
						<Print key={'ExempleDetail-spanPrintKEY'} />
					</span>
				) : (
					<span
						key={'ExempleDetail-spanNotPrintViewKEY'}
						style={{
							cursor: 'pointer',
							marginRight: 10,
							color: theme.palette.secondary.main
						}}
						onClick={() => {
							navigate(`/example/view/${exampleDoc._id}`);
						}}>
						<Close key={'ExempleDetail-spanCloseKEY'} />
					</span>
				)
			]}>
			<SimpleForm
				key={'ExempleDetail-SimpleFormKEY'}
				mode={screenState}
				schema={exampleApi.getSchema()}
				doc={exampleDoc}
				onSubmit={handleSubmit}
				loading={loading}>
				<div
					key={'fieldsOne'}
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
						marginTop: 20
					}}>
					<TextField key={'f1-tituloKEY'} placeholder="Titulo" name="title" />
					<TextField key={'f1-descricaoKEY'} placeholder="Descrição" name="description" />
				</div>
				<SelectField key={'f2-tipoKEY'} placeholder="Selecione um tipo" name="type" />
				<ColorPicker name="color" />
				<div
					key={'Buttons'}
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'left',
						paddingTop: 20,
						paddingBottom: 20
					}}>
					{!isPrintView ? (
						<Button
							key={'b1'}
							style={{ marginRight: 10 }}
							onClick={
								screenState === 'edit'
									? () => navigate(`/example/view/${exampleDoc._id}`)
									: () => navigate(`/example/list`)
							}
							color={'secondary'}
							variant="contained">
							{screenState === 'view' ? 'Voltar' : 'Cancelar'}
						</Button>
					) : null}

					{!isPrintView && screenState === 'view' ? (
						<Button
							key={'b2'}
							onClick={() => {
								navigate(`/example/edit/${exampleDoc._id}`);
							}}
							color={'primary'}
							variant="contained">
							{'Editar'}
						</Button>
					) : null}
					{!isPrintView && screenState !== 'view' ? (
						<Button key={'b3'} color={'primary'} variant="contained" id="submit">
							{'Salvar'}
						</Button>
					) : null}
				</div>
			</SimpleForm>
		</PageLayout>
	);
};

interface IExampleDetailContainer extends IDefaultContainerProps {}

export const ExampleDetailContainer = withTracker((props: IExampleDetailContainer) => {
	const { screenState, id, navigate, showNotification } = props;

	const subHandle = !!id ? exampleApi.subscribe('exampleDetail', { _id: id }) : null;
	const exampleDoc = id && subHandle?.ready() ? exampleApi.findOne({ _id: id }) : {};

	return {
		screenState,
		exampleDoc,
		save: (doc: IExample, _callback: () => void) => {
			const selectedAction = screenState === 'create' ? 'insert' : 'update';
			exampleApi[selectedAction](doc, (e: IMeteorError, r: string) => {
				if (!e) {
					navigate(`/example/view/${screenState === 'create' ? r : doc._id}`);
					showNotification &&
						showNotification({
							type: 'success',
							title: 'Operação realizada!',
							description: `O exemplo foi ${doc._id ? 'atualizado' : 'cadastrado'} com sucesso!`
						});
				} else {
					console.log('Error:', e);
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Operação não realizada!',
							description: `Erro ao realizar a operação: ${e.reason}`
						});
				}
			});
		}
	};
})(showLoading(ExampleDetail));
