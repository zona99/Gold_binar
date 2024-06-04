const knex = require('knex')(require('../../knexfile').development);
const bcrypt = require('bcrypt');

module.exports = class {
    
    static cekLogin = async (req, res) => {
        try {
            const {email, password} = req.body;

            const users = await knex('users').where({ email }).first();
                if (users && await bcrypt.compare(password, users.password)){
                    req.session.usersId = users.id;
                    res.status(201).json({ status: 'success' });
                } else {
                    res.status(401).json({ status: 'error', message: 'Email atau kata sandi salah' });
                }
              
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    };

    static cekLogout = async (req, res) => {
        try {
            req.session.destroy(err => {
                if (err) {
                    return res.render('index', { message: 'Error logging out' });
                }
                res.render('index', { message: 'Logout successful' });
            });
        } catch {
            res.status(500).json({error: error.message})
        }
    };

    static cekKode = async (req, res) => {
        try {
            const {kode} = req.body;

            const kodeRahasia = '$2b$10$Ozry6u4Pvh44VLYhUYkK7uYmaWYVXbN0.MjqQKUi3WjerB56uEWuW';

                if (await bcrypt.compare(kode, kodeRahasia)){
                    req.session.rahasiaId = kodeRahasia;
                    res.status(201).json({ status: 'success' });
                } else {
                    res.status(401).json({ status: 'error', message: 'Kode rahasia salah' });
                }

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    };

};