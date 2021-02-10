/* eslint-disable array-callback-return */
import { getRepository, Repository } from 'typeorm';

import Apposite from '../../entities/api/apposite.entity';

class AppositeService {
  private appositeRepository: Repository<Apposite>;

  constructor() {
    this.appositeRepository = getRepository(Apposite);
  }

  public async verify(cpf: string): Promise<number[] | number> {
    const apposite = await this.appositeRepository
      .createQueryBuilder('apto')
      .select('DISTINCT apto.id_conta')
      .where(`cpf = :cpf`, { cpf })
      .distinctOn(['apto.id_conta'])
      .getRawMany();

    if (apposite.length === 0) {
      throw new Error('Cliente não está apto');
    }

    const id_contas: number[] = [];
    if (apposite.length >= 1) {
      apposite.map((customer) => {
        id_contas.push(Number(customer.id_conta));
      });
    }

    return id_contas;
  }
}

export default AppositeService;
