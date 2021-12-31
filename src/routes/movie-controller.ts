import express from "express";
import { MovieEntity } from "../entities/movie-entity";
import { ActorService } from "../services/actor-service";
import { DirectorService } from "../services/director-service";
import { GenreService } from "../services/genre-service";
import { MovieService } from "../services/movie-service";

const router = express.Router();

const directorService = new DirectorService();
const movieService = new MovieService();
const actorservice = new ActorService();
const genreservice = new GenreService();
router.post("/", async (req, res) => {
  const { name } = req.body;

  const movie = new MovieEntity();
  movie.name = name;
  await movieService.insert(movie);

  return res.json(movie);
});

router.get("/", async (req, res) => {
  const { page, count } = req.query;
  const movies = await movieService.findAll(
    parseInt(page as string),
    parseInt(count as string)
  );
  return res.json(movies);
});

router.put("/:movieId/new-actor/:actorId", async (req, res) => {
    const { movieId, actorId } = req.params;
  
    const movie = await movieService.find(parseInt(movieId));
  
    console.log(`movie before addind new actor`, movie);
    if (!movie) {
      res.status(404).send("movie nor found");
    }
  
    const actor = await actorservice.find(parseInt(actorId));
  
    if (!actor) {
      res.status(404).send("actor nor found");
    }
  
    const updatedmovie = await movieService.addActor(movie, actor);
  
    return res.json(updatedmovie);
  });
  
  router.put("/:movieId/new-genre/:genreId", async (req, res) => {
    const { movieId, genreId } = req.params;
  
    const movie = await movieService.find(parseInt(movieId));
  
    console.log(`movie before addind new actor`, movie);
    if (!movie) {
      res.status(404).send("movie nor found");
    }
  
    const genre = await genreservice.find(parseInt(genreId));
  
    if (!genre) {
      res.status(404).send("genre nor found");
    }
  
    const updatedmovie = await movieService.addGenre(movie, genre);
  
    return res.json(updatedmovie);
  });
  
  router.put("/:movieId/:directorId", async (req, res) => {
    const { movieId,directorId } = req.params;
  
    const movie = await movieService.find(parseInt(movieId));
  
    console.log(`movie before addind director`, movie);
    if (!movie) {
      res.status(404).send("movie nor found");
    }
  
    const direcotor  = await directorService.find(parseInt(directorId));
  
    if (!direcotor ) {
      res.status(404).send("genre nor found");
    }
  
    const updatedmovie = await movieService.addDirector(movie, direcotor);
  
    return res.json(updatedmovie);
  });
  

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await movieService.find(parseInt(id));
      if (!movie) {
        return res.status(404).send("movie not found");
      }
      await movieService.delete(parseInt(id));
      return res.json(movie);
    } catch (e) {
      return res.status(500).send(`Error: ${e}`);
    }
  });

export { router as MovieController };
