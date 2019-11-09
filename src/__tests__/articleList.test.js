import React from 'react'
import { shallow } from 'enzyme'
import ArticleList from '../Components/ArticleList'

describe('<ArticleList />', () => {
  it('display list of articles', () => {
    const describedComponent = shallow(<ArticleList title="abc" ingress="few lines" author="Bob" date="20 October 2019" />)
    const response = <p>abc</p>
    expect(describedComponent.contains(response)).toEqual(true)
  })
})