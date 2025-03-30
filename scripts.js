//seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

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

//captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => { 
  //previne o comportamento padrão do formulário de recarregar a página
  event.preventDefault();

  //Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    //id é gerado a partir do timestamp atual
    id: new Date().getTime(),
    //expense é o valor do input de despesa
    expense: expense.value,
    //category_id é o valor do select de categoria
    category_id: category.value,
    //category_name é o texto do select de categoria
    category_name: category.options[category.selectedIndex].text,
    //amount é o valor do input de valor
    amount: amount.value,
    created_at: new Date().toLocaleDateString('pt-BR'),
  }
}