import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { Row, InputGroup, TabButton } from './styles'

import credit from '../../assets/images/credit-card.png'
import codeBar from '../../assets/images/codigoBarras.png'

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  return (
    <div className="container">
      <Card title="Dados de cobrança">
        <Row>
          <InputGroup>
            <label htmlFor="fullName">Nome completo</label>
            <input id="fullName" type="text" />
          </InputGroup>
          <InputGroup>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" />
          </InputGroup>
          <InputGroup>
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" type="text" />
          </InputGroup>
        </Row>
        <h3 className="margin-top">Dados de entrega - conteúdo digital</h3>
        <Row>
          <InputGroup>
            <label htmlFor="deliveryEmail">E-mail</label>
            <input id="deliveryEmail" type="text" />
          </InputGroup>
          <InputGroup>
            <label htmlFor="confirmdeliveryEmail">confirme o e-mail</label>
            <input id="confirmdeliveryEmail" type="email" />
          </InputGroup>
        </Row>
      </Card>
      <Card title="Pagamento">
        <div>
          <p style={{ marginBottom: '16px' }}>Escolha a forma de pagamento:</p>
          <Row>
            <TabButton
              isActive={!payWithCard}
              onClick={() => setPayWithCard(false)}
            >
              <img src={codeBar} alt="Pagar com codigos de barras" />
              Boleto bancário
            </TabButton>
            <TabButton
              isActive={payWithCard}
              onClick={() => setPayWithCard(true)}
            >
              <img src={credit} alt="Pagar com o cartão de credito" />
              Cartão de crédito
            </TabButton>
          </Row>

          <div className="margin-top">
            {!payWithCard && (
              <p className="margin-top">
                Ao optar por essa forma de pagamento, é importante lembrar que a
                confirmação pode levar até 3 dias úteis, devido aos prazos
                estabelecidos pelas instituições financeiras. Portanto, a
                liberação do código de ativação do jogo adquirido ocorrerá
                somente após a aprovação do pagamento do boleto.
              </p>
            )}

            {payWithCard && (
              <>
                <Row>
                  <InputGroup>
                    <label htmlFor="cardOwner">Nome do titular do cartão</label>
                    <input type="text" id="cardOwner" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cpfOwner">CPF do titular do cartão</label>
                    <input type="text" id="cpfOwner" />
                  </InputGroup>
                </Row>

                <Row marginTop="24px">
                  <InputGroup>
                    <label htmlFor="cardDisplayName">Nome no cartão</label>
                    <input type="text" id="cardDisplayName" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cardNumber">Número do cartão</label>
                    <input type="text" id="cardNumber" />
                  </InputGroup>
                  <InputGroup maxWidth="123px">
                    <label htmlFor="expiresMonth">Mês do vencimento</label>
                    <input type="text" id="expiresMonth" />
                  </InputGroup>
                  <InputGroup maxWidth="123px">
                    <label htmlFor="expiresYear">Ano de vencimento</label>
                    <input type="text" id="expiresYear" />
                  </InputGroup>
                  <InputGroup maxWidth="48px">
                    <label htmlFor="cardCode">CVV</label>
                    <input type="text" id="cardCode" />
                  </InputGroup>
                </Row>

                <Row marginTop="24px">
                  <InputGroup maxWidth="150px">
                    <label htmlFor="installments">Parcelamento</label>
                    <select id="installments">
                      <option value="">1x de R$ 200,00</option>
                      <option value="">2x de R$ 200,00</option>
                      <option value="">3x de R$ 200,00</option>
                    </select>
                  </InputGroup>
                </Row>
              </>
            )}
          </div>
        </div>
      </Card>

      <Button
        type="button"
        title="Clique aqui para finalizar a compra"
        variant="primary"
      >
        Finalizar compra
      </Button>
    </div>
  )
}

export default Checkout
