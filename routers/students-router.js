const router = require('express').Router();
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.get('/', (req, res) => {
    db('students')
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    const studentId = req.params.id;

    db('students')
        .where({ id: studentId })
        .first()
        .then(student => {
            if(!student) {
                res.status(400).json({ message: 'The student with the specified ID does not exist.' })
            }
            res.status(200).json(student)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.post('/', (req, res) => {
    const { name, cohort_id } = req.body;
    if(!name || !cohort_id) {
        res.status(406).json({ message: 'Please provide a name and id to add a student'})
    }
    db('students')
        .insert({ 
            name, 
            cohort_id
        })
        .then(student => {
            res.status(201).json(student)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.delete('/:id', (req, res) => {
    db('students')
        .where({ id: req.params.id })
        .del()
        .then(student => {
            if(!student) {
                res.status(404).json({ message: 'The student with the specified ID does not exist.' })
            }
            res.status(200).json({ success: 'Student successfully removed.' })
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.put('/:id', (req, res) => {
    const { name, cohort_id } = req.body;
    if(!name || !cohort_id ) {
        res.status(400).json({ message: 'Please provide a name and ID to update student.' })
    }
    db('students')
        .where({ id: req.params.id })
        .update({ 
            name, 
            cohort_id 
        })
        .then(student => {
            res.status(202).json(student)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

module.exports = router;