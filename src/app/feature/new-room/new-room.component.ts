import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoomCreationResponseDTO } from '../../shared/model/RoomCreationResponseDTO';

@Component({
  selector: 'app-new-room',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './new-room.component.html',
  styleUrl: './new-room.component.css'
})
export class NewRoomComponent {

  roomId: string | undefined;

  API_URL: string = 'http://localhost:8080/room/create';

  constructor(private router: Router, private http: HttpClient){}

  navigateToNewRoom(roomName: string){
    const request = this.prepareRequest(roomName);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const createRoomRequest = this.http.post<RoomCreationResponseDTO>(this.API_URL, request,{headers})
                                       .subscribe(response =>{
                                        this.roomId = response.id;
                                        console.log(response);
                                        this.router.navigate(['/host', this.roomId], {queryParams:{'auth' : response.adminToken}})
                                       });
  }
  prepareRequest(roomName: string){
    return {
      procedure: 'CREATE',
      name: roomName
    }
  }
}

