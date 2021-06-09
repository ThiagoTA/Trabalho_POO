import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles'
import { useToast } from '../../hooks/ToastContext';
import { Link } from 'react-router-dom';

interface NewInFormData {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const New: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: NewInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        disciplina: Yup.string().required('Disciplina obrigatória'),
        professor: Yup.string().required('Professor obrigatório'),
        diasemana: Yup.string().required('Dia Semana obrigatório'),
        periodo: Yup.string().required('Periodo obrigatório'),
        horario: Yup.string().required('Horário obrigatório')
      })
      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current?.reset()

      await api.post('/professores', data);

      addToast({
        type: 'success',
        title: 'Cadastro Realizado',
        description: 'Professor foi registrado com sucesso !',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro no Cadastro',
        description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
      });
    }
  }, [addToast]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Cadastro Professores/Disciplina</h1>
        <Input name="disciplina" placeholder="Disciplina" />
        <Input name="professor" placeholder="Professor" />
        <Input name="diasemana" placeholder="Dia Semana" />
        <Input name="periodo" placeholder="Periodo" />
        <Input name="horario" placeholder="Horario" />
        <Button type="submit">Cadastrar</Button>
        <Link to='/'>
        <Button type="submit">Voltar</Button>
        </Link>
      </Form>
    </Container>
  )
}

export default New