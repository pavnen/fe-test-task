import React from 'react'
import {render, screen} from '@testing-library/react'
import {PageSwitcher} from './PageSwitcher'

it('should render buttons', () => {
  const pages = [
    {
      title: 'scores',
      callback: () => undefined
    },
    {
      title: 'game',
      callback: () => undefined
    }
  ]
  render(<PageSwitcher pages={pages} />)
  expect(screen.getAllByRole('button')).toHaveLength(2)
})
