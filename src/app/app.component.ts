import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PageFooterComponent } from "./components/page-footer/page-footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, PageFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tmdb';
}
