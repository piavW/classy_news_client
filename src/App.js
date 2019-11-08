import React, { Component, Suspense } from 'react'
import ListArticles from './Components/ListArticles'
import Signup from './Components/Signup'
import Login from './Components/Login'
import './index.css';
import CreateArticle from './Components/CreateArticle'
import PaymentForm from './Components/PaymentForm'
import BrowserLanguageArticles from './Components/BrowserLanguageArticles'

class App extends Component {
  render() {
    return (
      <>
        <Login />
        <Signup />
        <CreateArticle />
        <BrowserLanguageArticles />
        <PaymentForm />
        <ListArticles />
      </>
    )
  }
}

export default App;