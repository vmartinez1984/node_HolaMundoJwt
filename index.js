const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const secret = "VineAComalaABuscarAMiPadreUnTalPedroParamo";

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  //La consulta de la credencailes es a base de datos
  if (
    req.body.usuario == "ahal_tocob@hotmail.com" &&
    req.body.contrasenia == "123456"
  ) {
    const token = jwt.sign(
      { nombre: "Víctor Mtz", encodedKey: "67f5c6b7997e4eedab8b580e" },
      secret,
      {
        expiresIn: "20m",
      }
    );
    console.log("Ok")
    res.status(200).json({token: token});
  } else {
    return res.status(401).json({ message: "Authentication failed" });
  }
});

function verifyToken(req, res, next){
    const header = req.header("Authorization") || ""
    const token = header.split(" ")[1]
    if (!token) {
      return res.status(401).json({ message: "Token not provied" });
    }
    try {
        const payload = jwt.verify(token, secret)
        console.log(payload)
        next()
    } catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
}

app.get("/protected", verifyToken, (req, res) => {
  return res.status(200).json({ message: "You have access" });
});

app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}`);
});
