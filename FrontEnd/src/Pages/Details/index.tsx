import React, { useEffect, useState } from 'react';
import { Container, Disciplinas } from './styles'
import { Link, useRouteMatch } from 'react-router-dom'

import api from '../../services/api';

interface ProfessoresParametros {
  professor: string;
}

interface Cadastro {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<ProfessoresParametros>();
  const [professores, setProfessores] = useState<Cadastro>()

  useEffect(() => {
    api.get(`professores/${params.professor}`).then(response => {
      setProfessores(response.data)
    })
  }, [])

  return (
    <Container>
      <Disciplinas>
        <ul>
            <li>
              <span>Disciplina: {professores?.disciplina}</span>
              <span>Professor: {professores?.professor}</span>
              <span>Dia Semana: {professores?.diasemana}</span>
              <span>Periodo: {professores?.periodo}</span>
              <span>Horario: {professores?.horario}</span>
            </li>
        </ul>
        <Link to="/Dashboard">Voltar</Link>
      </Disciplinas>
    </Container>
  )
}

export default Details;
