import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DirectorEntity } from "./director-entity";
import { MovieEntity } from "./movie-entity";

@Entity('Genre')
export class GenreEntity extends BaseEntity{
@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@ManyToMany(()=>MovieEntity)
@JoinTable({
    name: "MovieGenre",
    joinColumn: {
      name: "GenreId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "MovieId",
      referencedColumnName: "id",
    },
  })
  movies:MovieEntity[];

  @ManyToMany(()=>DirectorEntity)
  @JoinTable({
    name:'Director-Genre',
    joinColumn:{
        name:'GenreId',
        referencedColumnName:'id',
    },
    inverseJoinColumn:{
        name:'DirectorId',
        referencedColumnName:'id',
    },
  })
  Directores:DirectorEntity[];
}