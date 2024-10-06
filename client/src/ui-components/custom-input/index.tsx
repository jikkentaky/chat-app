import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { TextField, TextFieldProps } from '@mui/material'

import styles from './styles.module.scss'
import cn from 'classnames'

type Props<T extends FieldValues> = TextFieldProps & {
  control?: Control<T>
  name: Path<T>
}

const CustomInput = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  className = '',
  ...props
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        className={cn(styles.input, className)}
        {...field}
        label={label}
        type={type}
        variant="outlined"
        error={!!error}
        helperText={error ? error.message : null}
        fullWidth
        {...props}
      />
    )}
  />
)

export { CustomInput }
