const express = require("express");
const router = express.Router();
const customersSchema = require("../models/customerModel");

router.get("/", async (req, res) => {
  await customersSchema
    .find().populate('tickets')
    .populate('pcBuilds')
    .then((customer) => res.json(customer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  customersSchema
    .findById(req.params.id)
    .then((customer) => res.json(customer))
    .catch((err) => res.json("Error: +err"));
});

router.post("/", (req, res) => {
  const newCustomer = new customersSchema({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });

  newCustomer
    .save()
    .then((customer) => res.json("New customer Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  customersSchema
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("customer deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", (req, res) => {
  customersSchema
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.json("customersSchema updated"))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;
