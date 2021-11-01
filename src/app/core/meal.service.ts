import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const RANDOM_RECIPE_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private meal$ = new Subject<Recipe>();

  constructor(private httpClient: HttpClient) {}

  getMeal(): Observable<Recipe> {
    return this.meal$.asObservable();
  }

  updateWithNewMeal() {
    this.httpClient
      .get<any>(RANDOM_RECIPE_URL)
      .pipe(
        map((data) => {
          const meal = data.meals[0];
          const recipe: Recipe = {
            id: meal.idMeal,
            name: meal.strMeal,
            ingredients: [],
            instructions: meal.strInstructions,
            pictureUrl: meal.strMealThumb,
            tutorialVideoUrl: meal.strYoutube,
          };
          return recipe;
        })
      )
      .subscribe((data) => {
        this.meal$.next(data);
      });
  }
}
