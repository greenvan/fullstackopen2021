// Load the full build.
var _ = require('lodash')

//const dummy = (blogs) => {
const dummy = () => {
  // Dummy test always returns 1
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, current) => accumulator + current.likes
  return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return null

  const reducer = (accumulator, current) => current.likes > accumulator.likes ? current : accumulator
  const favorite = blogs.reduce(reducer)

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null

  const numBlogsList = _.countBy(blogs,'author') //groupedBy + mapValues
  const formattedNumBlogsList = _.map(numBlogsList, (value,key) => ({ author:key, blogs:value }))

  return  _.maxBy(formattedNumBlogsList, 'blogs') //Max value of 'blogs' field
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null

  function sumLikes(blogList){
    return _.sumBy(blogList,'likes')
  }

  const groupedList = _.groupBy(blogs,'author') //Blog list for each author
  const formattedgroupedList = _.map(groupedList,
    (value,key) => ({ author:key, likes:sumLikes(value) }) //With each author, the sum of likes
  )

  return   _.maxBy(formattedgroupedList, 'likes') //Max value of 'likes' field
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}