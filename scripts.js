//seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

//seleciona os elementos da lista(ul)
const expenseList = document.querySelector("ul")

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

  //chama a função para adicionar a despesa na lista
  expenseAdd(newExpense);
}

function expenseAdd(newExpense) {
  try{
    //Cria o elemento para adicionar o item(li) na lista(ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //cria o icone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //Cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense
    
    //Cria o nome da categoria
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona name e category em expense info
    expenseInfo.append(expenseName, expenseCategory)

    //cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    //cria o icone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src","img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    //adiciona as informações do item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    //Adiciona o item na lista
    expenseList.append(expenseItem)

  } catch (error) {
    alert('Erro ao adicionar despesa 0000');
    console.log('Erro ao adicionar despesa:', error);
  }
}