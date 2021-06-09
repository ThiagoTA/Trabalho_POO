import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import { Container } from './styles'

import Button from '../../components/Button';

import api from '../../services/api';

interface NewInFormData {
  id: string;
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [professores, setProfessores] = useState<NewInFormData[]>([])

  useEffect(() => {
    api.get('professores').then(response => {
      setProfessores(response.data)
    })
  }, [])

  return (
    <>
      <Header />
      <Container>
  
        <ul>
  
          {professores.map((info, index) => (
              <div>
                <li key={index.toString()}>
                  <h1>{info.professor}</h1>
                  <Button>
                  <Link to={`/details/${info.id}`}>Detalhes</Link>
                  </Button> 
                  <Button onClick={async () => {
                    await api.delete(`/professores/${info.id}`)
                    history.push('/')
                  }}>Deletar</Button>
                  <Button onClick={async () => {
                    history.push(`/atualizar/${info.id}`)
                  }}>Atualizar</Button>
                </li>
              </div>
            ))}
        </ul>
  
      </Container>
    </>
  )
}

export default Dashboard;
