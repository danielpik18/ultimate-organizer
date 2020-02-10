import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskSuggestionsService {
  get tasksSuggestions(): string[] {
    return [
      'Take out the trash',
      'Call my mom',
      'Call my dad',
      'Call my parents',
      'Buy dog food',
      'Buy cat food',
      'Jog for 20 minutes',
      'Eat some fruit',
      'Read 10 pages of any book',
      'Practice any music instrument for 30 minutes',
      'Pay any bills left'
    ];
  }

  constructor() { }
}
