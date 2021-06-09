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
import { Link, useRouteMatch } from 'react-router-dom';

interface ProfessoresParametros {
  professor: string;
}

interface UpdateInFormData {
  id: string
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const Atualizar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { params } = useRouteMatch<ProfessoresParametros>();
  console.log(params)

  const handleSubmit = useCallback(async (data: UpdateInFormData) => {
    try {

      await api.patch(`/professores/${params.professor}`, data);

      addToast({
        type: 'success',
        title: 'Atualização Realizada',
        description: 'As informações foram atualizadas com sucesso !',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro no Atualizar',
        description: 'Ocorreu um erro ao atualizar, tente novamente',
      });
    }
  }, [addToast]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Atualizar Professor/Disciplina</h1>
        <Input name="disciplina" placeholder="Disciplina" />
        <Input name="professor" placeholder="Professor" />
        <Input name="diasemana" placeholder="Dia Semana" />
        <Input name="periodo" placeholder="Periodo" />
        <Input name="horario" placeholder="Horario" />
        <Button type="submit">Atualizar</Button>
        <Link to='/'>
        <Button type="submit">Voltar</Button>
        </Link>
      </Form>
    </Container>
  )
}

export default Atualizar;


