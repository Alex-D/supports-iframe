import Koa from 'koa'
import cors from '@koa/cors'
import superagent from 'superagent'

const app = new Koa()
app.use(cors())

app.use(async ctx => {
	const urlToFetch = ctx.path.substr(1)
	let response
	try {
		response = await superagent.get(urlToFetch)
	} catch (err) {
		ctx.status = 404
		ctx.body = {
			error: 'Not Found',
		}
		return
	}

	ctx.body = {
		supportsIframes: !['SAMEORIGIN', 'DENY'].includes(response.headers['x-frame-options']),
	}
});

app.listen(process.env.PORT || 3000)
