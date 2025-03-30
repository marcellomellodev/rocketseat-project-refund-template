//seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

//seleciona os elementos da lista(ul)
const expenseList = document.querySelector("ul")
const expenseTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

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

// Adiciona um novo item na lista
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

    //Atualiza os totais
    updateTotals()

  } catch (error) {
    alert('Erro ao adicionar despesa 0000');
    console.log('Erro ao adicionar despesa:', error);
  }
}

//Atualiza o valor total
function updateTotals(){
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children
    
    //Atualiza a quantidade de itens da lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"} `

    //Variável para incrementar o total
    let total = 0

    //Percorre cada item (li) da lista (ul)
    for(let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")

      //Remove caracteres não numéricos e substitui a vírgula por ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

      // converte o valor para float
      value = parseFloat(value)

      // verificar se é um número válido
      if(isNaN(value)){
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número."
        )
      }

      //Incrementar o valor total
      total += Number(value)
    }

    // Criar a span para add o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteúdo do elemento
    expenseTotal.innerHTML = ""

    // Adiciona o símbolo da moeda e o valor total formatado
    expenseTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais")
  }
}