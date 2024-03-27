// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component'
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description component for movie card
 * @selector 'app-movie-card'
 * @tempalteUrl './movie-card.component.html'
 * @styleUrls './movie-card.component.scss'
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  userData = { Username: "", FavoriteMovies: []};
  FavoriteMovies: any[] = [];
  isFavMovie: boolean = false;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavoriteMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
getFavoriteMovies(): void {
  this.fetchApiData.getUser().subscribe((resp: any) => {
    this.user = resp;
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
  });
}
  /**
   * @description Function that will open the dialog when director button is clicked.
   * @param {string} name name of director
   * @param {string} bio short bio of director
   * @param {string} birth birthday of director
   * @param {string} death deathday of director
   * @returns Directors name, bio, birth date and death date.
   */
  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '450px',
    });
  }
  /**
   * @description function to open movie genre dialog
   * @param {string} name of genre
   * @param {string} description of genre
   */
  openMovieGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }
  /**
   * @description function to open movie details dialog
   * @param description of movie
   */
  openMovieDetailsDialog(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }
  /**
   * @description function to check if movie is favorited
   * @param movie
   * @returns {boolean} true or false
   */
  isFavorite(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * @description function to toggle favorite movie
   * @param {any} movie
   */
  toggleFavorite(movie: any): void {
    const isFavorite = this.isFavorite(movie);
    isFavorite
      ? this.deleteFavoriteMovies(movie)
      : this.addFavoriteMovies(movie);
  }
  /**
   * @description function to add favorite movie called by toggleFavorite
   * @param {any} movie
   */
  addFavoriteMovies(movie: any): void {
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavoriteMovie(this.user.Username, movie._id).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }
    /**
   * @description function to delete favorite movie called by toggleFavorite
   * @param {any} movie
   */
  deleteFavoriteMovies(movie: any): void {
    this.userData.Username = this.user.Username;
    this.fetchApiData.delFavoriteMovie(this.user.Username, movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }
}