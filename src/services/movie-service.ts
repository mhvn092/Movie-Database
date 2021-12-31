import { ActorEntity } from "../entities/actor-Entity";
import { DirectorEntity } from "../entities/director-entity";
import { GenreEntity } from "../entities/genre-entity";
import { MovieEntity } from "../entities/movie-entity";

export class MovieService {
    public async insert(data: MovieEntity) {
      const movie = MovieEntity.create(data);
      await movie.save();
  
      return movie;
    }
    public async delete(id: number) {
        return MovieEntity.delete(id);
      }
    public async find(id: number) {
      const movie = await MovieEntity.findOne(id);
      return movie;
    }
  
    public async findAll(page: number, count: number) {
      const movies = await MovieEntity.find({
        skip: page * count,
        take: count,
        order: {
          id: "ASC",
        },
      });
      return movies;
    }
    public async addActor(movie: MovieEntity,actor: ActorEntity,) {
        console.log(movie.actors);
        if (movie.actors != undefined) {
          console.log("if 1", movie.actors);
          movie.actors.push(actor);
        } else {
            movie.actors = [actor];
        }
    
        await movie.save();
    
        return movie;
      }
      public async addDirector(movie: MovieEntity,director: DirectorEntity,) {
        console.log(movie.relatedDirector);
        if (movie.relatedDirector != undefined) {
          console.log("if 1",movie.relatedDirector);
          movie.relatedDirector =director;
        } else {
            movie.relatedDirector = director;
        }
    
        await movie.save();
    
        return movie;
      }

      
      public async addGenre(movie: MovieEntity,genre: GenreEntity) {
        console.log(movie.Genre);
        if (movie.Genre != undefined) {
          console.log("if 1", movie.Genre);
          movie.Genre.push(genre);
        } else {
            movie.Genre = [genre];
        }
    
        await movie.save();
    
        return movie;
      }
  }