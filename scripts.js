//seleciona os elementos do formulário
const amount = document.getElementById('amount');

//captura o evento de input para formatar o valor
amount.oninput= () => {
  //obtem o valor atual do input e remove os caracteres não numéricos
 let value = amount.value.replace(/\D/g, '');

 //transforma o valor em centavos
  value = Number(value) / 100;

 //Atualiza o valor do input
 amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
  // Converte para número e formata como moeda
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  //retorna o valor formatado
  return value;
}
