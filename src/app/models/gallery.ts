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
}
