import express from 'express'
import { createStudent, deleteById, getStudentById, getStudents, updateById } from '../contoller/students.js'


const router = express.Router()

router.post('/create-student',createStudent)
router.get('/getAll',getStudents)
router.get('/student/:id',getStudentById)
router.put('/update-student/:id',updateById)
router.delete('/delete-student/:id',deleteById)

export default router;
