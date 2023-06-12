//Mysql
const mysql2 = require('mysql2')
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin1234',
    database: "test"
});
//to test the connection.
// connection.connect((err)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("connected to the database");
//     }
// })
//Express
const express = require('express')
const app = express()


//api for get countries
app.get("/api/getCountries", (req, res)=> {
    getCountries(req, res)
    
})

//api get countries by id
app.get("/api/getCountryById/:id",async (req, res)=> { ///api/getCountries/10
    const id = req.params.id 
    // getCountriesById(id)
    // .then((result)=> {res.json(result)})
    // .catch((err)=> {res.status(500).send("error in the database " + err)})
    try {
        const result = await getCountriesById(id)
        res.send(result)
    } catch (err) {
        res.status(500).send("error in the database " + err)
    }
})

//function now changed to return promise.
const getCountriesById = (id) => {
    return new Promise ((resolve, reject)=> {
        const query2 = `select * from countries where id = ?`
        connection.query(query2, [id], (err, result)=> {
            if (err) { 
                reject(err)          
                // res.status(500).send("error in the database " + err)
            } else {
                resolve(result)
                // console.log(result);
                // res.json(result)
            }
        })
    })
    
}

//function which will get countries from the database
const getCountries = (req, res)=> {
    const query1 = 'select * from countries'
    connection.query(query1, (err, result)=> {
        if (err) {
            // console.log("error in the database " + err);
            res.status(500).send("error in the database " + err)
        } else {
            // console.log(result);
            res.json(result)
        }
    })
}

// const getCountriesByIdQuery = (id) => {
//     const query2 = `select * from countries where id = ${id}`
//     connection.query(query2, (err, result)=> {
//         if (err) {
//             console.log("error in the database " + err);
//         } else {
//             console.log(result);
//         }
//     })
// }

const countryObj = {
    Name : "Bulgary" 
}

const insertCountry = (object) => {
   
    const query3 = `insert into countries (Name) values  ("${object.Name}")`
    connection.query(query3, (err, result)=> {
        if (err) {
            console.log("error in the database " + err);
        } else {
            console.log("success insert");
            console.log(result);
        }
    })
}


const deleteFromCountries = (id)=> {
    connection.query(`delete from countries where id = ${id}`, (err, result)=> {
        if (err) {
            console.log("error in the database " + err);
        } else {
            console.log("success insert");
            console.log(result);
        }
    })
}

const insertToTheCoutries = (id)=> {
    connection.query(`insert into countries where id = ${id}`, (err, result)=> {
        if (err) {
            console.log("error in the database " + err);
        } else {
            console.log("success insert");
            console.log(result);
        }
    })
}

// insertToTheCoutries(3)

//insertCountry(countryObj)




// getCountriesByIdQuery(1)


// const getCountriesById = (idToGet)=> {
//     const query1 = 'select * from countries'
//     connection.query(query1, (err, result)=> {
//         if (err) {
//             console.log("error in the database " + err);
//         } else {
//             result.forEach(row => {
//                 if (row.Id===idToGet) {
//                     console.log(row);
//                 }
//             });
            
//         }
//     })
// }






const port = 3000
app.listen(port, (err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log("server is up and listening on port "+ port);
    }
})