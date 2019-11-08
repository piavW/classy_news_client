import React, { Component } from 'react'
import { getData } from '../Modules/RequestArticles'
import { Container, Header, Item } from 'semantic-ui-react'

class BrowserLanguageArticles extends Component {
  state = {
    articles: [],
    error_message: null,
    displayLocalArticle: false
  }

  componentDidMount() {
    this.getArticles()
  }

  async getArticles() {
    let language = navigator.language.split('-')[0]
    let result = await getData(language)

    if (result.status === 400) {
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

  render() {
    let renderListArticles;
    const articleData = this.state.articles

    if (this.state.error_message) {
      return(
        <div>
          { this.state.error_message }
        </div>
      )
    }

    if (displayLocalArticle) {
      if (articleData.length !== 0) {
        renderListArticles = (
          <>
            {articleData.data.map(art => {
              return <div key={art.id}>
                <Item.Group> 
                  <Item>
                    <Item.Image size='tiny' src={art.image} />
                    <Item.Content>
                      <Item.Description>{art.publish_date}</Item.Description>
                      <Item.Header as='h2'>{art.title}</Item.Header>
                      <Item.Meta name="article-content"></Item.Meta>
                      <Item.Extra>{art.author}</Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group> 
              </div>
            })}
          </>
        )
      } else {
          return(
            renderListArticles = (
            <div>
              {this.state.error_message}
            </div>
          )
        )
      }
    } else {
      <Button onClick={this.localArticleStateChanger}>Local News</Button>
    }
    
    return(
      <>
        <Container text>
          <Item.Group>
            <Header as='h1' id="header-title">Classy News</Header>
            <Text id='active_article_language'>Active language of articles: {language}</Text>
            {renderListArticles}
          </Item.Group>
        </Container>
      </>
    )
  }
}

export default BrowserLanguageArticles