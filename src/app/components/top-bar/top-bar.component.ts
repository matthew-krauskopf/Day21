import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthFacade } from 'src/app/features/auth/auth.facade';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  standalone: true,
  imports: [IonicModule],
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  authFacade = inject(AuthFacade);
  logo = 'assets/fascism.png';

  constructor() {}

  ngOnInit() {}
}
