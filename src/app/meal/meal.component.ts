import { Component, Input } from '@angular/core';
import { Recipe } from '../core/recipe.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent {
  @Input()
  meal?: Recipe;

  constructor(private sanitizer: DomSanitizer) {}

  getSanitizedUrl(url: string) {
    const embedUrl = MealComponent.youtubeWatchUrlToEmbedUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private static youtubeWatchUrlToEmbedUrl(url: string): string {
    return url.replace('watch?v=', 'embed/');
  }
}
