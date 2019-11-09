import axios from 'axios'
import getCurrentCredentials from './GetCredentials'

const apiUrl = 'https://classy-news-backend.herokuapp.com/api/v1/'

const getData = async () => {
  try {
    let response = await axios.get(apiUrl + 'articles')
    return response.data.articles
  } catch (error) {
    return {
      error_message: error.message,
      status: 400
    }
  }
}

const submitArticle = async (title, content, author, image) => {
  try {
    let response = await axios.post(
      apiUrl + 'articles',
      {
        title: title,
        content: content,
        author: author,
        image: image[0]
      }, 
      {
        headers: getCurrentCredentials()
      }
    )
    return response
  } catch (error) {
    return error.message
  }
}

const getArticle = async (chosenArticle) => {
  debugger
  try {
    let response = await axios.get(
      apiUrl + `articles/${chosenArticle}`, 
      {
        headers: getCurrentCredentials()
      }
    )
    return response 
  } catch(error) {
    return error.response.data.error || error.response.data.error_message
  }
}

export { getData, submitArticle, getArticle }