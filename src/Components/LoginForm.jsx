import React from 'react'
import { Form, Button } from "semantic-ui-react"

const LoginForm = (props) => {
  const { t } = this.props;
  return (
    <div>
      <Form id='login-form'>
          <Form.Field>
            <input onChange={props.inputChangeHandler} placeholder={t('loginform.email')} name='email' id="email-input" />
          </Form.Field>
          <Form.Field>
            <input onChange={props.inputChangeHandler} type='password' placeholder={t('loginform.password')} name='password' id="password-input" />
          </Form.Field>
          <Button onClick={props.handleLogin} id="submit-login-form" type='submit'>{t('loginform.submit')}</Button>
        </Form>
    </div>
  )
}

export default LoginForm