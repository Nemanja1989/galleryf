export class Image {
    public id = '';
    public picture_url = '';
    public order: number;

    constructor(data ?: {
        id ?: number,
        picture_url ?: string,
        order ?: number
    }) {
        Object.assign(this, data || {});
    }
}
