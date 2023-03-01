const app = require("express")();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
const cookieparser = require("cookie-parser"); app.use(cookieparser());
const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "thet",
    password: "1111",
    database: "firstapp"
})

app.set("view engine", "ejs");
app.get("/home", (req, resp) => {
    console.log(req.cookies)
    console.log(req.cookies.userid)
    const id = req.cookies.userid;
    con.query(`select id,title,note from notetext where forkey=${id} `, (err, result) => {
        console.log(result);
        if (err) throw err;
        resp.render("home",{result:result});   
    })
    
})
app.post("/", (req, res) => {
    return res.json({
        message: "success"
    })
})
app.get("/register", (req, resp) => {

    resp.render("register")
})
app.post("/register", (req, resp) => {
    const name = req.body.user;
    const pass = req.body.pass;
    console.log(name);
     
    con.query(`select * from noteid where name = "${name}"And password="${pass}" `, (err, result) => {
        
        console.log(result)
      
        if (err) throw err;
        if (result.length > 0) {
            resp.redirect("/register")
        }else{
    con.query(`insert into noteid (name,password)values("${name}","${pass}")`, (err, result) => {
        console.log(result);
        if (err) throw err;
        con.query(`select id from noteid where name = "${name}"And password="${pass}" `, (err, result) => {
            console.log(result[0].id);
            const id = result[0].id;
            resp.cookie("userid", id);
            resp.redirect("/home")
        })
       
    })}


})})

app.get("/login", (req, resp) => {

    resp.render("login");
})



app.post("/login", (req, resp) => {
    const user = req.body.user;
    const pass = req.body.pass;
    
    con.query(`select id from noteid where name = "${user}"And password="${pass}" `, (err, result) => {
        console.log(result[0].id);
        console.log(result)
        const id = result[0].id;
        if (err) throw err;
        if (result.length > 0) {
            console.log("cookie is goin gto set")
            resp.cookie("userid", id);
            resp.redirect("/home")   
        }
        else {
            resp.render("login")
        }
       
    })
  


})

app.get("/notes", (req, resp) => {
    console.log(req.query)
    const note = req.query;
    const title=req.query.title;
    const text= req.query.note;
    const userid= req.query.userid;
    console.log("hi",userid);
    con.query(`insert into notetext (title,note,forkey)values("${title}","${text}","${userid}")`,(err,result)=>{
        console.log(result);
        console.log("successfully inserted!")
    })
    
    resp.redirect("/home")  
})
app.get("/delete",(req,resp)=>{
    console.log(req.query.id);
    console.log(req.query);
con.query(`delete from notetext where id ="${req.query.id}"`,(err,result)=>{
    console.log(result);
})
    console.log("delete id")
    resp.send("DELETE SUCCESSFUL!");

  
})
app.listen(5004)