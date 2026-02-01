const express = require("express");
const router = express.Router();

const {
  getAllPizzas,
  createPizza,
  getPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzas");

router.route("/").get(getAllPizzas).post(createPizza);
router.route("/:id").get(getPizza).patch(updatePizza).delete(deletePizza);

module.exports = router;
