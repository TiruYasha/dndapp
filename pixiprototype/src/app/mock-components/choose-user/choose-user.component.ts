import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { MockJoinService } from 'src/app/_services/mock-join.service';

@Component({
  selector: 'trpg-choose-user',
  templateUrl: './choose-user.component.html',
  styleUrls: ['./choose-user.component.scss']
})
export class ChooseUserComponent implements OnInit {

  constructor(private mockJoinService: MockJoinService, private router: Router) { }

  ngOnInit(): void {
  }

  chooseUser(): void {
    this.mockJoinService.joinGame('9a747b4b-5ce4-428b-8abe-af56ca738c84', '16a29c8f-2952-4b5d-9408-a765b2982239').
      subscribe(token => {
        this.setToken(token);
      });
  }

  chooseGm(): void {
    this.mockJoinService.joinGame('9a747b4b-5ce4-428b-8abe-af56ca738c84', 'f0a2c7d8-68cf-4c73-bca7-642784531005').
      subscribe(token => {
        this.setToken(token.token);
      });
  }

  setToken(token: string): void {
    localStorage.setItem('gameToken9a747b4b-5ce4-428b-8abe-af56ca738c84', token);
    this.router.navigateByUrl('/game/9a747b4b-5ce4-428b-8abe-af56ca738c84');
  }
}
