
const connection = require('../config/conexion.js');


function createGenre(req,res) {
    if(connection){
        const genre = req.body;
        let sql = 'INSERT INTO Genre set ?';
        if(!genre.name){
            return res.status(400).send({error: true, mensaje: "el genero no debe estar vacio"})

        }

        if(genre.name >50){
            return res.status(400).send({error: true, mensaje: "el genero no debe ser de 50 caracteres."})

        }
        connection.query(sql, [genre], (err, rows) => {
            if(err) {
                res.json(err)
            } else {
                res.json({error: false, data: rows, mensaje: "genero creado con éxito"})
            }
        })
    }
}

function getFilmsbyGenre(req,res){
    if(connection){
        const id =req.params.id;
        let sql = `select * from Film Where idGenre=${id}`;
        connection.query(sql, (err, films) => {
            if(err){
                res.send(err)
            } else {
                res.json(films);
            }
        })
    }
}

function deleteGenre(req,res){
    if(connection){
        const id = req.params.id;
        console.log('id',id)
        let sql = `DELETE FROM Genre WHERE id=${id}`
        connection.query(sql,(err)=>{
            if(err){
                res.json(err)
            }else{
                res.json({error:false,mensaje:"Genero borrado con exito"})
            }
        })
    }
}

function getGenre(req,res){
    if(connection){
        let sql ="select * from Genre";
        connection.query(sql,(err,genres)=>{
            if(err){
                    res.send(err)
            }else{
                res.json(genres)
            }
        })
    }
}



module.exports = {
    getGenre,
    createGenre,
    deleteGenre,
    getFilmsbyGenre
}