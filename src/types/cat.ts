export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface FavoriteCat {
  id: string;
  imageId: string;
  url: string;
  addedAt: number;
}