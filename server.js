import Fastify from 'fastify';

/* import {DatabaseMemory} from './database-memory.js'; */
import { DatabasePostgres } from './database-postgres.js';

const server = Fastify();

/* const database = new DatabaseMemory(); */
const database = new DatabasePostgres();

server.post('/videos',async (request,reply)=>{
  const {title, description} = request.body;
  await database.create({
    title,
    description,
  });
 
  return reply.status(201).send(video);
});

server.get('/videos',async (request,reply)=>{
  const search = request.query.search;

  const videos = await database.findVideos(search);

  return reply.status(201).send(videos);  
});

server.put('/videos/:id',async (request,reply)=>{
  const {title, description} = request.body;
  const {id} =request.params;
 await database.update(id,{
    title,
    description,
  });
 
  return reply.status(204).send();
});

server.delete('/videos/:id',async (request,reply)=>{
  const {id} =request.params;

  await database.delete(id);
 
  return reply.status(204).send();
});

server.listen({port: process.env.PORT ?? 3333,},(_,address)=>{
  console.log(`server online at ${address}`);
})
