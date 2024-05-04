const express = require('express')
const app = express()
app.use(express.json()) //Tapahtumankäsittelijäfunktio pääsee dataan käsiksi olion request kentän body avulla
const cors = require('cors');
app.use(cors())
let cars = [
 
      {
        "id": 10,
        "name": "Toyota Hilux",
        "number": "JMC0000010",
        "progress":false,
        "aloitus":false,
        "keskeyta":false,
        "aika":" ",
        "delDate": "06.05.2024",
        "checkboxes": {
          "vip": false,
          "accessories": false,
          "location": false
        }
      }   
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/cars', (request, response) => {
  response.json(cars)
})
app.get('/api/cars/:id', (request, response) => {
    const id = Number(request.params.id)
    const car = cars.find(car => car.id === id)
    if (car) {
        response.json(car)
      } else {
        response.status(404).end()
      }
  })
  app.delete('/api/cars/:id', (request, response) => {
    const id = Number(request.params.id)
    cars = cars.filter(car => car.id !== id)
  
    response.status(204).end()
  })
  const generateId = () => {
    const maxId = cars.length > 0
      ? Math.max(...cars.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/cars', (request, response) => {
    const body = request.body
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'car missing' 
      })
    }
  
    const car = {
       
        id: generateId(),
        name: body.name,
        number: body.number,
        progress:body.progress,
        aloitus:body.aloitus,
        keskeyta:body.keskeyta,
        aika:body.aika,
        delDate: body.delDate,
        checkboxes: {
          vip: body.checkboxes.vip,
          accessories: body.checkboxes.accessories,
          location: body.checkboxes.location
        }
    }
      
     
  
    cars = cars.concat(car)
  
    response.json(car)
  })

//ympäristömuuttuja jonka render konfiguroi
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})