import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [TranslatePipe],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {}