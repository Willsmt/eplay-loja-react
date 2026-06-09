import Button from '../../components/Button'
import Card from '../../components/Card'
import { Row, InputGroup, TabButton } from './styles'

import credit from '../../assets/images/credit-card.png'
import codeBar from '../../assets/images/codigoBarras.png'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'

const Checkout = () => {
  // REMOVIDO: const [payWithCard, setPayWithCard] = useState(false)
  // O Formik vai gerenciar esse estado agora!
  const [purchase, { isLoading, isError, data, isSuccess }] =
    usePurchaseMutation()
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
      payWithCard: Yup.boolean(), // <-- DECLARADO AQUI PARA O YUP RECONHECER

      fullName: Yup.string()
        .required('Nome completo é obrigatório')
        .min(3, 'Digite pelo menos 3 caracteres'),
      email: Yup.string()
        .required('E-mail é obrigatório')
        .email('Digite um e-mail válido'),
      cpf: Yup.string()
        .required('CPF é obrigatório')
        .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
      deliveryEmail: Yup.string()
        .required('E-mail de entrega é obrigatório')
        .email('Digite um e-mail válido'),
      confirmdeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails não conferem')
        .required('Confirme o e-mail'),

      // Validações condicionais agora vão funcionar!
      cardOwner: Yup.string().when('payWithCard', {
        is: true,
        then: schema => schema.required('Nome do titular é obrigatório')
      }),
      cpfOwner: Yup.string().when('payWithCard', {
        is: true,
        then: schema => schema.required('CPF do titular é obrigatório')
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
            .matches(/^\d{16}$/, 'Número deve ter 16 dígitos')
      }),
      expiresMonth: Yup.string().when('payWithCard', {
        is: true,
        then: schema =>
          schema
            .required('Mês é obrigatório')
            .matches(/^(0[1-9]|1[0-2])$/, 'Digite um mês válido')
      }),
      expiresYear: Yup.string().when('payWithCard', {
        is: true,
        then: schema =>
          schema
            .required('Ano é obrigatório')
            .matches(/^\d{4}$/, 'Digite um ano válido')
      }),
      cardCode: Yup.string().when('payWithCard', {
        is: true,
        then: schema =>
          schema
            .required('CVV é obrigatório')
            .matches(/^\d{3,4}$/, 'CVV deve ter 3 ou 4 dígitos')
      }),
      installments: Yup.string().required('Escolha o parcelamento')
    }),

    onSubmit: values => {
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullName
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: 1,
          card: {
            active: values.payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfOwner,
              name: values.cardOwner
            },
            expires: {
              month: 1,
              year: 2026
            }
          }
        },
        products: [
          {
            id: 1,
            price: 10
          }
        ]
      })
    }
  })

  const getErrorMessage = (field: string, message?: string) => {
    const isTouched = field in form.touched
    const hasError = field in form.errors
    if (isTouched && hasError) return message
    return ''
  }

  return (
    <div className="container">
      {isSuccess ? (
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
                />
                <small>{getErrorMessage('email', form.errors.email)}</small>
              </InputGroup>
              <InputGroup>
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={form.values.cpf}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
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
                  type="button" // <-- PREVINE SUBMISSÃO DO FORM
                  isActive={!form.values.payWithCard} // <-- USA O ESTADO DO FORMIK
                  onClick={() => form.setFieldValue('payWithCard', false)} // <-- ATUALIZA O FORMIK
                >
                  <img src={codeBar} alt="Pagar com código de barras" />
                  Boleto bancário
                </TabButton>
                <TabButton
                  type="button" // <-- PREVINE SUBMISSÃO DO FORM
                  isActive={form.values.payWithCard} // <-- USA O ESTADO DO FORMIK
                  onClick={() => form.setFieldValue('payWithCard', true)} // <-- ATUALIZA O FORMIK
                >
                  <img src={credit} alt="Pagar com cartão de crédito" />
                  Cartão de crédito
                </TabButton>
              </Row>

              <div className="margin-top">
                {/* LÊ O ESTADO DIRETAMENTE DO FORMIK */}
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
                        />
                        <small>
                          {getErrorMessage('cardOwner', form.errors.cardOwner)}
                        </small>
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cpfOwner">
                          CPF do titular do cartão
                        </label>
                        <input
                          id="cpfOwner"
                          name="cpfOwner"
                          type="text"
                          value={form.values.cpfOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
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
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
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
                        <input
                          id="expiresMonth"
                          name="expiresMonth"
                          type="text"
                          value={form.values.expiresMonth}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
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
                        <input
                          id="expiresYear"
                          name="expiresYear"
                          type="text"
                          value={form.values.expiresYear}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
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
                        <input
                          id="cardCode"
                          name="cardCode"
                          type="text"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
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
                          <option value="1">1x de R$ 200,00</option>
                          <option value="2">2x de R$ 200,00</option>
                          <option value="3">3x de R$ 200,00</option>
                        </select>
                      </InputGroup>
                    </Row>
                  </>
                )}
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            title="Clique aqui para finalizar a compra"
            variant="primary"
          >
            Finalizar compra
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
