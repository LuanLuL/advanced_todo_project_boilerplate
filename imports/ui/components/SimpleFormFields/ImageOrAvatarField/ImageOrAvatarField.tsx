import React from 'react';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import AvatarGeneratorField from '/imports/ui/components/SimpleFormFields/AvatarGeneratorField/AvatarGeneratorField';
import ImageCompactField from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import { imageOrAvatarStyle } from './ImageOrAvatarFieldStyle';
import { hasValue } from '/imports/libs/hasValue';

import PropTypes from 'prop-types';

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent) => {
	const [imageOrAvatar, setImageOrAvatar] = React.useState('avatar');
	const [img, setImg] = React.useState(value);

	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`vertical-tabpanel-${index}`}
				aria-labelledby={`vertical-tab-${index}`}
				{...other}>
				{value === index && (
					<Box p={3}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.any.isRequired,
		value: PropTypes.any.isRequired
	};

	return (
		<div
			key={name}
			style={error ? imageOrAvatarStyle.containerImageOrAvatarError : imageOrAvatarStyle.containerImageOrAvatar}>
			<SimpleLabelView label={label} disabled={readOnly} />

			{readOnly ? (
				<div key={name} id={name}>
					{hasValue(value) && value != '' && value != '-' ? (
						<div>
							<img
								src={value}
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = '/images/wireframe/imagem_default.png';
								}}
								id={name}
								style={{
									maxHeight: '150px',
									height: '100%',
									width: '100%',
									maxWidth: '150px'
								}}
							/>
						</div>
					) : readOnly ? (
						<div style={imageOrAvatarStyle.containerEmptyMidia}>{'Não há mídia'}</div>
					) : null}
				</div>
			) : null}

			{!readOnly ? (
				<div style={imageOrAvatarStyle.containerImageOrAvatarButton}>
					{!imageOrAvatar || imageOrAvatar === 'image' ? (
						<ImageCompactField
							name={`${name}_img`}
							width={150}
							height={150}
							error={error}
							otherProps={otherProps}
							value={value}
							readOnly={readOnly}
						/>
					) : null}
					{!imageOrAvatar || imageOrAvatar === 'avatar' ? (
						<AvatarGeneratorField
							name={`${name}_avt`}
							error={error}
							otherProps={otherProps}
							value={value}
							readOnly={readOnly}
						/>
					) : null}
				</div>
			) : null}
		</div>
	);
};
