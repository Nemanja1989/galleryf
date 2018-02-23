/*
export class Gallery {
    id;
    title;
    pictures;
    author_id;

    constructor( id: number , title: string, pictures: string,  author_id: number) {
        this.id = id;
        this.title = title;
        this.pictures = pictures;
        this.author_id = author_id;
    }
}*/


import { Image } from './image';
import { User } from './user';

export class Gallery {
    public id: '';
    public title = '';
    public description = '';
    public author_id = new User();
    public created_at = '';
    public images: Image[] = [new Image()];

    constructor(data ?: {
        id ?: number,
        title ?: string,
        description ?: string,
        owner ?: User,
        created_at ?: Date,
        images ?: Image[]
    }) {
        Object.assign(this, data || {});
    }
}

