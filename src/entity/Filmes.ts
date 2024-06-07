import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Filmes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  moviename: string;

  @Column({ length: 100, nullable: false })
  diretor: string;

  @Column({ nullable: false })
  ano: number;

  @Column({ length: 20, nullable: false })
  genero: string;

  @Column({ type: 'varchar', nullable: false })
  poster: string;
}
