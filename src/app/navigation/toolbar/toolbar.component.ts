import {Component} from '@angular/core';
import {MealService} from '../../core/meal.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private mealService: MealService) {
  }

  onGetRandomMeal() {
    this.mealService.generateMeal();
  }
}
