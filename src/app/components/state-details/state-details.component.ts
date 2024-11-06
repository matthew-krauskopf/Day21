import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StateFacade } from 'src/app/features/state/state.facade';

@Component({
  selector: 'app-state-details',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.scss'],
})
export class StateDetailsComponent implements OnInit {
  stateFacade = inject(StateFacade);
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    this.stateFacade.loadState(this.route.snapshot.params['id']);
  }
}
