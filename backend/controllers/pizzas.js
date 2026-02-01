const Pizza = require("../models/pizza");
const asyncWrapper = require("../middleware/async");

const getAllPizzas = asyncWrapper(async (req, res) => {
  const pizzas = await Pizza.find({});
  res.status(200).json({ pizzas });
});

const createPizza = asyncWrapper(async (req, res) => {
  console.log("createPizza req ", req);
  const pizza = await Pizza.create(req.body);
  res.status(201).json({ pizza });
});

const getPizza = asyncWrapper(async (req, res, next) => {
  const { id: pizzaID } = req.params;
  const pizza = await Pizza.findOne({ _id: pizzaID });
  if (!pizza) {
    return next(createCustomError(`No pizza with id: ${pizzaID}`));
  }
  res.status(200).json({ pizza });
});

const deletePizza = asyncWrapper(async (req, res, next) => {
  const { id: pizzaID } = req.params;
  const pizza = await Pizza.findOneAndDelete({ _id: pizzaID });
  if (!pizza) {
    return next(createCustomError(`No pizza with id: ${pizzaID}`));
  }
});

const updatePizza = asyncWrapper(async (req, res, next) => {
  const { id: pizzaID } = req.params;
  const pizza = await Pizza.findOneAndUpdate({ _id: pizzaID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!pizza) {
    return next(createCustomError(`No pizza with id: ${pizzaID}`, 404));
  }
  res.status(200).json({ pizza });
});

module.exports = {
  getAllPizzas,
  createPizza,
  getPizza,
  updatePizza,
  deletePizza,
};
