import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'

import styles from './PageSwitcher.module.css'

export interface PageSwitcherPage {
  title: string
  callback: () => void | Promise<void>
}

export interface PageSwitcherProps {
  currentPage?: string
  pages: PageSwitcherPage[]
}

export const PageSwitcher: React.FC<PageSwitcherProps> = ({currentPage, pages}) => (
  <ButtonGroup className={styles.pageSwitcherWrapper} size={'lg'}>
    {pages.map(page => (
      <Button
        active={page.title === currentPage}
        className={styles.pageSwitcherButton}
        key={page.title}
        onClick={page.callback}
        variant={'secondary'}
      >
        {page.title}
      </Button>
    ))}
  </ButtonGroup>
)
