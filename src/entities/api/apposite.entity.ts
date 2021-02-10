import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('apposite')
export default class AppositeEntity  {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  idConta: number;
 

  @Column({ type: 'float' })
  valor_titular: number;
 
  @Column()
  inadimplente: string;

  @CreateDateColumn({ type: 'datetime' })
  data_criacao: Date;

  @UpdateDateColumn({ type: 'datetime' })
  data_atualizacao: Date;
}
