const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Blog = require('../models/blog')

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash('sekret', saltRounds)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      "Go To Statement Considered Harmful"
    )
  })

  test('unique identifier of the blogs is id', async () => {
    const blogs = await helper.blogsInDb()
    const keys = blogs.map(blog => Object.keys(blog))
  
    expect(keys).toBeDefined()
    for (const key of keys) {
      expect(key).toContain('id')
      expect(key).not.toContain('_id')
    }
  })


  describe('addition of a new blog', () => {
    
    test('a valid blog can be added ', async () => {
      const newBlog = {
        "title": "Test title",
        "author": "Test author",
        "url": "Test url",
        "likes": 0
      }
    
      await api
        .post('/api/blogs')
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
      const titles = blogsAtEnd.map(r => r.title)
      expect(titles).toContain(
        'Test title'
      )
    })

    test('Unauthorized user cannot add a blog', async () => {
      const newBlog = {
        "title": "Test title",
        "author": "Test author",
        "url": "Test url",
        "likes": 0
      }
    
      await api
        .post('/api/blogs')
        .set("Authorization", `Bearer wrongToken`)
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
      const titles = blogsAtEnd.map(r => r.title)
      expect(titles).not.toContain(
        'Test title'
      )
    })
    
    test('If the title or url are missing responds with 400.', async () => {
      let newBlog = {
        "author": "Test author",
        "url": "Test url",
        "likes": 0
      }
    
      await api
        .post('/api/blogs')
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    
      newBlog = {
        "title": "Test title",
        "author": "Test author",
        "likes": 0
      }
    
      await api
        .post('/api/blogs')
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    
    test('blog without likes is added and defaults to 0', async () => {
      const newBlog = {
        "title": "Test title",
        "author": "Test author",
        "url": "Test url"
      }
    
      await api
        .post('/api/blogs')
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .expect(/{"title":"Test title","author":"Test author","url":"Test url","likes":0,"user":".*","id":".*"}/)
        
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })
  })


  describe('viewing a specific blog', () => {
    test('a specific blog wtih a valid id can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '-1'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
      await Blog.deleteMany({})
      
      const newBlog = {
        "title": "Test title",
        "author": "Test author",
        "url": "Test url",
        "likes": 0
      }
    
      await api
        .post('/api/blogs')
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })

    test('Unauthorized user cannot delete a blog', async () => {
      await Blog.deleteMany({})
      
      const newBlog = {
        "title": "Test title",
        "author": "Test author",
        "url": "Test url",
        "likes": 0
      }
    
      await api
        .post('/api/blogs')
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer wrongToken`)
        .expect(401)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length 
      )
  
      const titles = blogsAtEnd.map(r => r.title)
  
      expect(titles).toContain(blogToDelete.title)
    })

  })

  


  describe('updating a blog', () => {
    test('a blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const blog = {
        "id": blogToUpdate.id,
        "title": blogToUpdate.title,
        "author": blogToUpdate.author,
        "url": blogToUpdate.url,
        "likes": blogToUpdate.likes + 1
      } 

      const resultBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      const processedBlogToUpdate = JSON.parse(JSON.stringify(blogToUpdate))
      expect(resultBlog.body).not.toEqual(processedBlogToUpdate)
      expect(resultBlog.body.likes).toEqual(processedBlogToUpdate.likes + 1)
      expect(resultBlog.body).toEqual(blog)
    })
  })


  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('username must be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails with proper statuscode and message if username is not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('username not given')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails with proper statuscode and message if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'AA',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('username must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails with proper statuscode and message if password is not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'AAAA',
        name: 'Superuser'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password not given')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails with proper statuscode and message if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'AAAA',
        name: 'Superuser',
        password: 'AA'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})