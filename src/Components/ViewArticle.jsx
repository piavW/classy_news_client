import React, { Component } from 'react'
import { Container, 
         Grid, 
         Segment, 
         Divider, 
         Header, 
         Image 
        } from 'semantic-ui-react'
import { getArticle } from '../Modules/RequestArticles'

class ViewArticle extends Component {
  state = {
    article: null,
    error_message: ''
  }

  async componentDidMount() {
    let response = await getArticle(this.props.match.params.id)
    if (response.status === 200) {
      this.setState({
        article: response.data.article
      })
    } else {
      this.setState({
        error_message: response || response.data.error_message
      })
    }
  }

  render() {
    let singleArticle
    const article = this.state.article
  
    if (article) {
      singleArticle = (
      <>
        <div id="single-article">
          <Container>
            <Grid centered columns={2}>
              <Grid.Column width={12}>
                <Segment padded>
                  <Header as='h2' id={`title_${article.id}`}>{article.title}</Header>
                  <Divider />
                  <Image size='large' id={`image_${article.id}`} src={article.image} />
                  <h4 id={`publish_date_${article.id}`}>{article.publish_date}</h4>
                  <p id={`content_${article.id}`}>{article.content}</p> 
                  <Divider />
                  <h3 id={`author_${article.id}`}>Written by  {article.author}</h3>
                </Segment>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </>
      )
    } else {
      singleArticle = (
        <p>{this.state.error_message}</p>
      )
    }
    return (
      <>
        {singleArticle}
      </>
    )
  }
}

export default ViewArticle