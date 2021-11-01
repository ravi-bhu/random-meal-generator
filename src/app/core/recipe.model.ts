import { Ingredient } from './ingredient.model';

export type Recipe = {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  pictureUrl: string;
  tutorialVideoUrl: string;
};
