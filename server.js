const express = require('express');
const app = express();
const port = 3000;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Personal Budget API',
            version: '1.0.0',
            description: 'Personal Budget API autogenerated by me',    
        },
        host: 'localhost:3000',
        basePath: '/',
    },
    apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

const prices = {
    food: [
        {
            name: 'apple',
            price: 1,
        },
        {
            name: 'orange',
            price: 2,
        },
        {
            name: 'banana',
            price: 3,
        },
    ]
}

/**
 * @swagger
 * /prices:
 *    get:
 *      description: Return all prices 
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object food containing array of food obj with prices
 *          404:
 *              description: Error
 */
app.get('/prices', (req, res) => {
    res.json(prices);
});

/**
 * @swagger
 * /prices:
 *    post:
 *      description: Add a new food item
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: New food added
 *          404:
 *              description: Error
 */
app.post('/prices', (req, res) => {
    const foodItem = req.body;
    prices.food.push(foodItem);
    res.json(prices);
});

/**
 * @swagger
 * /prices:
 *    patch:
 *      description: Update the name of an item
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Food Name updated
 *          404:
 *              description: Error
 * 
 */
app.patch('/prices', (req, res) => {
    res.json(prices);
});

/**
 * @swagger
 * /prices:
 *    put:
 *      description: Update the price of an item
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Food Price updated
 *          404:
 *              description: Error
 */
app.put('/prices', (req, res) => {
    res.json(prices);
});

/**
 * @swagger
 * /prices:
 *    delete:
 *      description: delete a food item
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Food item deleted
 *          404:
 *              description: Error
 */
app.delete('/prices:', (req, res) => {
    const foodItem = req.params.foodItem;
    res.json(prices);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
})