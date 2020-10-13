import Koa from 'koa'
import cors from '@koa/cors'
import superagent from 'superagent'

const app = new Koa()
app.use(cors())

app.use(async ctx => {
	const urlToFetch = ctx.path.substr(1)

	// Avoid localhost checks, assume iframes are supported
	if (urlToFetch.match(/^https?:\/\/.*localhost/)) {
		ctx.body = {
			supportsIframe: true
		}
		return
	}

	// Make a HTTP GET request to errors or headers
	let response
	try {
		response = await new Promise((resolve, reject) => {
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
			ctx.status = 404
			ctx.body = {
				error: 'Not Found',
			}
			return
		}

		ctx.body = {
			supportsIframe: true
		}
		return
	}

	// Check headers
	const xFrameOptionHeader = response.headers['x-frame-options'] || ''
	const supportsIframe = !['SAMEORIGIN', 'DENY'].includes(xFrameOptionHeader.split(',')[0])
	ctx.body = {
		supportsIframe,
	}
});

app.listen(process.env.PORT || 8000)
