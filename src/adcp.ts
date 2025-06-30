import net from 'node:net'
import crypto from 'node:crypto'

export async function sendADCP(host: string, port: number, pass: string, command: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		let authorized = false
		let sent = false
		const socket = new net.Socket()
		socket.setKeepAlive(true)
		socket.setNoDelay(true)

		socket.on('error', (err) => {
			reject(err)
		})

		socket.on('data', (data) => {
			const res = data.toString().replace(/[\r\n]/g, '')

			if (!authorized) {
				const u = res.toUpperCase()
				if (u === 'NOKEY' || u === 'OK') {
					authorized = true
				} else if (u === 'ERR_AUTH') {
					socket.removeAllListeners()
					socket.destroy()
					reject(new Error('auth error'))
				} else {
					const hash = crypto
						.createHash('sha256')
						.update(res + pass)
						.digest('hex')
					socket.write(hash + '\r\n')
					return
				}
			}

			if (sent) {
				resolve(res)
				socket.removeAllListeners()
				socket.destroy()
			} else {
				socket.write(command + '\r\n')
				sent = true
			}
		})

		setImmediate(() => {
			socket.connect(port, host)
		})
	})
}
