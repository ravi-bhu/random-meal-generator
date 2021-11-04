import { Component, OnInit } from '@angular/core';
import { MealService } from './core/meal.service';
import { Observable } from 'rxjs';
import { Recipe } from './core/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  meal$?: Observable<Recipe>;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.meal$ = this.mealService.getMeal();
  }
}
