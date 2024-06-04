var express = require('express');
var router = express.Router();
const checkUser = require('../app/middleware/middlewareUser');

/* GET users listing. */
router.get('/', checkUser.checkSession, function(req, res) {
    res.render('petugas/index', { title: 'Sistem Informasi Keamanan dan Ketertiban Masyarakat Malinau' });
});

router.get('/create', checkUser.checkSessionKode, function(req, res) {
    res.render('petugas/create', { title: 'Sistem Informasi Keamanan dan Ketertiban Masyarakat Malinau' });
});

router.get('/profile/:id', checkUser.checkSession, function(req, res) {
    res.render('petugas/profile', { title: 'Sistem Informasi Keamanan dan Ketertiban Masyarakat Malinau' });
});

module.exports = router;