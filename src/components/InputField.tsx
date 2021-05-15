import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
  useState,
} from 'react'
import { useUniqueId } from '../utils/useUniqueId'
import './InputField.css'

type InputFieldProps = PropsWithChildren<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>

export const InputField = ({ children, ...props }: InputFieldProps) => {
  const uniqueId = useUniqueId()

  const [showPassword /*setShowPassword*/] = useState(false)
  const type = showPassword ? 'text' : props.type

  return (
    <>
      <label htmlFor={props.id || uniqueId}>{children}</label>
      <input {...props} type={type} id={props.id || uniqueId} />
      {/*
      {props.type === 'password' && !showPassword && (
        <button className="password-btn" type="button" onClick={() => setShowPassword(true)}>
          Show
        </button>
      )}
      {props.type === 'password' && showPassword && (
        <button className="password-btn" type="button" onClick={() => setShowPassword(false)}>
          Hide
        </button>
      )}
      */}
    </>
  )
}
