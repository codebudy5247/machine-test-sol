const express = require("express");
const router = express.Router();
const Data = require("../Models/data");


//Inserting Data in DB
// router.post("/insert-data", async (req, res) => {
//   try {
//     const data = req.body;

//     const newData = new Data({
//       ...data,
//     });

//     const data = await newData.save();
//     console.log(data);

//     res.status(201).json(data);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// });

//Deleting Data in DB
router.post("/delete-data", async (req, res) => {
  const data = await Data.findById(req.params.id)

  if (data) {
    await data.remove()
    res.json({ message: 'Data removed' })
  } else {
    res.status(404).json({ message: "Not Found" });
    
  }
});

module.exports = router;
