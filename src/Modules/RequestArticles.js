import axios from 'axios'
import getCurrentCredentials from './GetCredentials'

const apiUrl = 'http://localhost:3000/api/v1/'

const getData = async (language) => {
  try {
    let response
    if (language) {
      response = await axios.get(apiUrl + `articles/?language=${language}`)
    } else {
      response = await axios.get(apiUrl + 'articles')
    }
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
  try {
    let response = await axios.get(
      apiUrl + `articles/${chosenArticle}`, 
      {
        headers: getCurrentCredentials()
      }
    )
    return response 
  } catch(error) {
    return error.response.data.error_message
  }
}

export { getData, submitArticle, getArticle }