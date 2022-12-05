import superagent from 'superagent'

const allowCors = fn => async (request, response) => {
	response.setHeader('Access-Control-Allow-Credentials', true)
	response.setHeader('Access-Control-Allow-Origin', '*')
	response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
	if (request.method === 'OPTIONS') {
		response.status(200).end()
		return
	}

	return await fn(request, response)
}

const handler = async (request, response) => {
	const urlToFetch = request.query.url

	// Avoid localhost checks, assume iframes are supported
	if (urlToFetch.match(/^https?:\/\/.*localhost/)) {
		response.status(200).json({
			supportsIframe: true
		})
		return
	}

	// Make an HTTP GET request to errors or headers
	let urlToFetchResponse
	try {
		urlToFetchResponse = await new Promise((resolve, reject) => {
			superagent
				.get(urlToFetch)
				.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36')
				.end((err, res) => {
					if (err) {
						return reject(err)
					}

					resolve(res)
				})
		})
	} catch (err) {
		if (err.status !== undefined && err.status >= 300) {
			response.status(404).json({
				error: 'Not Found',
			})
			return
		}

		response.status(200).json({
			supportsIframe: true
		})
		return
	}

	// Check headers
	const xFrameOptionHeader = urlToFetchResponse.headers['x-frame-options'] || ''
	const supportsIframe = !['SAMEORIGIN', 'DENY'].includes(xFrameOptionHeader.split(',')[0])
	response.status(200).json({
		supportsIframe,
	})
}

export default allowCors(handler)
