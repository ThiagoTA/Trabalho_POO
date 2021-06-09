/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import ProfessoresController from '../app/controllers/ProfessoresController';
import Professores from '../app/models/Professores';

const professoresRouter = Router();

professoresRouter.post('/', async (request, response) => {
  const {
    disciplina,
    professor,
    diasemana,
    periodo,
    horario,
  } = request.body;

  const professoresController = new ProfessoresController();

  const user = await professoresController.store({
    disciplina,
    professor,
    diasemana,
    periodo,
    horario,
  });

  return response.json(user);
});

professoresRouter.get('/', async (request, response) => {
  const professoresRepositorio = getRepository(Professores);
  const user = await professoresRepositorio.find();
  return response.json(user);
});

professoresRouter.get('/:id', async (request, response) => {
  const professoresRepositorio = getRepository(Professores);
  const { id } = request.params;
  const user = await professoresRepositorio.findOne(id);
  return response.json(user);
});

professoresRouter.delete(
  '/:id',

  async (request, response) => {
    const professoresRepositorio = getRepository(Professores);
    const { id } = request.params;
    await professoresRepositorio.delete(id);
    return response.send(`Professor deletado com sucesso`);
  },
);

professoresRouter.patch(
  '/:id',
  async (request, response) => {
  const { id } = request.params;
  const {
    disciplina,
    professor,
    diasemana,
    periodo,
    horario,
  } = request.body;

  const professoresController = new ProfessoresController();

  const user = await professoresController.update({
    id,
    disciplina,
    professor,
    diasemana,
    periodo,
    horario,
  });

  return response.json(user);
});

export default professoresRouter;
