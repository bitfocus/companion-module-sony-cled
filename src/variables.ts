import type { ModuleInstance } from './main.js'
import { MAX_CONTROLLERS } from './config.js'

export const VARIABLES = [
	['power_status', 'Power Status'],
	['blank', 'Blank'],
	['input', 'Input'],
	['light_output_val', 'Light Output Value'],
	['hdr', 'HDR'],
	['hdr_auto_mode', 'HDR Auto Mode'],
	['picture_mode', 'Picture Mode'],
	['transfer_matrix', 'Transfer Matrix'],
	['color_temp', 'Color Temperature'],
	['advanced_pic', 'Advanced Picture'],
	['motionflow', 'Motionflow'],
]

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	const vars: { variableId: string; name: string }[] = []
	VARIABLES.forEach((x) => {
		for (let i = 1; i <= MAX_CONTROLLERS; i++) {
			vars.push({
				variableId: `controller_${i}-${x[0]}`,
				name: `Controller ${i} ${x[1]}`,
			})
		}
	})

	self.setVariableDefinitions(vars)
}
