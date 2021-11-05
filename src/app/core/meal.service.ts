import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Ingredient } from './ingredient.model';

const RANDOM_RECIPE_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private meal$ = new Subject<Recipe>();

  constructor(private httpClient: HttpClient) {}

  private static toRecipe(meal: any): Recipe {
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      ingredients: MealService.getIngredients(meal),
      instructions: MealService.getInstructions(meal.strInstructions),
      pictureUrl: meal.strMealThumb,
      tutorialVideoUrl: meal.strYoutube,
    };
  }

  private static getIngredients(meal: any): Ingredient[] {
    return Object.entries<string>(meal)
      .filter(
        ([key, value]) => key.startsWith('strIngredient') && value.length > 0
      )
      .reduce<Ingredient[]>((ingredients, [key]) => {
        const ingredient = MealService.getIngredient(key, meal);
        ingredients.push(ingredient);
        return ingredients;
      }, []);
  }

  private static getIngredient(key: string, meal: any): Ingredient {
    const ingredientIndex = key.replace('strIngredient', '');
    const measure = 'strMeasure' + ingredientIndex;
    return {
      name: meal[key],
      measure: meal[measure],
    };
  }

  private static getInstructions(strInstructions: string) {
    return strInstructions
      .split('.')
      .filter((s) => s.length > 0)
      .map((s) => s + '.');
  }

  getMeal(): Observable<Recipe> {
    return this.meal$.asObservable();
  }

  generateMeal() {
    this.fetchMeal()
      .pipe(
        map((data) => {
          const meal = data.meals[0];
          return MealService.toRecipe(meal);
        })
      )
      .subscribe((data) => {
        this.meal$.next(data);
      });
  }

  private fetchMeal() {
    return this.httpClient.get<any>(RANDOM_RECIPE_URL);
  }
}
