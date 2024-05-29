import { Component, ViewChild} from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {

  constructor(private router: Router){}

  joinRoom(roomId: string, name: string){
    this.router.navigate(["/join"], {queryParams: {room: roomId,
                                                   name: name}} )
  }
}
