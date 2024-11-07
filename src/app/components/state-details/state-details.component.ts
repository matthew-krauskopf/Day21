import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { tap } from 'rxjs';
import { StateFacade } from 'src/app/features/state/state.facade';

@Component({
  selector: 'app-state-details',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.scss'],
})
export class StateDetailsComponent implements OnInit {
  stateFacade = inject(StateFacade);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  destroyRef = inject(DestroyRef);
  state$ = this.stateFacade.state$;
  //booter$;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    abbreviation: new FormControl('', [
      Validators.maxLength(2),
      Validators.pattern(/^[a-zA-Z]{0,2}$/),
    ]),
  });

  constructor() {
    this.form.addValidators((control: AbstractControl) => {
      const name = control.get('name');
      const abbreviation = control.get('abbreviation');

      if (abbreviation && name) {
        const nameI = name.value as string;
        const abbreviationI = abbreviation.value as string;

        return nameI &&
          abbreviationI &&
          nameI.charAt(0).toUpperCase() !==
            abbreviationI.charAt(0).toUpperCase()
          ? { invalidAbbreviation: true }
          : null;
      }

      return null;
    });

    this.state$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((state) => {
          this.form.patchValue({ name: state ? state.name : '' });
          this.form.patchValue({
            abbreviation: state ? state.abbreviation : '',
          });
        })
      )
      .subscribe();

    //this.booter$ = combineLatest([
    //  this.stateFacade.isProcessing$,
    //  this.stateFacade.states$,
    //]).pipe(
    //  take(1),
    //  map(([processing, states]) => {
    //    console.log(processing, states);
    //    if (states && !states.find((s) => s.id)) {
    //      this.stateFacade.loadStateFailed();
    //    }
    //  })
    //);

    //this.stateFacade.loadState(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.stateFacade.loadState(this.route.snapshot.params['id']);
    //this.booter$.subscribe();
  }

  updateState() {
    if (this.form.valid) {
      this.stateFacade.updateState(
        this.form.value['name'] ?? 'Error',
        this.form.value['abbreviation'] ?? ''
      );
    } else {
      this.form.markAsTouched();
    }
  }

  cancel() {
    this.router.navigate(['dashboard', 'states']);
  }
}
