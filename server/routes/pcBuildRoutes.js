const express = require("express");
const router = express.Router();
const PCBuild = require("../models/PCBuildModel");
const Customer = require("../models/customerModel");
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(async (req, res) => {
  await PCBuild.find()
    .then((pcBuild) => res.json(pcBuild))
    .catch((err) => res.status(400).json("Error: " + err));
}));

router.get("/:id", (req, res) => {
  PCBuild.findById(req.params.id)
    .then((pcBuild) => res.json(pcBuild))
    .catch((err) => res.json("Error: +err"));
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { cpu, motherboard, memory, gpu, pcCase, powerSupply, storage, cpuCooler, status, customerPhone} = req.body;
    const customer = await Customer.findOne({ phone: customerPhone });

    if (customer) {
      const pcBuild = await PCBuild.create({
        cpu,
        motherboard,
        memory,
        gpu,
        pcCase,
        powerSupply,
        storage,
        cpuCooler,
        status,
        customerPhone,
      });

      customer.pcBuilds.push(pcBuild._id);
      customer.save();
      res.status(201).json(pcBuild);
    } else {
      res.status(400);
      throw new Error("Customer does not exists");
    }
  })
);

router.delete("/:id", (req, res) => {
  PCBuild.findByIdAndDelete(req.params.id)
    .then(() => res.json("pcBuild deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", (req, res) => {
  PCBuild.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.json("pcBuild updated"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;