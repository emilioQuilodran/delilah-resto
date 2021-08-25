const express = require('express');
const app = express();
const PORT = 6000;
const cors = require('cors');
const helmet = require("helmet");


app.use(cors());
app.use(helmet());
app.use(express.json());
/**
 * 
 * ir por base de datos primero
 */
const loginRoute = require("./routes/login.routes");
const registerRoute = require("./routes/register.routes");
const productsRoute = require("./routes/products.routes");
const ordersRoute = require("./routes/orders.routes");

app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

app.listen(PORT, () => {
    console.log("servidor iniciado en:" , PORT);
})