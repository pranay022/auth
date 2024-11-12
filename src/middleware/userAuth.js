const express = require("express");
const db = require("../models/index");
const saveUser = async (req, res, next) => {
  try {
    const username = await db.Auth.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (username) {
      return res.status(409).send("username already taken");
    }
    const emailcheck = await db.Auth.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailcheck) {
      return res.status(409).send("Authentication failed");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error ------------");
  }
};
module.exports = {
  saveUser,
};
