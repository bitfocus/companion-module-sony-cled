import type {
	CompanionStaticUpgradeScript,
	CompanionMigrationAction,
	CompanionStaticUpgradeResult,
	CompanionUpgradeContext,
	CompanionStaticUpgradeProps,
} from '@companion-module/base'
import type { ModuleConfig } from './config.js'

export const UpgradeScripts: CompanionStaticUpgradeScript<ModuleConfig>[] = [
	// From v1 to v2
	function (
		context: CompanionUpgradeContext<ModuleConfig>,
		props: CompanionStaticUpgradeProps<ModuleConfig>,
	): CompanionStaticUpgradeResult<ModuleConfig> {
		const oldConfig: any = context.currentConfig
		const newConfig: CompanionStaticUpgradeResult<ModuleConfig> = {
			updatedActions: [...props.actions] as CompanionMigrationAction[],
			updatedFeedbacks: [],
			updatedConfig: { ...props.config } as ModuleConfig,
		}

		// Skip if already new format
		if ('all_hosts' in oldConfig) {
			// config
			const config = newConfig.updatedConfig as ModuleConfig
			if ('host1' in oldConfig) {
				config['1_active'] = true
				config['1_host'] = oldConfig.host1
			}
			if ('host2' in oldConfig) {
				config['2_active'] = true
				config['2_host'] = oldConfig.host2
			}
			if ('host3' in oldConfig) {
				config['3_active'] = true
				config['3_host'] = oldConfig.host3
			}
			if ('host4' in oldConfig) {
				config['4_active'] = true
				config['4_host'] = oldConfig.host4
			}
			if ('host5' in oldConfig) {
				config['5_active'] = true
				config['5_host'] = oldConfig.host5
			}
			if ('host6' in oldConfig) {
				config['6_active'] = true
				config['6_host'] = oldConfig.host6
			}
			config['1_port'] = oldConfig.port
			config['2_port'] = oldConfig.port
			config['3_port'] = oldConfig.port
			config['4_port'] = oldConfig.port
			config['5_port'] = oldConfig.port
			config['6_port'] = oldConfig.port

			// actions
			for (const action of newConfig.updatedActions) {
				if (action.actionId === 'hdr') {
					action.options.value = 'hdr_' + action.options.value
				}

				if (!action.actionId.endsWith('_action')) {
					action.actionId = action.actionId + '_action'
					action.options.val = action.options.value
					delete action.options.value
				}
			}
		}

		return newConfig
	},
]
