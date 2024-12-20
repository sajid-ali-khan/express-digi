import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

const arr = []
let nextId = 0

//home page
app.get("/", (req, res) => {
    return res.send("Hello, do you wanna do some CRUD operations?")
})


//get an item with index
app.get("/item/:id", (req, res) => {
    const tar = req.params.id

    if(tar >= arr.length){
        return res.status(404).send("Item not found")
    }

    return res.status(200).send(arr[tar])
})


//add an item with {name, qnty}, both strings
app.post("/item", (req, res) => {
    const {name, qnty} = req.body
    const newItem = {
        id: nextId++,
        name,
        qnty
    }

    arr.push(newItem)

    return res.status(201).send(newItem)
})


//remove an item with index
app.delete("/item/:id", (req, res) => {
    const tar = req.params.id

    if (tar >= arr.length){
        return res.status(404).send("Item not found")
    }
    const removedItem = arr[tar]
    arr.splice(parseInt(req.params.id), 1)
    return res.status(200).send(removedItem)
})


//update an item with index, also provide {name, qnty}
app.put("/item/:id", (req, res) => {
    const tar = req.params.id

    if(tar >= arr.length){
        return res.status(404).send("Item not found")
    }

    const {name, qnty} = req.body

    arr[tar].name = name
    arr[tar].qnty = qnty

    return res.status(404).send(arr[tar])
})


//to list all the items
app.get("/items", (req, res) => {
    return res.status(200).send(arr)
})

app.listen(port, () => {
    console.log(`The server is live on port:${port}...`)
})