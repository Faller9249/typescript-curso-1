import { DiasDaSemana } from './../enums/dia-da-semana.js';
import { MensagemView } from './../views/mensagem-views.js';
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacaoView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacaoView("#negociacoesView", true);
  private mensagemView = new MensagemView('#mensagemView');
  private readonly SADADO = 6;
  private readonly DOMINGO = 0;

  constructor() {
    /*
      Zé, se viu isso?
    */
    this.inputData = <HTMLInputElement>document.querySelector("#data");
    this.inputQuantidade = <HTMLInputElement>document.querySelector("#quantidade");
    this.inputValor = <HTMLInputElement>document.querySelector("#valor");
    this.negociacoesView.update(this.negociacoes);
  }

  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    )
    if(this.ehDiaUtil(negociacao.data)){
      this.mensagemView.update('Apensa negociações em dias úteis são aceitas');
      return;
    }
    this.negociacoes.adiciona(negociacao);
    this.limparFormulario();
    this.altualizaView();   
  }

  private ehDiaUtil(date: Date){
    return date.getDay() > DiasDaSemana.DOMINGO
        && date.getDay() < DiasDaSemana.SABADO;
  }

  private criaNegociacao(): Negociacao {
    const exp = /-/g;
    const date = new Date(this.inputData.value.replace(exp, ","));
    const quantidade = parseInt(this.inputQuantidade.value);
    const valor = parseFloat(this.inputValor.value);
    return new Negociacao(date, quantidade, valor);
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private altualizaView(): void{
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso")
  }
}
