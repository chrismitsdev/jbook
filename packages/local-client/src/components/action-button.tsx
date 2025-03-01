import * as React from 'react'

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ActionButton: React.FC<ActionButtonProps> = ({className, ...props}) => {
  return (
    <button
      className='button is-primary is-small'
      {...props}
    >
      <span className='icon'>
        <i className={`fas ${className}`} />
      </span>
    </button>
  )
}

ActionButton.displayName = 'ActionButton'

export default ActionButton
