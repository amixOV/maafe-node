const express = require('express');
const router = express.Router();

let todoList = [
    {
        todoText: "לקנות ביצים",
        completed: true
    },
    {
        todoText: "להכין חביתה",
        completed: false
    },
    {
        todoText: "לנקות כלים",
        completed: false
    }
];
let aaa = "i am let "
console.log(aaa);

router.get("/", function (req, res) {
    res.json(aaa);
})

router.get("/:id", function (req, res) {
    // res.json(todoList);
    console.log(aaa);
    
    aaa += req.params.id + " ";  
 
    res.json(aaa)
 })
router.get('/' , (req, res) => {
   res.status('200').send(`
   <h4>  
   ${todoList[2].todoText}
   </h4>
   <h4>  
   ${todoList[2].completed}
   </h4>
   <button id="butt">asdas
   </button>
   <script src="./script/index.js">
   </script>
   `)
})

router.post('/' , (req, res) => {
    let {todoText,completed} = req.body;
    todoList.push({todoText,completed})
    res.json(todoList);
 })

 router.put('/' , (req, res) => {
     let boll = !req.body
    res.status('200').send(boll)
 })

 router.delete('/' , (req, res) => {
    res.status('200').send('sssssss')
 })

module.exports = router;