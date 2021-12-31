import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieEntity } from "./movie-entity";

@Entity('Actor')
export class ActorEntity extends BaseEntity {
@PrimaryGeneratedColumn ()
id:number;

@Column()
name:string;

@ManyToMany(()=>MovieEntity)
@JoinTable({
    name: "Role",
    joinColumn: {
      name: "ActorId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "MovieId",
      referencedColumnName: "id",
    },
  })
  movies: MovieEntity[];

}