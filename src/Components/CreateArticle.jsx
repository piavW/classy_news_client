 import React, { Component } from 'react'
 import { submitArticle } from '../Modules/RequestArticles'
 import { Form, Button, Container } from 'semantic-ui-react'
 import { withTranslation } from 'react-i18next';
 import ImageUploader from 'react-images-upload'

 class CreateArticle extends Component {
    state = {
      title: '',
      content: '',
      author: '',
      image: '',
      publish_date: ''
    }

    inputHandler = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    submitArticleHandler = async() => {
      const { title, content, author, image } = this.state
      let response = await submitArticle(title, content, author, image)

      if (response.status === 200) {
        this.setState({
          responseMessage: response.data.message
        })
      } else {
        this.setState({
          responseMessage: response
        })
      }
    }

    onAvatarDropHandler = (pictureFiles, pictureDataURLs) => {
      this.setState({
        image: pictureDataURLs
      })
    }

    render() {
      let articleForm, responseMessage
      const { t } = this.props;

      if (this.state.responseMessage) {
      responseMessage = <p id="response-message">{this.state.responseMessage}</p>
        articleForm = (
          <>
            <Container>
              <Form id="article-form">
                <Form.Field>
                  <input name="title" id="title-input" placeholder={t('createarticle.title')} onBlur={this.inputHandler} />
                </Form.Field>
                <Form.Field>
                  <input name="content" id="content-input" placeholder={t('createarticle.content')} onBlur ={this.inputHandler}/>
                </Form.Field>
                <Form.Field>
                  <input name="author" id="author-input" placeholder={t('createarticle.author')} onBlur ={this.inputHandler}/>
                </Form.Field>
                <Form.Field>
                  <ImageUploader 
                    className="file-input"
                    buttonText={"Upload article image (jpg/png)"}
                    withPreview
                    withIcon
                    withLabel={false}
                    onChange={this.onAvatarDropHandler}
                    imgExtension={[".jpg", ".png"]}
                    maxFileSize={5242880}
                    singleImage={true}
                  />
                </Form.Field>
                <Form.Field>
                  <Button id="submit-article" onClick={this.submitArticleHandler.bind(this)}>{t('createarticle.submit')}</Button>
                  <Button id="cancel-article" onClick={this.renderForm}>{t('createarticle.cancel')}</Button>
                </Form.Field>
              </Form>
            </Container>
          </>
        )
      } else {
        articleForm = (
          <Button onClick={this.renderForm} id="create-article">{t('createarticle.write')}</Button>
        )
      }
      return(
        <>
          {articleForm}
          {responseMessage}
        </>
      )
    }
  }

 export default withTranslation()(CreateArticle)