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
		response = await superagent.get(urlToFetch)
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
	const supportsIframe = !['SAMEORIGIN', 'DENY'].includes(response.headers['x-frame-options'].split(',')[0])
	ctx.body = {
		supportsIframe,
	}
});

app.listen(process.env.PORT || 8000)
