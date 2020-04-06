const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express:server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res) {
  const about = {
    avatar_url: "https://avatars3.githubusercontent.com/u/51340090?s=460&u=f2f3b8fa605eb1bda269341c54fd6d3b1fd09144&v=4",
    name: "Jefferson Brito",
    role: "Instrutor - MasterTech",
    description: 'Programador full-stack, focado em trazer o melhor ensino para iniciantes em programação. Colaborador da <a href="https://mastertech.com.br/" target="_blank">MasterTech</a>',
    links: [
      { name: "Github", url: "https://github.com/JeffersonBrito"},
      { name: "Linkedin", url: "https://www.linkedin.com/in/jefferson-brito-a710b0160/"}
    ]

  }

  return res.render('about', { about })
})

server.get('/portfolio', function(req, res) {

  return res.render('portfolio', { items: videos })
})

server.get('/video', function(req, res) {
  const id = req.query.id

  const video = videos.find(function(video){
    return video.id == id
  })

  if (!videos) {
    return res.send('Video not found!')
  }

  return res.render('video', { item: video })

  res.send(id)
})

server.listen(5000, function() {
  console.log("server is running")
})




