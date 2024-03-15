import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the genre info dialog.
 * @selector 'app-genre-info'
 * @templateUrl './genre-info.component.html'
 * @styleUrls ['./genre-info.component.scss']
 */
@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {

  /**
   * @constructor - Constructor for GenreInfoComponent.
   * @param data - Data containing genre information.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

  public data: {
    Name: string,
    Description: string
  }
  ) {}

  ngOnInit(): void {

  }

}