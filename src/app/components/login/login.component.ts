import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonSpinner,
} from '@ionic/angular/standalone';
import { AuthFacade } from '../../features/auth/auth.facade';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonSpinner,
    IonButton,
    IonItem,
    IonList,
    IonInput,
    IonContent,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authFacade: AuthFacade = inject(AuthFacade);

  pattern = '\\w{5,}';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('mattyk17', [
      Validators.required,
      Validators.pattern(this.pattern),
    ]),
    password: new FormControl('pass123', [
      Validators.required,
      Validators.pattern(this.pattern),
    ]),
  });

  login() {
    this.authFacade.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
  }
}
