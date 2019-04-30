import { Component } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent {
  
  public alertaClasses: String;
  public error: string;

  setError({ error, alertaClasses, tempo = 5000 }: { error: string; alertaClasses: string; tempo?: number; }) {
    this.error = error;
    this.alertaClasses = alertaClasses;
    setTimeout(() => {
      this.error = null;
    }, tempo);
  }
}
