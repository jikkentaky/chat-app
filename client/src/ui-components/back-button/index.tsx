import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { FC } from 'react'
import cn from 'classnames'

type Props = {
  className?: string
}

const BackButton: FC<Props> = ({ className }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button className={cn(styles.button, className)} onClick={handleClick}>
      <IoArrowBack />
    </button>
  )
}
export { BackButton }
