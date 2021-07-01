var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

router.post("/", function (req, res, next) {
  const user = {
    PhoneNumber: req.body.PhoneNumber,
    Password: req.body.Password,
  };

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  fetch("http://localhost:9000/api/user/signin", option).then((response) => {
    response.json().then(function (data) {
      if (data.status) {
        console.log(data);
        res.redirect("/");
      } else {
        req.flash("error", data.error);
        res.redirect("/");
      }
    });
  });
});

module.exports = router;