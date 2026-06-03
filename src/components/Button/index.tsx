import { ButttonContainer, ButttonLink } from './styles'

type Props = {
  type: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void
  children: string
}

const Button = ({ type, title, to, onClick, children }: Props) => {
  if (type === 'button') {
    return (
      <ButttonContainer type="button" title={title} onClick={onClick}>
        {children}
      </ButttonContainer>
    )
  }

  return (
    <ButttonLink to={to as string} title={title}>
      {children}
    </ButttonLink>
  )
}

export default Button
