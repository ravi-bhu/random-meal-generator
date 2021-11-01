import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../core/recipe.model';
import { MealService } from '../core/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  @Input()
  getNewMeal?: EventEmitter<void>;
  meal$?: Observable<Recipe>;
  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.meal$ = this.mealService.getMeal();
  }
}
