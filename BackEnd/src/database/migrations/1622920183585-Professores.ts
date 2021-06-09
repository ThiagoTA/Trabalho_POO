import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class Professores1622920183585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'professores',
        columns: [
          {
            name: 'id',
            type: 'uuid', // universal unique id
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'disciplina',
            type: 'varchar',
          },
          {
            name: 'professor',
            type: 'varchar',
          },
          {
            name: 'diasemana',
            type: 'varchar',
          },
          {
            name: 'periodo',
            type: 'varchar',
          },
          {
            name: 'horario',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('professores');
  }
}
