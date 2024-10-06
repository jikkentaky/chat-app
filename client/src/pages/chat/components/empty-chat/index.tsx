import { animationDefaultOptions } from '@/utils/config'
import styles from './styles.module.scss'
import Lottie from 'react-lottie'
import { Typography } from '@/ui-components/typography'

const EmptyChat = () => {
  return (
    <div className={styles.emptyChat}>
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />

      <div className={styles.text}>
        <Typography variant='h3' className={styles.title}>
          Hi<span className={styles.span}>!</span> Welcome to <span className={styles.span}>ConnectZone</span> Chat App<span className={styles.span}>.</span>
        </Typography>
      </div>
    </div >
  )
}

export { EmptyChat }
