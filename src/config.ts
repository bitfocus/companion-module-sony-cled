import {
	CompanionInputFieldCheckbox,
	CompanionInputFieldTextInput,
	Regex,
	type SomeCompanionConfigField,
} from '@companion-module/base';

export interface ModuleConfig {
	'1_active': boolean
	'1_host': string
	'1_port': number
	'1_pass': string
	'2_active': boolean
	'2_host': string
	'2_port': number
	'2_pass': string
	'3_active': boolean
	'3_host': string
	'3_port': number
	'3_pass': string
	'4_active': boolean
	'4_host': string
	'4_port': number
	'4_pass': string
};

export const MAX_CONTROLLERS = 4;

export function GetConfigFields(): SomeCompanionConfigField[] {
	const configs: SomeCompanionConfigField[] = [];

	for (let i = 1; i <= MAX_CONTROLLERS; i++) {
		configs.push(
			{
				type: 'checkbox',
				id: `${i}_active`,
				label: `Controller ${i}`,
				width: 2,
				default: false,
			},
			{
				type: 'textinput',
				id: `${i}_host`,
				label: 'Target IP',
				width: 3,
				regex: Regex.IP,
				default: '',
			},
			{
				type: 'number',
				id: `${i}_port`,
				label: 'Target Port',
				width: 3,
				min: 1,
				max: 65535,
				default: 53595,
			},
			{
				type: 'textinput',
				id: `${i}_pass`,
				label: 'Password',
				width: 4,
				default: '',
			},
		);
	}

	(configs[0] as CompanionInputFieldCheckbox).default = true;
	(configs[1] as CompanionInputFieldTextInput).default = '127.0.0.1';

	return configs;
}
