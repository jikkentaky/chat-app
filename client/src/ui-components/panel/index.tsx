import { FC } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
}

const Panel: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn(styles.panel, className)}>{children}</div>
  )
}
export { Panel }
