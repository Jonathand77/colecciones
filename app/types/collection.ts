export type CollectionCategory =
  | "Paleta Drácula"
  | "Yogo Premio / Ogros"
  | "Looney Tunes / Zenú"
  | "Hielocos CocaCola"
  | "Million Warriors"
  | "Funkos"
  | "Figuras"
  | "Posters Firmados";

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  category: CollectionCategory;
  imageUrl: string;
  year?: string;
  artist?: string;
  value?: string;
  notes?: string;
  createdAt: Date;
}