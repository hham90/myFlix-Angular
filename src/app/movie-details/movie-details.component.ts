import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the movie synopsis dialog.
 * @selector 'app-movie-details'
 * @templateUrl './movie-details.component.html'
 * @styleUrls ['./movie-details.component.scss']
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  /**
   * @constructor - Constructor for Movie details component.
   * @param data - Data containing movie description.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

  public data: {
    Description: string
  }
  ) {}

  ngOnInit(): void {

  }

}