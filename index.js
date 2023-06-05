require('dotenv').config();
const express = require('express');
const app = express();

const userRoutes = require('./server/routes/user');
const noteRoutes = require('./server/routes/note');

app.use(express.json());



app.use(function(_req,res,next){
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
res.header("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, OPTIONS");
next();
});

app.use("/user",userRoutes);
app.use("/note",noteRoutes);

app.use(express.static(__dirname + "/public"));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on port ' +PORT));