import React, { useState } from 'react';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import Switch from '@mui/material/Switch';
import { styleSwitchField } from './styleSwitchField.jsx';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';

interface ISwichFiel {
	key: string;
}

export const SwitchField = ({
	key,
	name,
	label,
	value,
	onChange,
	readOnly,
	error,
	help,
	style,
	placeholder,
	schema,
	...otherProps
}: IBaseSimpleFormComponent & ISwichFiel) => {
	const [valueSwitch, setValueSwitch] = useState('');

	const normal = schema.options[0].value;
	const pessoal = schema.options[1].value;

	React.useEffect(() => {
		if (value) {
			setValueSwitch(value);
		} else {
			setValueSwitch(normal);
		}
	}, [value, normal]);

	const getRightValue = (current: string) => {
		if (current == pessoal) {
			return normal;
		}
		return pessoal;
	};

	return (
		<Box
			key={key}
			sx={{
				...styleSwitchField.containerSwitchField
			}}>
			<SimpleLabelView label={'Tipo'} help={help} style={{ padding: '10px' }} />
			<FormControlLabel
				control={
					<Switch
						checked={valueSwitch === normal ? false : true}
						disabled={readOnly}
						onChange={() => {
							onChange(
								{ name, target: { name, value: getRightValue(valueSwitch) } },
								{ name, value: getRightValue(valueSwitch) }
							);
							setValueSwitch(getRightValue(valueSwitch));
						}}
					/>
				}
				label={valueSwitch}
			/>
		</Box>
	);
};
