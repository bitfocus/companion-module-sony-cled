import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig, MAX_CONTROLLERS } from './config.js'
import { UpdateVariableDefinitions, VARIABLES } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { sendADCP } from './adcp.js'

function unquoteString(str: string): string {
	if (str.startsWith('"') && str.endsWith('"')) {
		return str.slice(1, -1)
	}
	return str
}

const STATE_VARS = VARIABLES.map((x) => x[0])

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig // Setup in init()
	private timerId: NodeJS.Timeout | null = null
	private polling: boolean = false

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
			} else {
				promises.push(Promise.resolve(''))
			}
		}
		return Promise.allSettled(promises)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.updateActions() // export actions
		//this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets() // export presets

		await this.configUpdated(config)
		this.updateStatus(InstanceStatus.Ok)
	}

	startPolling(): void {
		if (this.polling) {
			return
		}
		this.polling = true
		void this.poll()
	}

	stopPolling(): void {
		this.polling = false
		if (this.timerId) {
			clearTimeout(this.timerId)
			this.timerId = null
		}
	}

	private async poll() {
		if (!this.polling) {
			return
		}

		await this.getDeviceState().catch(() => {})

		if (this.polling) {
			this.timerId = setTimeout(() => void this.poll(), this.config.polling_interval)
		}
	}

	private async getDeviceState(): Promise<void> {
		const vars: { [key: string]: string } = {}

		for (let i = 0; i < STATE_VARS.length; i++) {
			const res = await this.sendCommand(`${STATE_VARS[i]} ?`)
			res.map((r, j) => {
				vars[`controller_${j + 1}-${STATE_VARS[i]}`] = r.status === 'fulfilled' ? unquoteString(r.value) : ''
			})
		}

		this.setVariableValues(vars)
	}

	// When module gets deleted
	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config

		this.stopPolling()
		if (this.config.polling_enable) {
			this.startPolling()
		}
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
