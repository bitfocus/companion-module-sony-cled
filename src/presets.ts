import { combineRgb, CompanionPresetDefinition, CompanionPresetDefinitions } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { getCommandList } from './spec.js'

export type PresetSpec = [string, string, string, string, [string, string, number][]]

export function UpdatePresets(self: ModuleInstance): void {
	const FONT_SIZE = 12
	const COLOR_WHITE = combineRgb(255, 255, 255)
	const COLOR_BLACK = combineRgb(0, 0, 0)

	const COMMAND_LIST = getCommandList()
	const presets: CompanionPresetDefinitions = {}

	COMMAND_LIST.forEach((item, i) => {
		if (!item[5]) {
			return
		} // skip if the label is empty
		const preset: CompanionPresetDefinition = {
			type: 'button',
			category: item[0],
			name: item[5], // same as label name
			style: {
				text: item[5], // label name
				size: FONT_SIZE,
				color: COLOR_WHITE,
				bgcolor: COLOR_BLACK,
			},
			steps: [
				{
					down: [
						{
							actionId: item[0].toLowerCase().replace(/\s/g, '_') + '_action',
							options: { val: item[2] },
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets[`sony_zrct_preset_${i}_${item[2]}`] = preset
	})

	self.setPresetDefinitions(presets)
}
