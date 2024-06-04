const knex = require('knex')(require('../../knexfile').development);
const bcrypt = require('bcrypt');

module.exports = class {
    
    static getAllUser = async (req, res) => {
        try {
            const users = await knex('users').select('*')
            res.status(200).json(users)

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    };

    static getOneUser = async (req, res) => {
      try {
          let id = req.params.id;

          const users = await knex('users').where({id}).first();
          res.status(200).json(users)

      } catch (error) {
          res.status(500).json({error: error.message})
      }
  };


    static addUser = async (req, res) => {
        try {
            const {name, email, password} = req.body;
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const users = await knex('users').insert({ name, email, password: hashedPassword }).returning('users');
           
            res.status(201).json({ status: 'success', message: 'Berhasil ditambahkan', users });

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    };


    static updateUser = async (req, res) => {
      try {
          const {name, email, password} = req.body;
          let id = req.params.id;

          const users = await knex('users').where({id}).first();
            if (!users){
                throw new Error('Petugas tidak terdaftar');
            }
          
          let hashedPassword = users.password;
          if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
          }
  
          await knex('users').where({id}).update({name, email, password: hashedPassword });
          res.json({status: 201, message: 'Berhasil diubah'})

      } catch (error) {
          res.status(500).json({error: error.message})
      }
    };


    static deleteUser = async (req, res) => {
      try {
          const {id} = req.body;

          const delUser = await knex('users').where({id}).del();
          
          if (delUser) {
            res.json({status: 201, message: 'Berhasil dihapus'})
          } else {
            res.json({status: 404, message: 'Petugas tidak terdaftar'})
          }

      } catch (error) {
          res.status(500).json({error: error.message})
      }
    };
    
};