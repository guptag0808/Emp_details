const express = require('express');
const Emprouter = express.Router();
const {Employee }= require('../model/employee');


Emprouter.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    
    const employee = new Employee({
      firstName,
      lastName,
      email,
      department,
      salary
    });


    const savedEmployee = await employee.save();

    res.status(201).json({ message: 'Employee added successfully', employee: savedEmployee });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

Emprouter.get("/all",async(req,res)=>{
try{
	const allemp= await Employee.find()
	res.send(allemp)
}catch(err){
	console.log(err)
}
})

// Route to delete an employee
Emprouter.delete('/employees/:id', async (req, res) => {
	try {
	  const { id } = req.params;
      console.log(id)
	  // Find and delete the employee by ID
	  const deletedEmployee = await Employee.findByIdAndDelete(id);
  
	  if (!deletedEmployee) {
		return res.status(404).json({ message: 'Employee not found' });
	  }
  
	  res.status(200).json({ message: 'Employee deleted successfully' });
	} catch (error) {
	  console.error('Error deleting employee:', error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });
  

module.exports = {Emprouter};
