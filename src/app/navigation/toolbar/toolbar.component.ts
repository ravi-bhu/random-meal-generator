import { Component, OnInit } from '@angular/core';
import { MealService } from '../../core/meal.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private mealService: MealService) {}

  ngOnInit(): void {}

  onGetRandomMeal() {
    this.mealService.updateWithNewMeal();
  }
}
