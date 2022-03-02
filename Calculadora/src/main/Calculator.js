import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button/Button';
import Display from '../components/Display/Display';

const inicio = {
    limpar: false, 
    operacao: null, 
    valorTela: "0", 
    posicaoAtual: 0,
    valorArray: [0, 0]
}

class Calculator extends Component {

    state = { ...inicio }

  
    clearMemory = () => {
        this.setState({...inicio});
    }

    setoperacao = (operacao) => {
    
        if (this.state.posicaoAtual == 0) {

            this.setState({operacao, posicaoAtual: 1, limpar: true});
        } else {
            const igual = operacao == "="; 
            const posicaoAtual = this.state.operacao; 
            const valorArray = [...this.state.valorArray]; 

            if (posicaoAtual == "+") {
                valorArray[0] = valorArray[0] + valorArray[1];
            } else if (posicaoAtual == "-") {
                valorArray[0] = valorArray[0] - valorArray[1];
            } else if (posicaoAtual == "/"){
                valorArray[0] = valorArray[0] / valorArray[1];
            } else if (posicaoAtual == "*"){
                valorArray[0] = valorArray[0] * valorArray[1];
                
            }else {
                valorArray[0] = this.state.valorArray[0];
            }

            valorArray[1] = 0; 

            if (valorArray[0] % 1 != 0) {
                this.setState({ valorTela: String(valorArray[0].toFixed(3)) });
            } else {
                this.setState({ valorTela: String(valorArray[0]) });
            }

            this.setState({
                operacao: igual ? null : operacao, 
                valorArray: [...valorArray], 
                posicaoAtual: igual ? 0 : 1, 
                limpar: !igual  
            });
        }
    }

    addDigit = (numero) => {

        const limpar = this.state.valorTela == "0" || this.state.limpar; 
        const posicaoAtual = limpar ? "" : this.state.valorTela; 
        const valorTela = posicaoAtual + numero;
        this.setState({valorTela, limpar: false}); 

        if (numero !== ".") {
            const posicao = this.state.posicaoAtual; 
            const valorNovo = parseFloat(valorTela); 
            const valorArray = [...this.state.valorArray]; 
            valorArray[posicao] = valorNovo; 
            this.setState({valorArray}); 
        }
        
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.valorTela}/>
                <Button label="AC" triple click={this.clearMemory}/>
                <Button label="/" operacao click={this.setoperacao}/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" operacao click={this.setoperacao}/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" operacao click={this.setoperacao}/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" operacao click={this.setoperacao}/>
                <Button label="0" double click={this.addDigit}/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" operacao click={this.setoperacao}/>
            </div>
        );
    }
}

export default Calculator;