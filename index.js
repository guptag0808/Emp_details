const express = require('express');
const {connection} = require("./db")
const {router}= require("./routes/userRoutes")
const {Emprouter} =require("./routes/employee")
const cors = require("cors")
const app = express();
const PORT = 3000;
app.use(express.json())
app.use(cors())
app.use("/",router)
app.use("/",Emprouter)


app.listen(PORT, async() => {
	try{
		await connection 
		console.log("Connected to Db")
	}catch(err){
		console.log(err)
	} 
  console.log(`Server is running on port ${PORT}`);
});
