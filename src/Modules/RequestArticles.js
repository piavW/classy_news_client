import axios from 'axios'

const apiUrl = 'http://localhost:3000/api/v1/'

const getData = async (language) => {
  try {
    let response
    if (language) {
      response = await axios.get(apiUrl + `articles/?language=${language}`)
    } else {
      response = await axios.get(apiUrl + 'articles')
    }
    return response
  } catch (error) {
    return {
      error_message: error.message,
      status: 400
    }
  }
}

const submitArticle = async (title, content, author) => {
  try {
    let response = await axios.post(
      apiUrl + 'articles',
      {
        title: title,
        content: content,
        author: author
      }
    )
    return response
  } catch (error) {
    return error.message
  }
}

export { getData, submitArticle }