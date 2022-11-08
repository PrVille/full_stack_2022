const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (previous, current) => {
    return (previous.likes > current.likes) ? previous : current
  }

  return blogs.length === 0
    ? {}
    : (({title, author, likes}) => ({title, author, likes}))(blogs.reduce(reducer, 0))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const res = _(blogs).countBy('author').entries().maxBy(_.last)
  return {author: res[0], blogs: res[1]}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const reducer = (prev, {author, likes}) => {
    prev[author] = prev[author] || 0
    prev[author] += likes
    return prev
  }

  const res = _(blogs.reduce(reducer, {})).entries().maxBy(_.last)
  return {author: res[0], likes: res[1]}
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}