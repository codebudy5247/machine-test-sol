var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

/* Getting our register client route */
router.post("/", function (req, res, next) {
  const user = {
    Name:req.body.Name,
    PhoneNumber:req.body.PhoneNumber,
    Email_id:req.body.Email_id,
    Password:req.body.Password,
  };

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  fetch("http://localhost:5000/api/user/signup", option).then((response) => {
    response.json().then(function (data) {
      if (data.status) {
        req.flash("success", data.msg);
        res.redirect("/");
      } else {
        req.flash("error", data.error);
        res.redirect("/");
      }
    });
  });
});

module.exports = router;