const bodyParser = require('body-parser')
const request = require('request')
const express = require('express')

const app = express()
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'
const HEADERS = {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer WcmPGWi6J7Z8F6SJMi0+9gAF9wUw7cwPxEjQ9EEhc6Sfe+O9UPcFnRGHf4speBKINPXjZ6WfOqbcSSJJbWNIAzEyIR1+d+rD1NAvCHFt77WTx1WXSjEGwIN1z3VPrx/BI/2J8nLDFS6iD1rW28ytCgdB04t89/1O/w1cDnyilFU='
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Push
app.get('/webhook', (req, res) => {
	// push block
	let msg = 'Hello World!'
	push(msg)
	res.send(msg)
})

// Reply
app.post('/webhook', (req, res) => {
	// reply block
	let reply_token = req.body.events[0].replyToken
	let msg = req.body.events[0].message.text
	reply(reply_token, msg)
})

function push(msg) {
	let body = JSON.stringify({
		// push body
		to: 'U4039fa1eef2d0b03345c0ce8a7bd52b3',
		messages: [
			{
				type: 'text',
				text: msg
			}
		]
	})
	curl('push', body)
}

function reply(reply_token, msg) {
	let body = JSON.stringify({
		// reply body
		replyToken: reply_token,
		messages: [
			{
				type: 'text',
				text: msg
			}
		]
	})
	curl('reply', body);
}

function curl(method, body) {
	request.post({
		url: 'https://api.line.me/v2/bot/message/' + method,
		headers: HEADERS,
		body: body
	}, (err, res, body) => {
		console.log('status = ' + res.statusCode)
	})
}

app.listen(port, hostname, () => {
	console.log(`Server running at ` + process.env.PORT)
})