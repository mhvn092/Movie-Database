import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenreEntity } from "./genre-entity";
import { MovieEntity } from "./movie-entity";

@Entity('Director')
export class DirectorEntity extends BaseEntity{
@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@OneToMany(()=>MovieEntity, (Movie)=>Movie.relatedDirector)
    movies: MovieEntity[];

@ManyToMany(()=>GenreEntity)
@JoinTable({
    name:'Director-Genre',
    joinColumn:{
        name:'DirectorId',
        referencedColumnName:'id',
    },
    inverseJoinColumn:{
        name:'GenreId',
        referencedColumnName:'id',
    },
})
Genres:GenreEntity[];

}