import { ActorEntity } from "../entities/actor-Entity";
import { DirectorEntity } from "../entities/director-entity";
import { GenreEntity } from "../entities/genre-entity";
import { MovieEntity } from "../entities/movie-entity";

export class DirectorService {
    public async insert(data: DirectorEntity) {
      const movie = DirectorEntity.create(data);
      await movie.save();
  
      return movie;
    }
    public async delete(id: number) {
        return DirectorEntity.delete(id);
      }
    public async find(id: number) {
      const movie = await DirectorEntity.findOne(id);
      return movie;
    }
  
    public async findAll(page: number, count: number) {
      const movies = await DirectorEntity.find({
        skip: page * count,
        take: count,
        order: {
          id: "ASC",
        },
      });
      return movies;
    }
    public async addMovie(movie: MovieEntity,director: DirectorEntity,) {
        console.log(director.movies);
        if (director.movies != undefined) {
          console.log("if 1", director.movies);
          director.movies.push(movie);
        } else {
            director.movies = [movie];
        }
    
        await movie.save();
    
        return movie;
      }

      public async addGenre(director: DirectorEntity,genre: GenreEntity,) {
        console.log(director.Genres);
        if (director.Genres != undefined) {
          console.log("if 1", director.Genres);
          director.Genres.push(genre);
        } else {
            director.Genres = [genre];
        }
    
        await genre.save();
    
        return genre;
      }
  }