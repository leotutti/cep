// Recuperando o formulário + o campo de CEP + o botão de CEP
const cepInput = document.querySelector("#cep");
const buscarCepBtn = document.querySelector("#buscarCep");
const form = document.querySelector("#enderecoForm");

// Função para impedir letras no CEP

function limparCep (valor){
    return valor.replace(/\D/g, '');
}

// Montando a função que chama a API e retorna os dados do CEP
async function buscarCep(){

    document.querySelector('#complemento').value = '';
    document.querySelector('#numero').value = '';
    const cep = limparCep(cepInput.value);

    // verificando se o cep tem 08 dígitos
    if(cep.length === 8){
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro){
                document.querySelector('#logradouro').value = data.logradouro;
                document.querySelector('#bairro').value = data.bairro;
                document.querySelector('#cidade').value = data.localidade;
                document.querySelector('#estado').value = data.uf;

                // colocando o cursor no campo para digitar o número
                document.querySelector('#numero').focus();
            } else {
                alert('CEP não encontrado!');
                cepInput.focus();
            }
        } catch (error) {
            alert('Erro ao buscar o CEP: ', error);
        }
    } else {
        alert('Digite um CEP com 08 números!');
        cepInput.focus();
    }
}

// Chamar a busca do cep, quando clicar no botão

buscarCepBtn.addEventListener('click', buscarCep);


// máscara automática e permissão de apenas números

cepInput.addEventListener('input', (e) => {
  let valorDigitado = limparCep(e.target.value);
  if (valorDigitado.length > 5){
    valorDigitado = valorDigitado.slice(0, 5) + '-' + valorDigitado.slice(5, 8)
  }
  e.target.value = valorDigitado;
})