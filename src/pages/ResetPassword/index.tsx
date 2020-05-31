import React, { useRef, useCallback } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { Container, Content, AnimationContainer, Background } from './styles';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface ResetPasswordFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não conferem',
          ),
        });
        await schema.validate(data, { abortEarly: false });
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });
        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha.',
          description:
            'Ocorreu um erro ao resetar a sua senha. Verifique as credenciais.',
        });
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar Senha</h1>
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              type="password"
              name="password"
              icon={FiLock}
              placeholder="Senha"
            />
            <Input
              type="password"
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirmação da senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Alterar minha senha</Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
