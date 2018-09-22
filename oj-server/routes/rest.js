let express = require('express');
let router = express.Router();
let problemService = require("../services/problemService");
let bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get("/problems", (req, res)=>{
  problemService.getProblems().
  then(problems=>res.json(problems));
})

router.get("/problems/:id", (req, res)=>{
  let id = req.params.id;
  problemService.getProblem(+id).
  then(problem=>res.json(problem));
})

router.post("/problems", (req, res)=>{
  problemService.addProblem(req.body).
  then(problem=>res.json(problem)).
  catch(err=>res.status(400).send("Problem name alreay exists!"));
})

module.exports = router;
