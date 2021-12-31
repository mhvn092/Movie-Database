import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ActorEntity } from "./actor-Entity";
import { DirectorEntity } from "./director-entity";
import { GenreEntity } from "./genre-entity";

@Entity('Movie')
export class MovieEntity extends BaseEntity{
@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@ManyToOne(()=>DirectorEntity, (Director)=> Director.movies,{
    onDelete:"SET NULL",
})
relatedDirector:DirectorEntity;

@ManyToMany(()=>ActorEntity)
@JoinTable({
    name: "Role",
    joinColumn: {
      name: "MovieId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "ActorId",
      referencedColumnName: "id",
    },
  })
  actors: ActorEntity[];
  
  @ManyToMany(()=>GenreEntity)
  @JoinTable({
      name: "MovieGenre",
      joinColumn: {
        name: "MovieId",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "GenreId",
        referencedColumnName: "id",
      },
    })
    Genre:GenreEntity[];

    

}