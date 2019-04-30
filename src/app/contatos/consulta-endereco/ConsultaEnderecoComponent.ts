import { Component, ViewChild } from '@angular/core';
import { Endereco } from '../../interface/endereco';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoService } from '../../services/endereco.service';
import { Contato } from 'src/app/interface/contato';
import {ErrorMsgComponent} from '../../error-msg/error-msg.component';

@Component({
  selector: 'app-consulta-endereco',
  templateUrl: './consulta-endereco.component.html',
  styleUrls: ['./consulta-endereco.component.css']
})

export class ConsultaEnderecoComponent {
  public contato: Contato = <Contato>{};
  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private enderecoService: EnderecoService) { 
        this.contato.endereco = <Endereco>{};
        this.contato.email = new Array(2);
        this.contato.telefones = new Array(2);
  }

  getEndereco() {
      this.enderecoService.getEndereco(this.contato.endereco.cep)
      .subscribe((endereco: Endereco) => {
        this.contato.endereco = endereco;
      }, () => { 
        let auxcep = this.contato.endereco.cep;
        this.contato.endereco = null;
        this.contato.endereco = <Endereco>{};
        this.contato.endereco.cep = auxcep;
        this.errorMsgComponent.setError({ error: 'Falha ao buscar endereço.', alertaClasses: 'alert-danger' }); 
      });
  }

  onSubmit() {
    if (this.contato.email[1] != " " && this.contato.email[0] == this.contato.email[1] ) {
      this.errorMsgComponent.setError({ error: 'E-mails devem ser diferentes!', alertaClasses: 'alert-danger' });
    } else if (this.contato.telefones[1] != " " && this.contato.telefones[0] == this.contato.telefones[1] ) {
      this.errorMsgComponent.setError({ error: 'Telefones devem ser diferentes!', alertaClasses: 'alert-danger' });
    } else {
        this.errorMsgComponent.setError({ error: 'Contato Incluido com Sucesso!', alertaClasses: 'alert-success' });
        console.log(this.contato.nomeCompleto);
        console.log(this.contato.email);
        console.log(this.contato.telefones);
        console.log(this.contato.observacao);
        console.log(this.contato.endereco);
        console.log(this.contato.numlogradouro);
        console.log(this.contato.complementologradouro);
    }
  }
}
