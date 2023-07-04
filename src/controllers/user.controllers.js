const catchError = require('../utils/catchError');
const user = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await user.findAll();
    return res.json(users)
});

const create = catchError(async(req, res) => {
    // Operaciones...
    const {first_name, last_name,email,password,birthday} = req.body;
    const users = await user.create({
        first_name,
        last_name,
        email,
        password,
        birthday
    })
    return res.status(201).json (users);
});
 
const getOne = catchError(async(req,res)=>{
    const {id} = req.params;
    const users = await user.findByPk(id);
    return res.json(users);
})

const remove = catchError (async(req,res) => {
    const {id} = req.params;
    await user.destroy({where: {id:id}});
    return res.sendStatus(204);
})
const update = catchError(async(req,res) =>{
    const {id} = req.params;
    const {first_name, last_name, email, password,birthday} = req.body;
    const users = await user.update ({
        first_name,
        last_name,
        email,
        password,
        birthday
    },{where: {id:id},returning:true}); //returning sirve para que nos devuelva el dato actualizado. 
                                        //sino retorna la cantidad.
    return res.json(users);
    
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}