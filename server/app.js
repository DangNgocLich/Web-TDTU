const express = require('express')
const next = require('next')
const mongodb = require('./mongo');
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io')

const port = 5000;
const dev = process.env.NODE_ENV !== 'production'
const appNext = next({ dev })
const handle = appNext.getRequestHandler()

const route = require('./routes/index')

const app = express()
mongodb
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('../public','public'));
app.use(cors())
app.use(express.urlencoded({ extended: false }))


app.use('/api', route)

app.get('*', (req, res) => {
        return handle(req, res)
    })
    // const httpServer =
app.listen(port, (err) => {
        if (err) throw err
        console.log('> Server listening on port:', port)
    })
    // const io = socketio(httpServer)
    // io.on('connection', client => {
    //         console.log(`Client ${client.id} has connected`)
    //     })
    // appNext.prepare()