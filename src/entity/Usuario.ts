

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Filmes } from './Filmes';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  iduser: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 256, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  senha: string;

}
