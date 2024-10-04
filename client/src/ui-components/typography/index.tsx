import { FC, createElement } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

type TypographyProps = {
  children?: string | number | React.ReactNode
  variantWeight?: 'inherit' | 'regular' | 'medium' | 'semibold' | 'bold'
  variant?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

const Typography: FC<TypographyProps> = ({
  children,
  variantWeight = 'inherit',
  variant = 'p',
  className,
  ...props
}) => {
  return createElement(
    variant,
    {
      className: cn(
        {
          [styles[variantWeight]]: variantWeight,
          [styles[variant]]: variant,
        },
        className,
      ),
      ...props,
    },
    children,
  )
}

export { Typography }
