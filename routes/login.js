var express = require('express');
var router = express.Router();
const loginController = require('../app/controller/loginController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login/index', { title: 'Sistem Informasi Keamanan dan Ketertiban Masyarakat Malinau' });
});

router.post('/ceklogin', loginController.cekLogin);
router.post('/cekkode', loginController.cekKode);
router.post('/ceklogout', loginController.cekLogout);
router.post('/cekkode', loginController.cekKode);

module.exports = router;