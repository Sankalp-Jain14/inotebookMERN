const connectToMongo = require('./db');
const express = require('express');


const app = express()
const port = 5000

app.use(express.json()) //using middleware to use req.body

// Available Routes
app.use('/api/auth',require('./routes/auth'))  //    /api/auth path pr jane ke liye ye(/routes/auth) file me jao
app.use('/api/notes',require('./routes/notes'))


app.listen (port,()=>{
    console.log(`iNotebook backend listening at http://localhost:${port}`)
   
})

connectToMongo();

  
  
  