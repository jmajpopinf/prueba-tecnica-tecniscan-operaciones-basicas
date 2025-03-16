import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { OperacionesService, Resultado } from './service/operaciones.service';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'operaciones-basicas';

  private readonly formBuilder = inject(FormBuilder);
  operacionesService = inject(OperacionesService);

  resultado: Resultado | null = null;

  form = this.formBuilder.group({
    primerNumero: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]],
    segundoNumero: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]],
    operacion: ['', [Validators.required]]
  });

  get primerNumero() {
    return this.form.get('primerNumero');
  }

  get segundoNumero() {
    return this.form.get('segundoNumero');
  }

  get operacion() {
    return this.form.get('operacion');
  }

  realizarOperacion(){
    const formulario = this.form.value;

    if(this.form.valid){
      this.operacionesService.operacion(Number(formulario.primerNumero), Number(formulario.segundoNumero), String(formulario.operacion))
      .pipe(
        catchError((error) => {
          if(error.status === 400){
            if(error?.error?.mensaje){
              alert(error.error.mensaje);
            }
          } else {
            alert('Error en el servidor');
          }

          return of(null);
        })
      )
      .subscribe((res) => {
        this.resultado = res;
      });

    }
  }

  limpiarFormulario(){
    this.form.reset();
    this.resultado = null;
  }
}
