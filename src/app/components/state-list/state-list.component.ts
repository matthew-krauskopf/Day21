import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StateFacade } from 'src/app/features/state/state.facade';

@Component({
  selector: 'app-state-list',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss'],
})
export class StateListComponent implements OnInit {
  stateFacade = inject(StateFacade);

  constructor() {}

  ngOnInit() {
    this.stateFacade.loadStates();
  }
}
