import React, { Component } from 'react'
import { getData } from '../Modules/RequestArticles'
import { Container, Item, Button } from 'semantic-ui-react'
import ViewArticle from './ViewArticle';

class BrowserLanguageArticles extends Component {
  state = {
    articles: [],
    error_message: null,
    displayLocalArticle: false,
    renderArticle: false,
    renderArticleId: null
  }

    async componentDidMount() {
      let language = navigator.language.split('-')[0]
      let result = await getData(language)
      if (result.error_message) {
        this.setState({
          error_message: result.error_message
        })
      } else {
        this.setState({
          articles: result
        })
      }
    }

  localArticleStateChanger = () => {
    this.setState({
      displayLocalArticle: !this.state.displayLocalArticle
    })
  }

  renderArticleHandler = (chosenArticle) => {
       this.setState({
         renderArticle: true,
         chosenArticleId: chosenArticle 
      })
    }

  render() {
    let renderLocalArticles, specificArticle, error_message
    let renderArticle = this.state.renderArticle
    const articleData = this.state.articles

    if (this.state.error_message) {
      return(
        <div>
          { this.state.error_message }
        </div>
      )
    }

    if (this.state.displayLocalArticle) {
      if (!renderArticle) {
        renderLocalArticles = (
          <>
          <p id="active_article_language">Active language of articles: Swedish</p>
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
      } else if (renderArticle) {
        specificArticle = (
          <ViewArticle
            chosenArticle = {this.state.chosenArticleId}
            renderErrorMessage = {this.setErrorMessage}
          />
        )
    } else {
        renderLocalArticles = (
          <Button onClick={this.localArticleStateChanger} id="change-language">Local News</Button>
        )
      }
    }
    
    return(
      <>
        <Container text>
          <Item.Group>
            {renderLocalArticles}
            {specificArticle}
            {error_message}
          </Item.Group>
        </Container>
      </>
    )
  }
}

export default BrowserLanguageArticles