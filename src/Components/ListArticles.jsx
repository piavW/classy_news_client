import React, { Component } from 'react'
import { getData } from '../Modules/RequestArticles'
import { Container, Header, Item } from 'semantic-ui-react'
import ViewArticle from './ViewArticle';

class ListArticles extends Component {
  state = {
    articles: [],
    error_message: null,
    renderArticle: false,
    renderArticleId: null
  }

  componentDidMount() {
    this.getArticles()
  }

  makeIngress = (content, wordcount) => {
    let ingress = content.split(' ').slice(0, wordcount).join(' ')
    return ingress + ' ...'
  }

  async getArticles() {
    let result = await getData()

    if (result.error_message) {
      this.setState({
        error_message: result.error_message
      })
    } else {
      this.setState({
        articles: result
      })
    }
  }

   renderArticleHandler = (chosenArticle) => {
     this.setState({
       renderArticle: true,
       chosenArticleId: chosenArticle 
    })
  }

  render() {
    let renderListArticles, specificArticle, error_message
    let renderArticle = this.state.renderArticle
    const articleData = this.state.articles

    if (this.state.error_message) {
      error_message = <p>{ this.state.error_message }</p>
    }

    if (articleData.length !== 0) {
        if (!renderArticle) {
          renderListArticles = (
            <>
              {articleData.map(article => {
                return <div id={`article_${article.id}`} onClick={() => this.renderArticleHandler(article.id)} key={article.id}>
                  <Item.Group> 
                    <Item>
                      <Item.Image size='tiny' src={article.image} />
                      <Item.Content>
                        <Item.Description>{article.publish_date}</Item.Description>
                        <Item.Header as="h1">{article.title}</Item.Header>
                        <Item.Meta name="article-content">{this.makeIngress(article.content, 15)}</Item.Meta>
                        <Item.Extra>{article.author}</Item.Extra>
                      </Item.Content>
                    </Item>
                  </Item.Group> 
                </div>
              })}
            </>
          )
        }
      }
      if (renderArticle) {
        specificArticle = (
          <ViewArticle
            chosenArticle = {this.state.chosenArticleId}
            renderErrorMessage = {this.setErrorMessage}
          />
        )
      }

    return(
      <>
        <Container text>
          <Item.Group>
            <Header as='h1' id="header-title">Classy News</Header>
            {renderListArticles}
            {specificArticle}
            {error_message}
          </Item.Group>
        </Container>
      </>
    )
  }
}

export default ListArticles