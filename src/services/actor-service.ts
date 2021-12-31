import { Like, Not, Raw } from "typeorm";
import { ActorEntity } from "../entities/actor-Entity";
import { MovieEntity } from "../entities/movie-entity";

export class ActorService {
  public async insert(data: ActorEntity) {
    const actor = ActorEntity.create(data);
    return await actor.save();
  }

  public async find(id: number) {
    const actor = await ActorEntity.findOne(id, 
    );
    return actor;
  }

  public async addMovie(actor: ActorEntity, movie: MovieEntity) {
    console.log(actor.movies);
    if (actor.movies != undefined) {
      console.log("if 1", actor.movies);
      actor.movies.push(movie);
    } else {
        actor.movies = [movie];
    }

    await actor.save();

    return actor;
  }

  public async delete(id: number) {
    return ActorEntity.delete(id);
  }

  public async findAll(filterName: string) {
    const actors = await ActorEntity.find({
      where: {
        name: Not(Like(`%${filterName}%`)),
        id: Raw('2*3')
      },
      join: {
        alias: "Actor",
        leftJoinAndSelect: {
          movie: "actor.movies",
        },
      },
    });
    return actors;
  }
}
