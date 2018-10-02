import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatCardModule, MatCardImage, MatPaginatorModule } from '@angular/material';
import { AutocompleteComponent } from '../../movies/autocomplete/autocomplete.component';
import { ToolbarComponent } from '../../movies/toolbar/toolbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatPaginatorModule
  ],
  declarations: [
    AutocompleteComponent,
    ToolbarComponent,
  ],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    AutocompleteComponent,
    ToolbarComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
