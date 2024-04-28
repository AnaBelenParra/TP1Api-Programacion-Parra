import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try{
     const data = fs.readFileSync("./db.json")
     return JSON.parse(data);
    } catch(error){
        console.log(error)
    }
};

const writeData = (data) => {
    try{
         fs.writeFileSync("./db.json", JSON.stringify(data))
    } catch(error){
        console.log(error)
    }
};

app.get("/", (req, res) => {
    res.send("Bienvenido a mi API!");
});

app.get("/Ropa", (req, res) => {
    const data = readData();
    res.json(data.Ropa);
});

app.get("/Ropa/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const Ropa = data.Ropa.find((Ropa) => Ropa.id ===id);
    res.json(Ropa);
});

app.post("/Ropa", (req, res) => {
    const data = readData();
    const body =req.body;
    const newRopa = {
        id: data.Ropa.length +1,
        ...body, 
    };
    data.Ropa.push(newRopa);
    writeData(data);
    res.json({Message: "Ropa nueva"});
});

app.put("/Ropa/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const RopaIndex = data.Ropa.findIndex((Ropa) => Ropa.id === id);
    data.Ropa[RopaIndex] = {
        ...data.Ropa[RopaIndex],
        ...body,
    };
    writeData(data);
    res.json({Message: "Prenda actualizada" });
});

app.delete("/Ropa/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const RopaIndex = data.Ropa.findIndex((Ropa) => Ropa.id === id);
    data.Ropa.splice(RopaIndex, 1);
    writeData(data);
    res.json({ Message: " Prenda Eliminada"});
    
})

app.listen(3000, () => {
    console.log("Server Listening on port 3000");
});
