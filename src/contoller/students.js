import db from "../db.js"

// create student 
export const createStudent = async (req, res) => {
    try {
      const { firstName, lastName, email, dateOfBirth } = req.body;
  
      // Basic validation
      if (!firstName || !lastName || !email || !dateOfBirth) {
        return res.status(400).send({ message: 'All fields are required' });
      }
  
      const [result] = await db.query(
        'INSERT INTO students (firstName, lastName, email, dateOfBirth) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, dateOfBirth]
      );
  
      // Send response with the newly inserted student ID and data
      res.status(201).send({ id: result.insertId, firstName, lastName, email, dateOfBirth });
  
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
// get all student
export const getStudents = async (req, res) => {
    try {
      const [students] = await db.query('SELECT id, firstName, lastName, email, DATE_FORMAT(dateOfBirth, "%Y-%m-%d") as dateOfBirth FROM students');
      res.status(200).send(students);
  
    } catch (error) {
      console.error("Error in getStudents: ", error)
      res.status(500).send({ error: error.message });
    }
  };

// get student by id
export const getStudentById = async (req, res) => {
    try {
      const { id } = req.params;
      const [student] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
  
      if (student.length === 0) {
        return res.status(404).send({ message: 'Student not found' });
      }
  
      res.status(200).send(student[0]); // Send the first student object
  
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

// update student by id 
export const updateById = async (req, res) => {
    try {
      const { firstName, lastName, email, dateOfBirth } = req.body;
      const { id } = req.params;
  
      // Check if the student exists
      const [student] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
      if (student.length === 0) {
        return res.status(404).send({ message: 'Student not found' });
      }
  
      // Perform the update
      await db.query(
        'UPDATE students SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ? WHERE id = ?',
        [firstName, lastName, email, dateOfBirth, id]
      );
  
      // Fetch the updated student details
      const [updatedStudent] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
  
      res.status(200).send({
        message: 'Student updated successfully',
        student: updatedStudent[0]
      });
  
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

// delete student by id
export const deleteById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the student exists
      const [student] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
      if (student.length === 0) {
        return res.status(404).send({ message: 'Student not found' });
      }
  
      // Perform the deletion
      await db.query('DELETE FROM students WHERE id = ?', [id]);
  
      res.status(200).send({ message: 'Student deleted successfully' });
  
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };