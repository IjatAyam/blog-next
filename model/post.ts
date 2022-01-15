export interface PostData {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  isFeatured: boolean;
  content: string;
}

export default class Post {
  constructor(
    public id: string,
    public title: string,
    public image: string,
    public excerpt: string,
    public date: string,
    public slug: string
  ) {}
}
