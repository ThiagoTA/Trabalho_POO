import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Professores from '../models/Professores';

interface Request {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

type ProfessoresUpdate = {
  id: string;
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
};

class ProfessoresController {
  public async store({
    disciplina,
    professor,
    diasemana,
    periodo,
    horario,
  }: Request): Promise<Professores> {
    const professoresRepository = getRepository(Professores);

    const user = professoresRepository.create({
      disciplina,
      professor,
      diasemana,
      periodo,
      horario,
    });

    await professoresRepository.save(user);

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async update({
    id,
    disciplina,
    professor,
    diasemana,
    periodo,
    horario,
  }: ProfessoresUpdate) {
    const professoresRepository = getRepository(Professores);

    const professores = await professoresRepository.findOne({ id });

    if (!professores) {
      throw new AppError('id do professor não foi encontrada !');
    }

    await professoresRepository.update(
      { id },
      { disciplina, professor, diasemana, periodo, horario },
    );

    const professoresUpdated = await professoresRepository.findOne({ id });

    return professoresUpdated;
  }
}

export default ProfessoresController;
