const tcp = require('../../tcp')
const instance_skel = require('../../instance_skel')

class instance extends instance_skel {
	/**
	 * Create an instance of the module
	 *
	 * @param {EventEmitter} system - the brains of the operation
	 * @param {string} id - the instance ID
	 * @param {Object} config - saved user configuration parameters
	 * @since 1.0.0
	 */
	constructor(system, id, config) {
		super(system, id, config)
		this.actions() // export actions
		this.init_presets() // export presets
	}

	updateConfig(config) {
		this.init_presets()

		this.config = config

		// recreate the array of controller IP addresses
		let hosts = []

		for (let i = 1; i <= this.config.controller_count; i++) {
			hosts.push(eval('this.config.host' + i))
		}
		this.config.all_hosts = JSON.stringify(hosts)
		this.saveConfig()
		this.debug('Configured hosts:', JSON.parse(this.config.all_hosts))

		this.init_tcp()
	}

	init() {
		this.init_presets()
		this.debug(this.config)
		this.init_tcp()
	}

	init_tcp() {
		// open a socket for testing and then close it
		this.status(this.STATE_WARNING, 'Connecting')
		let hosts = JSON.parse(this.config.all_hosts)

		if (hosts) {
			for (let i = 0; i < this.config.controller_count; i++) {
				this.debug('Testing connection to ' + hosts[i])
				let test_socket = new tcp(hosts[i], this.config.port)

				test_socket.on('status_change', (status, message) => {
					this.status(status, message)
				})

				test_socket.on('error', (err) => {
					this.debug('Network error', err)
					this.status(this.STATE_ERROR, err)
					this.log('error', 'Network error: ' + err.message)
					test_socket.destroy()
				})

				test_socket.on('connect', () => {
					if (this.status == this.STATE_WARNING) {
						this.status(this.STATE_OK)
					}
					this.debug('Connected')
					this.log('info', 'Connected to ' + hosts[i])
					test_socket.destroy()
				})

				test_socket.on('data', (data) => {})
			}
		}
	}

	// Return config fields for web config
	config_fields() {
		return [
			{
				type: 'number',
				id: 'controller_count',
				label: 'Controller Count',
				width: 2,
				min: 1,
				max: 12,
				default: 1,
				//required: true
			},
			{
				type: 'dropdown',
				id: 'model',
				label: 'Controller Model',
				width: 5,
				default: 'zrct-200',
				choices: [{ id: 'zrct-200', label: 'ZRCT-200' }],
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Control Port',
				width: 3,
				default: 53595,
				regex: this.REGEX_PORT,
			},
			{
				type: 'textinput',
				id: 'host1',
				label: 'Controller 1 IP',
				width: 8,
				regex: this.REGEX_IP,
			},
			{
				type: 'textinput',
				id: 'host2',
				label: 'Controller 2 IP',
				width: 8,
				isVisible: (configValues) => configValues.controller_count > 1,
			},
			{
				type: 'textinput',
				id: 'host3',
				label: 'Controller 3 IP',
				width: 8,
				isVisible: (configValues) => configValues.controller_count > 2,
			},
			{
				type: 'textinput',
				id: 'host4',
				label: 'Controller 4 IP',
				width: 8,
				isVisible: (configValues) => configValues.controller_count > 3,
			},
			{
				type: 'textinput',
				id: 'host5',
				label: 'Controller 5 IP',
				width: 8,
				isVisible: (configValues) => configValues.controller_count > 4,
			},
			{
				type: 'textinput',
				id: 'host6',
				label: 'Controller 6 IP',
				width: 8,
				isVisible: (configValues) => configValues.controller_count > 5,
			},
			{
				type: 'textinput',
				id: 'all_hosts',
				label: 'stringified array of hosts (not shown)',
				width: 8,
				isVisible: (configValues) => false,
			},
		]
	}

	init_presets() {
		let presets = []
		this.setPresetDefinitions(presets)
	}

	actions(system) {
		this.setActions({
			input: {
				label: 'Select Input',
				options: [
					{
						type: 'dropdown',
						id: 'value',
						label: 'Input:',
						tooltip: '',
						width: 4,
						choices: [
							{ id: 'dvi1_2_3_4', label: 'DVI 1-2-3-4' },
							{ id: 'dp1', label: 'DisplayPort 1' },
							{ id: 'dp2', label: 'DisplayPort 2' },
							{ id: 'dp1_2', label: 'DisplayPort Dual' },
							{ id: 'hdmi1', label: 'HDMI 1' },
							{ id: 'hdmi2', label: 'HDMI 2' },
						],
					},
				],
			},

			color_space: {
				label: 'Select Color Space',
				options: [
					{
						type: 'dropdown',
						id: 'value',
						label: 'Color Space:',
						width: 4,
						choices: [
							{ id: 'custom1', label: 'sRGB' },
							{ id: 'custom2', label: 'Native' },
							{ id: 'custom3', label: 'Adobe RGB' },
							{ id: 'custom4', label: 'DCI P3' },
							{ id: 'custom5', label: 'BT.2020' },
							{ id: 'custom6', label: 'Custom 1' },
							{ id: 'custom7', label: 'Custom 2' },
							{ id: 'custom8', label: 'Custom 3' },
							{ id: 'custom9', label: 'Custom 4' },
							{ id: 'custom10', label: 'Custom 5' },
						],
					},
				],
			},
			picture_mode: {
				label: 'Select Picture Mode',
				options: [
					{
						type: 'dropdown',
						id: 'value',
						label: 'Picture Mode:',
						width: 4,
						choices: [
							{ id: 'mode1', label: 'Mode 1' },
							{ id: 'mode2', label: 'Mode 2' },
							{ id: 'mode3', label: 'Mode 3' },
							{ id: 'mode4', label: 'Mode 4' },
							{ id: 'mode5', label: 'Mode 5' },
							{ id: 'mode6', label: 'Mode 6' },
							{ id: 'mode7', label: 'Mode 7' },
							{ id: 'mode8', label: 'Mode 8' },
							{ id: 'mode9', label: 'Mode 9' },
							{ id: 'mode10', label: 'Mode 10' },
						],
					},
				],
			},
			hdr: {
				label: 'Select HDR Mode',
				options: [
					{
						type: 'dropdown',
						id: 'value',
						label: 'HDR Mode:',
						width: 4,
						choices: [
							{ id: 'off', label: 'OFF' },
							{ id: 'slog3', label: 'S-Log 3' },
							{ id: 'st2084', label: 'ST 2084 (PQ)' },
							{ id: 'hlg', label: 'HLG' },
							{ id: 'slog3_live', label: 'S-Log3 Live' },
						],
					},
				],
			},

			other_cmd: {
				label: 'Send Other Command',
				options: [
					{
						type: 'textwithvariables',
						id: 'value',
						label: 'Command:',
						tooltip: 'Most commands need quotes around the value, e.g. blank "on"',
						width: 12,
					},
				],
			},
		})
	}

	action(action) {
		let cmd
		let hosts = JSON.parse(this.config.all_hosts)

		switch (action.action) {
			case 'input':
				this.parseVariables(action.options.value, (value) => {
					cmd = 'input "' + decodeURI(value) + '"\r\n'
				})
				this.debug(cmd)
				break

			case 'color_space':
				this.parseVariables(action.options.value, (value) => {
					cmd = 'color_space "' + decodeURI(value) + '"\r\n'
				})
				this.debug(cmd)
				break

			case 'picture_mode':
				this.parseVariables(action.options.value, (value) => {
					cmd = 'picture_mode "' + decodeURI(value) + '"\r\n'
				})
				this.debug(cmd)
				break

			case 'hdr_mode':
				this.parseVariables(action.options.value, (value) => {
					cmd = 'hdr "' + decodeURI(value) + '"\r\n'
				})
				this.debug(cmd)
				break

			case 'other_cmd':
				this.parseVariables(action.options.value, (value) => {
					cmd = decodeURI(value) + '\r\n'
				})
				this.debug(cmd)
				break
		}

		/*
		 * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
		 * sending a string assumes 'utf8' encoding
		 * which then escapes character values over 0x7F
		 * and destroys the 'binary' content
		 */
		let sendBuf = Buffer.from(cmd, 'latin1')

		if (sendBuf != '') {
			for (let i = 0; i < hosts.length; i++) {
				// create new TCP socket each time
				let socket = new tcp(hosts[i], this.config.port)
				this.debug('created new socket')

				socket.on('error', (err) => {
					this.log('error', 'Network error: [' + hosts[i] + ']: ' + err.message)
				})

				socket.on('connect', () => {
					this.debug('Connected to ' + hosts[i])

					// send command
					if (socket !== undefined && socket.connected) {
						socket.send(sendBuf)
					} else {
						this.debug('Socket not connected :(')
					}

					// close socket
					socket.destroy()
				})

				socket.on('data', (data) => {})
			}
		}
	}
}
exports = module.exports = instance
