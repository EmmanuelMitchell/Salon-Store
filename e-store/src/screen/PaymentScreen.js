import React from 'react'
import  {useContext, useEffect,  useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutStep from '../component/CheckoutStep';
import { Store } from '../Store';

export default function PaymentScreen() {
    const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { shippingAddress, paymentMethod },
      } = state;

      const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
      );

      useEffect(() => {
        if (!shippingAddress.address) {
          navigate('/shipping');
        }
      }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
      };
  return (
    <div>
       <CheckoutStep step1 step2 step3></CheckoutStep>
       <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>

        <Form onSubmit={submitHandler}>
        <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Orange Money"
              value="Orange Money"
              checked={paymentMethodName === 'Orange Money'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <img src='https://www.orange.sl/personal/resources/img/OrangeMoney.jpg' width="90px" alt='logo'/>
          </div>

          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
         
        </div>
    </div>
  )
}
