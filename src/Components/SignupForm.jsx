import React from 'react'
import { Form, Button } from "semantic-ui-react"

const SignupForm = (props) => {
  const { t } = this.props;
  return (
    <div>
      <Form id='signup-form'>
          <Form.Field>
            <input onChange={props.inputChangeHandler} placeholder={t('signupform.name')} name='name' id="name-input" />
          </Form.Field>
          <Form.Field>
            <input onChange={props.inputChangeHandler} placeholder={t('signupform.nickname')} name='nickname' id="nickname-input" />
          </Form.Field>
          <Form.Field>
            <input onChange={props.inputChangeHandler} placeholder={t('signupform.city')} name='city' id="city-input" />
          </Form.Field>
          <Form.Field>
            <select className="select-css" onChange={props.inputChangeHandler} placeholder={t('signupform.country')} name='country' id="country-input">
              <option value='Sweden'>{t('signupform.sweden')}</option>
              <option value='Brazil'>{t('signupform.brazil')}</option>
              <option value='Germany'>{t('signupform.germany')}</option>
              <option value='Iceland'>{t('signupform.iceland')}</option>
              <option value='Portugal'>{t('signupform.portugal')}</option>
              <option value='Russia'>{t('signupform.russia')}</option>
              <option value='USA'>{t('signupform.usa')}</option>
            </select>
          </Form.Field>
          <Form.Field>
            <input onChange={props.inputChangeHandler} placeholder={t('signupform.email')} name='email' id="email-input" />
          </Form.Field>
          <Form.Field>
            <input onChange={props.inputChangeHandler} placeholder={t('signupform.password')} name='password' id="password-input" />
          </Form.Field>
          <Form.Field>
            <input onChange={props.inputChangeHandler} placeholder={t('signupform.passwordconfirmation')} name='password_confirmation' id="password-confirmation" />
          </Form.Field>
          <Button onClick={props.handleSignup} id="submit-signup-form" type='submit'>{t('signupform.submit')}</Button>
        </Form>
    </div>
  )
}

export default SignupForm