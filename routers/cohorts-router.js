const router = require('express').Router();
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.get('/', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    const cohortId = req.params.id;

    db('cohorts')
        .where({ id: cohortId })
        .first()
        .then(cohort => {
            if(!cohort) {
                res.status(400).json({ message: 'The cohort with the specified ID does not exist.' })
            }
            res.status(200).json(cohort)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    if(!name) {
        res.status(406).json({ message: 'Please provide a name to add a cohort'})
    }
    db('cohorts')
        .insert({ name })
        .then(cohort => {
            res.status(201).json(cohort)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.delete('/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(cohort => {
            if(!cohort) {
                res.status(404).json({ message: 'The cohort with the specified ID does not exist.' })
            }
            res.status(200).json({ success: 'cohort successfully removed.' })
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.put('/:id', (req, res) => {
    const { name } = req.body;
    if(!name) {
        res.status(400).json({ message: 'Please provide a name to update cohort.' })
    }
    db('cohorts')
        .where({ id: req.params.id })
        .update({ name })
        .then(cohort => {
            res.status(202).json(cohort)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

module.exports = router;