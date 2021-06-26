var route = require('express').Router()

route.get("/", (req, res) => {
	if(req.signedCookies.username != "phamhoa219") res.redirect("/login")
	else res.render("index",{username:req.signedCookies.username})
})

module.exports = route