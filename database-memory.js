import {randomUUID} from 'node:crypto';

export class DatabaseMemory{
  #videosList = new Map();

  findVideos(search){
    return Array.from(this.#videosList.entries()).map(videoArray=>{
      const id = videoArray[0];
      const data = videoArray[1];

      return {
        id,...data
      }
    }).filter(video=>{
      if(search){
        return video.title.includes(search);
      }
      
    });
  }

  create(video){
    const videoId= randomUUID();

    this.#videosList.set(videoId, video);
    return {...video,videoId};
  }

  update(id,video){

    this.#videosList.set(id, video);
  }

  delete(id){
    this.#videosList.delete(id);
  }
}