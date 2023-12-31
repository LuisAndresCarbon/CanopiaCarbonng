
import { Component } from '@angular/core';
import { UsuarioService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ],
})
export class LoginPageComponent {
  constructor(private usuarioservice : UsuarioService, private router: Router,private snackBar : MatSnackBar){}

  usuario_email: string = '';
  usuario_pw: string = '';
  errorMessage: string = '';

  submitted: boolean = false;
  loginError: boolean = false;
  iniciarSesion(form: NgForm) {
    this.submitted = true;
  
    if (form.valid) {
      this.usuarioservice.iniciarSesion(this.usuario_email, this.usuario_pw)
        .subscribe(
          response => {
            if (response && response.id) {
              // La respuesta fue exitosa (estado 2xx)
              console.log('Inicio de sesión exitoso:', response);
  
              // Mostrar mensaje de éxito con MatSnackBar
              this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
                duration: 3000, // Duración del mensaje en milisegundos
                panelClass: ['success-snackbar'] // Clase CSS personalizada para estilo de éxito
              });
  
              // Limpiar mensaje de error
              this.loginError = false;
              this.errorMessage = '';
            } else {
              // La respuesta no es válida (por ejemplo, credenciales incorrectas)
              console.log('Error en el inicio de sesión:', response);
              this.loginError = true;
              this.errorMessage = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
  
              // Cerrar el MatSnackBar si estaba abierto (para evitar mensajes contradictorios)
              this.snackBar.dismiss();
            }
  
            // Reiniciar el formulario y otras variables necesarias
            form.resetForm();
            this.submitted = false;
          },
          error => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.error(error);
            this.loginError = true;
            this.errorMessage = 'Error en el servidor. Por favor, inténtelo de nuevo más tarde.';
  
            // Cerrar el MatSnackBar si estaba abierto (para evitar mensajes contradictorios)
            this.snackBar.dismiss();
          }
          
        );
        this.router.navigate(["/proyectos/list"]);
    }

  }
}