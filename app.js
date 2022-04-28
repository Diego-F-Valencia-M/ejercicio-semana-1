//import express module
const express = require('express')

// Utils - connecting to database
const { db } = require('./utils/database');

//import routers
const {usersRouter} = require('./routes/users.routes')
const {repairsRouter} = require('./routes/repairs.routes')

//init express app
const app = express()

// Enable incoming JSON data
app.use(express.json());

//ENDPOINTS
//http://localhost:9000/api/v1/users - users endpoint
app.use('/api/v1/users', usersRouter)

//http://localhost:9000/api/v1/repairs - repairs endpoint
app.use('/api/v1/repairs', repairsRouter)

//autenticando base de datos
db.authenticate()
  .then(()=> console.log('exitosa la conexion'))
  .catch((err) =>  console.log(err))

//sincronizar modelos 
db.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

// Spin up server

//define the port
const PORT = 5000
//start server and listen request
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`)
})


