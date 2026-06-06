import { ButtonContainer, ButttonLink } from './styles'

export type Props = {
  type: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void
  children: string
  variant?: 'primary' | 'secondary'
}

const Button = ({ type, title, to, onClick, children, variant }: Props) => {
  if (type === 'button') {
    return (
      <ButtonContainer
        type="button"
        title={title}
        onClick={onClick}
        variant={variant}
      >
        {children}
      </ButtonContainer>
    )
  }

  return (
    <ButttonLink to={to as string} title={title}>
      {children}
    </ButttonLink>
  )
}

export default Button
