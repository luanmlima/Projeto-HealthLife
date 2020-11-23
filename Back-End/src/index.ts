import express from 'express'

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: "Hello" })
})

app.listen(5000, () => {
  console.log("Server start port 5000");

})