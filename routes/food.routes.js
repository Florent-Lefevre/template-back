const connection = require('../db-config');
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM food', (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving food from database');
        } else {
            res.json(result);
        }
    })
});

router.get('/:id', (req, res) => {
    const foodId = req.params.id;
    connection.query(
        'SELECT * FROM food WHERE id = ?',
        [foodId],
        (err, results) => {
            if (err) {
                res.status(500).send('Error retrieving food from database')
            } else {
                if (results.length) res.json(results[0])
                else res.status(404).send('Food not found')
            }
        }
    )
})

router.post('/', (req, res) => {
    const {name, image, category, calories, price} = req.body;
    connection.query(
        'INSERT INTO food (name, image, category, calories, price) VALUES (?, ?, ?, ?, ?)',
        [name, image, category, calories, price],
        (err, result) => {
            if (err) {
                res.status(500).send('Error saving food')
            } else {
                const id = result.insertId;
                const createdFood = {id, name, image, category, calories, price};
                res.status(201).json(createdFood)
            }
        }
    )
})

router.put('/:id', (req, res) => {
connection.query(
    'UPDATE food SET ? WHERE id = ?',
    [req.body,req.params.id],
    (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send('Error updating food');
    } else {
        if (result.affectedRows)
        {
        const updatedFood={id:req.params.id,name:req.body.name,image:req.body.image,category:req.body.category,calories:req.body.calories,price:req.body.price}
        res.status(200).json(updatedFood);
        } 
        else res.status(404).send('Food not found.');
    }
    }
);
});

router.delete('/:id', (req, res) => {
connection.query(
    'DELETE FROM food WHERE id = ?',
    [req.params.id],
    (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send('Error deleting food');
    } else {
        if (result.affectedRows) res.status(200).send('🎉 Food deleted!');
        else res.status(404).send('Food not found.');
    }
    }
);
});

module.exports = router;