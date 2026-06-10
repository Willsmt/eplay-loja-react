import Button from '../../components/Button'
import Card from '../../components/Card'
import { Row, InputGroup, TabButton, DemoBox } from './styles'

import credit from '../../assets/images/credit-card.png'
import codeBar from '../../assets/images/codigoBarras.png'
import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import { InputMask } from '@react-input/mask'

import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../store'
import { clearCart } from '../../store/reducers/cart'
import { formatPrice } from '../../utils/formatPrice'
import { getTotalPrice } from '../../utils/getTotalPrice'

type Installment = {
  quantity: number
  formattedAmount: string
}

// conta só os dígitos de um valor mascarado (ex: "123.456.789-00" -> 11)
const onlyDigits = (value = '') => value.replace(/\D/g, '')

const Checkout = () => {
  const dispatch = useDispatch()
  const [purchase, { isLoading, isError, data, isSuccess }] =
    usePurchaseMutation()
  const { items } = useSelector((state: RootState) => state.cart)

  const totalPrice = getTotalPrice(items)
  const form = useFormik({
    initialValues: {
      payWithCard: false, // <-- ADICIONADO AQUI
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmdeliveryEmail: '',
      cardOwner: '',
      cpfOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: '1'
    },
    validationSchema: Yup.object({
      payWithCard: Yup.boolean(),

      fullName: Yup.string()
        .required('Nome completo é obrigatório')
        .min(3, 'Digite pelo menos 3 caracteres'),
      email: Yup.string()
        .required('E-mail é obrigatório')
        .email('Digite um e-mail válido'),
      cpf: Yup.string()
        .required('CPF é obrigatório')
        .test('cpf', 'CPF deve ter 11 dígitos', value => onlyDigits(value).length === 11),
      deliveryEmail: Yup.string()
        .required('E-mail de entrega é obrigatório')
        .email('Digite um e-mail válido'),
      confirmdeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails não conferem')
        .required('Confirme o e-mail'),

      // os campos do cartão só são obrigatórios quando o pagamento é no cartão
      cardOwner: Yup.string().when('payWithCard', {
        is: true,
        then: schema => schema.required('Nome do titular é obrigatório')
      }),
      cpfOwner: Yup.string().when('payWithCard', {
        is: true,
        then: schema =>
          schema
            .required('CPF do titular é obrigatório')
            .test(
              'cpfOwner',
              'CPF deve ter 11 dígitos',
              value => onlyDigits(value).length === 11
            )
      }),
      cardDisplayName: Yup.string().when('payWithCard', {
        is: true,
        then: schema => schema.required('Nome no cartão é obrigatório')
      }),
      cardNumber: Yup.string().when('payWithCard', {
        is: true,
        then: schema =>
          schema
            .required('Número do cartão é obrigatório')
            .test(
              'cardNumber',
              'Número deve ter 16 dígitos',
              value => onlyDigits(value).length === 16
            )
      }),
      expiresMonth: Yup.string().when('payWithCard', {
        is: true,
        then: schema =>
          schema
            .required('Mês é obrigatório')
            .matches(/^(0[1-9]|1[0-2])$/, 'Digite um mês válido (01-12)')
      }),
      expiresYear: Yup.string().when('payWithCard', {
        is: true,
        then: schema =>
          schema
            .required('Ano é obrigatório')
            .matches(/^\d{2}$/, 'Digite o ano com 2 dígitos')
      }),
      cardCode: Yup.string().when('payWithCard', {
        is: true,
        then: schema =>
          schema
            .required('CVV é obrigatório')
            .matches(/^\d{3}$/, 'CVV deve ter 3 dígitos')
      }),
      installments: Yup.string().required('Escolha o parcelamento')
    }),

    onSubmit: values => {
      purchase({
        billing: {
          document: onlyDigits(values.cpf),
          email: values.email,
          name: values.fullName
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: Number(values.installments),
          // no boleto só enviamos active: false; os dados do cartão ficam de fora
          card: values.payWithCard
            ? {
                active: true,
                code: Number(values.cardCode),
                name: values.cardDisplayName,
                number: onlyDigits(values.cardNumber),
                owner: {
                  document: onlyDigits(values.cpfOwner),
                  name: values.cardOwner
                },
                expires: {
                  month: Number(values.expiresMonth),
                  // o ano é digitado com 2 dígitos (YY), a API espera 4 (YYYY)
                  year: 2000 + Number(values.expiresYear)
                }
              }
            : { active: false }
        },
        // envia os jogos que estão de fato no carrinho
        products: items.map(item => ({
          id: item.id,
          price: item.prices.current ?? 0
        }))
      })
    }
  })

  // true quando o campo foi tocado e está inválido — usado para a borda vermelha
  const checkInputHasError = (field: string) => {
    const isTouched = field in form.touched
    const isInvalid = field in form.errors
    return isTouched && isInvalid
  }

  // devolve o texto do erro apenas quando o campo realmente está com erro
  const getErrorMessage = (field: string, message?: string) => {
    if (checkInputHasError(field)) return message
    return ''
  }

  // modo demo: preenche o formulário com dados de teste válidos.
  // o número 4111 1111 1111 1111 é o cartão de teste padrão (passa no Luhn).
  const fillTestData = () => {
    form.setValues({
      payWithCard: true,
      fullName: 'João da Silva',
      email: 'joao.teste@email.com',
      cpf: '529.982.247-25',
      deliveryEmail: 'joao.teste@email.com',
      confirmdeliveryEmail: 'joao.teste@email.com',
      cardOwner: 'João da Silva',
      cpfOwner: '529.982.247-25',
      cardDisplayName: 'JOAO DA SILVA',
      cardNumber: '4111 1111 1111 1111',
      expiresMonth: '12',
      expiresYear: '30',
      cardCode: '123',
      installments: '1'
    })
  }

  // parcelas são estado derivado do total — calculadas direto com useMemo
  const installments = useMemo(() => {
    const installmentsArray: Installment[] = []
    for (let i = 1; i <= 6; i++) {
      installmentsArray.push({
        quantity: i,
        formattedAmount: formatPrice(totalPrice / i)
      })
    }
    return installmentsArray
  }, [totalPrice])

  // quando a compra é concluída, esvaziamos o carrinho
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart())
    }
  }, [isSuccess, dispatch])

  // guard de carrinho vazio precisa vir DEPOIS de todos os hooks.
  // exige !isSuccess para não redirecionar antes de mostrar o "Muito obrigado"
  if (items.length === 0 && !isSuccess) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      {isSuccess && data ? (
        <Card title="Muito obrigado">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! Abaixo estão os detalhes da sua compra:
            </p>
            <br />

            <p>
              <strong>Número do pedido:</strong> {data.orderId}
            </p>
            <br />
            <p>
              <strong>Forma de pagamento:</strong>{' '}
              {form.values.payWithCard
                ? 'Cartão de crédito'
                : 'Boleto Bancário'}
            </p>
            <br />

            <p>
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
              que a confirmação pode levar até 3 dias úteis. Após a aprovação do
              pagamento, enviaremos um e-mail contendo o código de ativação do
              jogo.
            </p>
            <br />

            <p>
              Se você optou pelo pagamento com cartão de crédito, a liberação do
              código de ativação ocorrerá após a aprovação da transação pela
              operadora do cartão. Você receberá o código no e-mail cadastrado
              em nossa loja.
            </p>
            <br />

            <p>
              Pedimos que verifique sua caixa de entrada e a pasta de spam para
              garantir que receba nossa comunicação. Caso tenha alguma dúvida ou
              necessite de mais informações, por favor, entre em contato conosco
              através dos nossos canais de atendimento ao cliente.
            </p>
            <br />

            <p>
              Agradecemos por escolher a <strong>EPLAY</strong> e esperamos que
              desfrute do seu jogo!
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit}>
          <DemoBox>
            <p>
              🧪 <strong>Site de estudos</strong> — nenhuma cobrança é feita.
              Preencha os campos à vontade para testar as máscaras e validações,
              ou, se preferir, use o botão abaixo para preencher tudo
              automaticamente com dados de teste.
            </p>
            <button type="button" onClick={fillTestData}>
              Preencher com dados de teste (opcional)
            </button>
          </DemoBox>

          <Card title="Dados de cobrança">
            <Row>
              <InputGroup>
                <label htmlFor="fullName">Nome completo</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.values.fullName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkInputHasError('fullName') ? 'error' : ''}
                />
                <small>
                  {getErrorMessage('fullName', form.errors.fullName)}
                </small>
              </InputGroup>
              <InputGroup>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.values.email}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkInputHasError('email') ? 'error' : ''}
                />
                <small>{getErrorMessage('email', form.errors.email)}</small>
              </InputGroup>
              <InputGroup>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={form.values.cpf}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkInputHasError('cpf') ? 'error' : ''}
                  mask="___.___.___-__"
                  replacement={{ _: /\d/ }}
                />
                <small>{getErrorMessage('cpf', form.errors.cpf)}</small>
              </InputGroup>
            </Row>
            <h3 className="margin-top">Dados de entrega - conteúdo digital</h3>
            <Row>
              <InputGroup>
                <label htmlFor="deliveryEmail">E-mail</label>
                <input
                  id="deliveryEmail"
                  name="deliveryEmail"
                  type="email"
                  value={form.values.deliveryEmail}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkInputHasError('deliveryEmail') ? 'error' : ''}
                />
                <small>
                  {getErrorMessage('deliveryEmail', form.errors.deliveryEmail)}
                </small>
              </InputGroup>
              <InputGroup>
                <label htmlFor="confirmdeliveryEmail">Confirme o e-mail</label>
                <input
                  id="confirmdeliveryEmail"
                  name="confirmdeliveryEmail"
                  type="email"
                  value={form.values.confirmdeliveryEmail}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={
                    checkInputHasError('confirmdeliveryEmail') ? 'error' : ''
                  }
                />
                <small>
                  {getErrorMessage(
                    'confirmdeliveryEmail',
                    form.errors.confirmdeliveryEmail
                  )}
                </small>
              </InputGroup>
            </Row>
          </Card>

          <Card title="Pagamento">
            <div>
              <p style={{ marginBottom: '16px' }}>
                Escolha a forma de pagamento:
              </p>
              <Row>
                <TabButton
                  type="button"
                  isActive={!form.values.payWithCard}
                  onClick={() => form.setFieldValue('payWithCard', false)}
                >
                  <img src={codeBar} alt="Pagar com código de barras" />
                  Boleto bancário
                </TabButton>
                <TabButton
                  type="button"
                  isActive={form.values.payWithCard}
                  onClick={() => form.setFieldValue('payWithCard', true)}
                >
                  <img src={credit} alt="Pagar com cartão de crédito" />
                  Cartão de crédito
                </TabButton>
              </Row>

              <div className="margin-top">
                {!form.values.payWithCard && (
                  <p className="margin-top">
                    Ao optar por boleto, a confirmação pode levar até 3 dias
                    úteis.
                  </p>
                )}

                {form.values.payWithCard && (
                  <>
                    <Row>
                      <InputGroup>
                        <label htmlFor="cardOwner">
                          Nome do titular do cartão
                        </label>
                        <input
                          id="cardOwner"
                          name="cardOwner"
                          type="text"
                          value={form.values.cardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardOwner') ? 'error' : ''
                          }
                        />
                        <small>
                          {getErrorMessage('cardOwner', form.errors.cardOwner)}
                        </small>
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cpfOwner">
                          CPF do titular do cartão
                        </label>
                        <InputMask
                          id="cpfOwner"
                          name="cpfOwner"
                          type="text"
                          value={form.values.cpfOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cpfOwner') ? 'error' : ''
                          }
                          mask="___.___.___-__"
                          replacement={{ _: /\d/ }}
                        />
                        <small>
                          {getErrorMessage('cpfOwner', form.errors.cpfOwner)}
                        </small>
                      </InputGroup>
                    </Row>

                    <Row marginTop="24px">
                      <InputGroup>
                        <label htmlFor="cardDisplayName">Nome no cartão</label>
                        <input
                          id="cardDisplayName"
                          name="cardDisplayName"
                          type="text"
                          value={form.values.cardDisplayName}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardDisplayName') ? 'error' : ''
                          }
                        />
                        <small>
                          {getErrorMessage(
                            'cardDisplayName',
                            form.errors.cardDisplayName
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <InputMask
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardNumber') ? 'error' : ''
                          }
                          mask="____ ____ ____ ____"
                          replacement={{ _: /\d/ }}
                        />
                        <small>
                          {getErrorMessage(
                            'cardNumber',
                            form.errors.cardNumber
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup maxWidth="123px">
                        <label htmlFor="expiresMonth">Mês do vencimento</label>
                        <InputMask
                          id="expiresMonth"
                          name="expiresMonth"
                          type="text"
                          value={form.values.expiresMonth}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('expiresMonth') ? 'error' : ''
                          }
                          mask="__"
                          replacement={{ _: /\d/ }}
                        />
                        <small>
                          {getErrorMessage(
                            'expiresMonth',
                            form.errors.expiresMonth
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup maxWidth="123px">
                        <label htmlFor="expiresYear">Ano de vencimento</label>
                        <InputMask
                          id="expiresYear"
                          name="expiresYear"
                          type="text"
                          value={form.values.expiresYear}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('expiresYear') ? 'error' : ''
                          }
                          mask="__"
                          replacement={{ _: /\d/ }}
                        />
                        <small>
                          {getErrorMessage(
                            'expiresYear',
                            form.errors.expiresYear
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <InputMask
                          id="cardCode"
                          name="cardCode"
                          type="text"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardCode') ? 'error' : ''
                          }
                          mask="___"
                          replacement={{ _: /\d/ }}
                        />
                        <small>
                          {getErrorMessage('cardCode', form.errors.cardCode)}
                        </small>
                      </InputGroup>
                    </Row>

                    <Row marginTop="24px">
                      <InputGroup maxWidth="150px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          id="installments"
                          name="installments"
                          value={form.values.installments}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                        >
                          {installments.map(installment => (
                            <option
                              key={installment.quantity}
                              value={installment.quantity}
                            >
                              {installment.quantity}x de{' '}
                              {installment.formattedAmount}
                            </option>
                          ))}
                        </select>
                      </InputGroup>
                    </Row>
                  </>
                )}
              </div>
            </div>
          </Card>

          {isError && (
            <p
              style={{
                color: '#ff4d4d',
                fontWeight: 'bold',
                marginTop: '16px'
              }}
            >
              Ocorreu um erro ao processar sua compra. Confira os dados e tente
              novamente.
            </p>
          )}

          <Button
            type="submit"
            title="Clique aqui para finalizar a compra"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Finalizando compra...' : 'Finalizar Compra'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
