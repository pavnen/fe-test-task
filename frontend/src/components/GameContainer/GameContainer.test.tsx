import React from 'react'
import {render} from '@testing-library/react'
import {GameContainer} from './GameContainer'

it('should match snapshot', () => {
  const {container} = render(<GameContainer />)
  expect(container).toMatchSnapshot()
})
