import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'

import styles from './PageSwitcher.module.css'

export interface PageSwitcherPage {
  title: string,
  callback: () => void | Promise<void>
}

export interface PageSwitcherProps {
  initialPage?: string
  pages: PageSwitcherPage[]
}

export const PageSwitcher: React.FC<PageSwitcherProps> = ({initialPage, pages}) => (
  <ButtonGroup size={'lg'}>
    {pages.map(
      page => <Button active={page.title === initialPage} onClick={page.callback} variant={'secondary'}>{page.title}</Button>
    )}
  </ButtonGroup>
)
