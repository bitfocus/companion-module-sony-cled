import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig, MAX_CONTROLLERS } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { sendADCP } from './adcp.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig // Setup in init()

	constructor(internal: unknown) {
		super(internal)
	}

	async sendCommand(cmd: string): Promise<PromiseSettledResult<string>[]> {
		const promises: Promise<string>[] = []
		for (let i = 1; i <= MAX_CONTROLLERS; i++) {
			const k = `${i}_active` as keyof typeof this.config
			if (this.config[k]) {
				const host = this.config[`${i}_host` as keyof typeof this.config] as string
				const port = this.config[`${i}_port` as keyof typeof this.config] as number
				const pass = this.config[`${i}_pass` as keyof typeof this.config] as string
				promises.push(sendADCP(host, port, pass, cmd))
			}
		}
		return Promise.allSettled(promises)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		//this.updateFeedbacks() // export feedbacks
		//this.updateVariableDefinitions() // export variable definitions
		this.updatePresets() // export presets
	}
	// When module gets deleted
	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}

	updatePresets(): void {
		UpdatePresets(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
