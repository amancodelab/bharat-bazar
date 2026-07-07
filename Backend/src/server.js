require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectedToDb = require("./database/db");
const sellerRoutes = require("./routes/sellerRoutes");
const adminRoutes = require("./routes/adminRouter");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require('./routes/productRouter');
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require('./routes/orderRoutes');
const sellerOrderRoutes = require('./routes/sellerOrderRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const transactionRoutes = require('./routes/transactionRouter');
const sellerReportRoutes = require('./routes/sellerReportRoutes');
const dealRoutes = require('./routes/DealRoutes');
const homeCategoryRoutes = require('./routes/homeCategoryRoutes');
const homepageRoutes = require('./routes/homepageRoutes');
const couponRoutes = require('./routes/couponRoutes')
const mainCategoryRouter = require('./routes/mainCategoryRouter');
const electronicRoutes = require("./routes/electronicRoutes");
const shopCategoryRoutes = require("./routes/shopCategoryRoutes");
const gridRoutes = require("./routes/gridRoutes");
const bannerRouter = require('./routes/bannerRoutes');
const authRouter = require('./routes/authRouter');
const cookieParser = require("cookie-parser");




const app = express();


// connecting the db
connectedToDb();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/seller", sellerRoutes);
app.use("/admin", adminRoutes);
app.use('/user', userRoutes);
app.use("/auth", authRouter);
app.use('/product', productRoutes);
app.use("/cart", cartRoutes);
app.use('/order/seller', sellerOrderRoutes);
app.use("/order", orderRoutes);
app.use('/payment', paymentRoutes);
app.use('/transaction', transactionRoutes);
app.use('/seller-report', sellerReportRoutes);
app.use('/deal', dealRoutes);
app.use('/coupon', couponRoutes);
app.use("/electronic", electronicRoutes);
app.use("/shop-category", shopCategoryRoutes);
app.use('/home-category', homeCategoryRoutes);
app.use('/maincategories', mainCategoryRouter);
app.use("/grid", gridRoutes);
app.use('/banner', bannerRouter);
app.use('/home', homepageRoutes);

// home route

app.get("/", (req, res) => {
  console.log("This is home page");
  res.status(200).json({
    status: 200,
    msg: "Welcome to Bharat bazar"
  });
});

// port connection
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`The Server is Live at Port:${PORT}`)
});

