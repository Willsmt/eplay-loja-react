import { ButtonContainer, ButttonLink } from './styles'
import { type ButtonHTMLAttributes } from 'react'

type BaseProps = {
  children: string
  variant?: 'primary' | 'secondary'
  title: string
}

// Botão HTML
type ButtonProps = BaseProps & {
  type: 'button' | 'submit'
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

// Link (react-router-dom)
type LinkProps = BaseProps & {
  type: 'link'
  to: string
}

export type Props = ButtonProps | LinkProps

const Button = (props: Props) => {
  if (props.type === 'link') {
    return (
      <ButttonLink to={props.to} title={props.title}>
        {props.children}
      </ButttonLink>
    )
  }

  return (
    <ButtonContainer
      type={props.type}
      title={props.title}
      onClick={props.onClick}
      variant={props.variant}
    >
      {props.children}
    </ButtonContainer>
  )
}

export default Button
