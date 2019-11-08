import React, { Component } from 'react'
import { getData } from '../Modules/RequestArticles'
import { Container, Header, Item } from 'semantic-ui-react'

class ListArticles extends Component {
  state = {
    articles: [],
    error_message: null
  }

  componentDidMount() {
    this.getArticles()
  }

  makeIngress = (content, wordcount) => {
    let ingress = content.split(' ').slice(0, wordcount).join(' ')
    return ingress + ' ...'
  }

  async getArticles() {
    let language = navigator.language.split('-')[0]
    debugger
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

    if (articleData.length !== 0) {
      renderListArticles = (
        <>
          {articleData.data.map(art => {
            return <div key={art.id}>
              <Item.Group> 
                <Item>
                  <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  <Item.Content>
                    <Item.Description>{art.publish_date}</Item.Description>
                    <Item.Header as='h2'>{art.title}</Item.Header>
                    <Item.Meta name="article-content">{this.makeIngress(art.content, 15)}</Item.Meta>
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
    
    return(
      <>
        <Container text>
          <Item.Group>
            <Header as='h1' id="header-title">Classy News</Header>
            {renderListArticles}
          </Item.Group>
        </Container>
      </>
    )
  }
}

export default ListArticles