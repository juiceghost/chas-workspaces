const express = require('express');
const router = express.Router();

router.get(
  '/tutorials',
  (req, res, next) => {
    res.json({
      message: 'You made it to the all tutorials route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

module.exports = router;