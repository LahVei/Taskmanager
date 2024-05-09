const express = require('express')
const app = express()
app.use(express.json()) //Tapahtumankäsittelijäfunktio pääsee dataan käsiksi olion request kentän body avulla
const cors = require('cors');
app.use(cors());
// Expressin näyttää staattista sisältöä eli sivun index.html ja sen lataaman JavaScriptin ym.
//tarkastaa Express GET-tyyppisten HTTP-pyyntöjen yhteydessä ensin löytyykö pyynnön polkua vastaavan 
//nimistä tiedostoa hakemistosta dist. Jos löytyy, palauttaa Express tiedoston 
app.use(express.static('dist'));
let cars = [
 
  {
    "id": 1,
    "name": "Toyota Hilux",
    "number": "JMC0000001",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "07.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": false,
      "location": false
    }
  },
  {
    "id": 2,
    "name": "Toyota Hilux",
    "number": "JMC0000002",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "19.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": false,
      "location": false
    }
  },
  {
    "id": 3,
    "name": "Toyota Hilux",
    "number": "JMC0000003",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "15.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": false,
      "location": false
    }
  },
  {
    "id": 4,
    "name": "Toyota Hilux",
    "number": "JMC0000004",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "13.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": true,
      "location": false
    }
  },
  {
    "id": 5,
    "name": "Toyota Hilux",
    "number": "JMC0000005",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "19.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": false,
      "location": false
    }
  },
  {
    "id": 6,
    "name": "Toyota Hilux",
    "number": "JMC0000006",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "11.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": false,
      "location": false
    }
  },
  {
    "id": 7,
    "name": "Toyota Hilux",
    "number": "JMC0000007",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "23.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": true,
      "location": false
    }
  },
  {
    "id": 8,
    "name": "Toyota Hilux",
    "number": "JMC0000008",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "17.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": false,
      "location": false
    }
  },
  {
    "id": 9,
    "name": "Toyota Hilux",
    "number": "JMC0000009",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "21.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": false,
      "location": true
    }
  },
  {
    "id": 10,
    "name": "Toyota Hilux",
    "number": "JMC0000010",
    "progress":false,
    "aloitus":false,
    "keskeyta":false,
    "aika":" ",
    "delDate": "25.05.2024",
    "checkboxes": {
      "vip": false,
      "accessories": false,
      "location": false
    }
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello Veikko!</h1>')
})

app.get('/api/cars', (request, response) => {
  {console.log("haku pyyntö")}
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