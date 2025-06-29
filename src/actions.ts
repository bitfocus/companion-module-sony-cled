import {
	CompanionActionDefinition,
	CompanionActionDefinitions,
	CompanionActionEvent,
	CompanionInputFieldDropdown,
} from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { getCommandList } from './spec.js'

export function UpdateActions(self: ModuleInstance): void {
	const COMMAND_LIST = getCommandList()
	const EMPTY_FUNC = () => {}

	interface Commands {
		[key: string]: string
	}
	const commands: Commands = {}
	const actions: CompanionActionDefinitions = {}

	COMMAND_LIST.forEach((item) => {
		commands[item[2]] = item[3]
		const k = item[0].toLowerCase().replace(/\s/g, '_') + '_action'
		if (k in actions) {
			;(actions[k]?.options[0] as CompanionInputFieldDropdown).choices.push({ id: item[2], label: item[1] })
		} else {
			actions[k] = {
				name: item[0],
				options: [
					{
						id: 'val',
						type: 'dropdown',
						label: item[0],
						choices: [{ id: item[2], label: item[1] }],
						default: 0,
					},
				],
				callback: EMPTY_FUNC,
			}
		}
		if (item[4]) {
			;(actions[k]?.options[0] as CompanionInputFieldDropdown).default = item[2]
		}
	})

	// Generate callback from the list
	Object.keys(actions).forEach((k) => {
		;(actions[k] as CompanionActionDefinition).callback = async (event: CompanionActionEvent) => {
			self.sendCommand(commands[event.options.val as string])
		}
	})

	// Other user defined command
	actions['other_command_action'] = {
		name: 'Other Command',
		options: [
			{
				id: 'val',
				type: 'textinput',
				label: 'Command',
				useVariables: true,
			},
		],
		callback: async (event: CompanionActionEvent) => {
			self.sendCommand(event.options.val as string)
		},
	}

	self.setActionDefinitions(actions)
}
