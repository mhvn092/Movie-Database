import express from "express";
import { ActorEntity } from "../entities/actor-Entity";
import { ActorService } from "../services/actor-service";
import { MovieService } from "../services/movie-service";

const router = express.Router();

const movieService = new MovieService();
const actorservice = new ActorService();
router.post("/", async (req, res) => {
  const { name } = req.body;

  const movie = new ActorEntity();
  movie.name = name;
  await actorservice.insert(movie);

  return res.json(movie);
});

router.get("/", async (req, res) => {
  const { name } = req.query;
  const movies = await actorservice.findAll((name || "") as string);
  return res.json(movies);
});

router.put("/:actorId/new-movie/:movieId", async (req, res) => {
    const { movieId, actorId } = req.params;
  
    const movie = await movieService.find(parseInt(movieId));
  
    console.log(`actor before addind new movie`, movie);
    if (!movie) {
      res.status(404).send("movie nor found");
    }
  
    const actor = await actorservice.find(parseInt(actorId));
  
    if (!actor) {
      res.status(404).send("actor found");
    }
  
    const updatedmovie = await actorservice.addMovie(actor,movie);
  
    return res.json(updatedmovie);
  });
  

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await actorservice.find(parseInt(id));
      if (!movie) {
        return res.status(404).send("actor not found");
      }
      await actorservice.delete(parseInt(id));
      return res.json(movie);
    } catch (e) {
      return res.status(500).send(`Error: ${e}`);
    }
  });

export { router as ActorController };
