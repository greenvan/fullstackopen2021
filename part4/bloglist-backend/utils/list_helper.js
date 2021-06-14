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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}