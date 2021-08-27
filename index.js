const express = require('express');
const app = express();
const PORT = 6000;
const cors = require('cors');
const helmet = require("helmet");

app.use(cors());
app.use(helmet());
app.use(express.json());

const userRoute = require("./routes/user.routes");
const productsRoute = require("./routes/products.routes");
const ordersRoute = require("./routes/orders.routes");

app.use('/api/user', userRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

app.listen(PORT, () => {
    console.log("servidor iniciado en:" , PORT);
})