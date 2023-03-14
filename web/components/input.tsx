import { forwardRef } from "react"

interface InputProps {
  value: string,
  label: string,
  onChange?: (value: string) => void,
  type?: 'text' | 'password' | 'date',
  placeholder?: string,
  help?: string,
  onFocus?: () => void,
  onBlur?: () => void,
  onKeyUp?: () => void,
  onKeyDown?: () => void,
  isLoading?: boolean,
  horizontal?: boolean,
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ value, label, onChange, type, placeholder, help, onFocus, onBlur, onKeyDown, onKeyUp, isLoading, horizontal }, ref): JSX.Element => {
  return (
    <div className={`field ${horizontal ? 'is-horizontal' : ''}`}>
      <label className="label">{label}:</label>
      <div className={`control is-expanded${isLoading? ' is-loading': ''}`}>
        <input 
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          ref={ref} 
        />
      </div>
      {help && <p className="help">{help}</p>}
    </div> 
  )
}) 

Input.displayName = 'Input'

export default Input