const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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
    
    test('If the title or url are missing responds with 400.', async () => {
      let newBlog = {
        "author": "Test author",
        "url": "Test url",
        "likes": 0
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
      newBlog = {
        "title": "Test title",
        "author": "Test author",
        "likes": 0
      }
    
      await api
        .post('/api/blogs')
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
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .expect(/{"title":"Test title","author":"Test author","url":"Test url","likes":0,"id":".*"}/)
        
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

      console.log(validNonexistingId)

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
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
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
})

afterAll(() => {
  mongoose.connection.close()
})