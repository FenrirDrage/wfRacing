function inputRace() {
  const rname = prompt("Qual é o nome da corrida?");
  if (rname != null) {
    document.getElementById("header").innerHTML = rname;
  }
}

//limpar LocalStorage
function limparLS() {
  localStorage.clear();
  console.log("localStorage foi limpo.");
}

// Adicionadar função para adicionar nova linha à tabela
function adicionarLinha() {
  const tabela = document.querySelector("tbody");
  const novaLinha = document.createElement("tr");

  // Capturar os valores dos campos do pop-up
  const curva = document.getElementById("curvaInput").value;
  const hora = document.getElementById("horainput").value;
  const video = document.getElementById("videoCheck").checked;
  const report = document.getElementById("reportCheck").checked;
  const obs = document.getElementById("obsInput").value;

  // Se report for 0, definir nfa como 1
  let nfa = false;
  if (!report) {
    nfa = null;
  }

  // Armazenar os dados no localStorage
  const newData = {
    curva: curva,
    hora: hora,
    video: video,
    report: report,
    nfa: nfa,
    obs: obs,
  };
  // Convertendo para JSON e armazenando no localStorage
  localStorage.setItem("novaLinhaData", JSON.stringify(newData));
  enviarJson();
  //location.reload;
}

//envio dados para servidor
function enviarJson() {
  // Recuperar os dados do localStorage
  const localStorageData = localStorage.getItem("novaLinhaData");
  console.log(localStorageData);

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  const url = "http://localhost:3000/addData";
  //IP config WFR
  //const url = "http://192.168.1.148:3000/addData";
  //const url = "http://192.168.1.53:3000/addData";
  //IP CORRIDAS
  //const url = "http://192.168.1.XYZ:3000/addData";

  // Verificar se existem dados no localStorage
  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);
    // Enviar os dados para o servidor
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) =>
        console.error("Erro ao enviar dados para o servidor:", error)
      );
  } else {
    console.log("Nenhum dado encontrado no localStorage.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const horaInput = document.getElementById("horainput2");

  // Adiciona um evento de alteração ao campo de entrada de hora
  horaInput.addEventListener("change", function () {
    let inputValue = this.value;

    // Substitui o ponto por 0
    inputValue = inputValue.replace(/\./g, "0");

    // Remove quaisquer caracteres não numéricos do valor de entrada
    inputValue = inputValue.replace(/\D/g, "");

    // Verifica se o valor de entrada tem exatamente 6 caracteres
    if (inputValue.length === 6) {
      // Extrai as partes da hora (horas, minutos e segundos) do valor de entrada
      const hours = inputValue.substring(0, 2);
      let minutes = inputValue.substring(2, 4);
      let seconds = inputValue.substring(4, 6);

      // Converte para números inteiros
      minutes = parseInt(minutes);
      seconds = parseInt(seconds);

      // Ajusta os minutos e segundos para manterem-se dentro do intervalo de 0 a 59
      minutes = Math.min(minutes, 59);
      seconds = Math.min(seconds, 59);

      // Formata os minutos e segundos para terem dois dígitos
      minutes = minutes.toString().padStart(2, "0");
      seconds = seconds.toString().padStart(2, "0");

      // Formata o valor de entrada para o formato xx:xx:xx
      inputValue = hours + ":" + minutes + ":" + seconds;
    } else if (inputValue.length === 5) {
      // Se o valor de entrada tem 5 caracteres, assumimos que está no formato "HHMM"
      const hours = inputValue.substring(0, 2);
      let minutes = inputValue.substring(2, 3);
      let seconds = inputValue.substring(3, 5);

      // Ajusta os minutos e segundos para terem dois dígitos
      minutes = minutes.padStart(2, "0");
      seconds = seconds.padStart(2, "0");

      // Formata o valor de entrada para o formato xx:xx:xx
      inputValue = hours + ":" + minutes + ":" + seconds;
    }

    // Define o valor formatado de volta ao campo de entrada
    this.value = inputValue;
  });
});

function updateLinha() {
  // Captura os valores atualizados dos campos do pop-up
  const curva = document.getElementById("curvaInput2").value;
  const hora = document.getElementById("horainput2").value;
  const video = document.getElementById("videoCheck2").checked;
  const report = document.getElementById("reportCheck2").checked;
  const nfa = document.getElementById("nfacheck2").checked;
  const obs = document.getElementById("obsInput2").value;

  // Cria um objeto com os dados atualizados
  const updatedData = {
    curva: curva,
    hora: hora,
    video: video,
    report: report,
    nfa: nfa,
    obs: obs,
  };

  // Recupera o ID dos detalhes armazenados no localStorage
  const detalhes = JSON.parse(localStorage.getItem("detalhesPopup"));
  if (detalhes && detalhes._id) {
    // Adiciona o ID aos dados atualizados
    updatedData._id = detalhes._id;
  } else {
    console.error(
      "Erro: ID não encontrado nos detalhes armazenados no localStorage."
    );
    return; // Encerra a função se o ID não estiver disponível
  }

  // Armazena os dados atualizados no localStorage
  localStorage.setItem("novaLinhaData", JSON.stringify(updatedData));

  // Oculta o formulário de edição
  document.getElementById("popup").style.display = "none";

  envUpJson();
}

function envUpJson() {
  // Obtém os dados atualizados do localStorage
  const updatedDataString = localStorage.getItem("novaLinhaData");
  console.log(updatedDataString);
  // Verifica se há dados no localStorage
  if (updatedDataString) {
    const updatedData = JSON.parse(updatedDataString);
    console.log(updatedData);

    // Define o ID do documento a ser atualizado (obtido do localStorage)
    const id = updatedData._id;
    console.log(id);
    // Definir o IP/URL para onde enviar os dados
    //Ip casa
    const url = `http://localhost:3000/updateData/${id}`;
    //IP config WFR
    //const url = `http://192.168.1.148:3000/updateData/${id}`;
    //const url = `http://192.168.1.53:3000/updateData/${id}`;
    //IP CORRIDAS
    //const url = "http://192.168.1.XYZ:3000/updateData/";
    console.log(url);
    // Envia os dados atualizados para o servidor
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados atualizados com sucesso:", data);

        // Limpa os dados do localStorage após a atualização
        localStorage.removeItem("novaLinhaData");
      })
      .catch((error) => {
        console.error(
          "Erro ao enviar dados atualizados para o servidor:",
          error
        );
      });
  } else {
    console.error("Nenhum dado encontrado no localStorage para enviar.");
  }
}

//abre o popup
function abrirPopup() {
  document.getElementById("popup").style.display = "block";
  popupAberto = true;
}

//abre o popup2
function abrirPopup2() {
  document.getElementById("popup2").style.display = "block";
  popup2Aberto = true;
}

// Abre popup numpad
function abrirPopupNumpad() {
  document.getElementById("popupNumpad").style.display = "block";
  popupNumpadAberto = true;
}
// Abrir popup password
function abrirPopupNumpadPassword() {
  document.getElementById("numpad-password").style.display = "block";
  popupNumpadPasswordAberto = true;
}

//fecha o popup
function fecharPopup() {
  document.getElementById("popup").style.display = "none";
  popupAberto = false;
  //location.reload();
}

//fecha o pupup2
function fecharPopup2() {
  document.getElementById("popup2").style.display = "none";

  popup2Aberto = false;
  //location.reload();
}
// Fecha o popup Numpad
function fecharPopupNumpad() {
  document.getElementById("popupNumpad").style.display = "none";

  popupNumpadAberto = false;
}
// Fechar popup password
function fecharPopupNumpadPassword() {
  document.getElementById("numpad-password").style.display = "none";
  popupNumpadPasswordAberto = false;
}

// Atualiza a tabela com os dados recebidos
function atualizarTabela(data) {
  const tabela = document.getElementById("tabela");

  // Limpa apenas as linhas de dados da tabela, mantendo o cabeçalho
  while (tabela.rows.length > 1) {
    tabela.deleteRow(1);
  }

  // Adiciona linhas à tabela com os dados recebidos
  data.forEach((item) => {
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
      <td contenteditable="true">${item.curva}</td>
      <td contenteditable="true">${item.hora}</td>
      <td contenteditable="true"><input type="checkbox" ${
        item.video ? "checked" : ""
      } disabled></td>
      <td contenteditable="true"><input type="checkbox" ${
        item.report ? "checked" : ""
      } disabled></td>
      <td contenteditable="true"><input type="checkbox" ${
        item.nfa ? "checked" : ""
      } disabled></td>
      <td contenteditable="true">${item.obs}</td>
      <td id="tdlg"><img src="images/pen.png" alt="Editar" id="editlg" onclick="abrirDetalhes('${
        item._id
      }')"></td>
      `;

    // Adiciona classes CSS com base nos valores de report e nfa
    if (item.report) {
      novaLinha.classList.add("report-true");
    }
    if (item.nfa) {
      novaLinha.classList.add("nfa-true");
    }

    tabela.appendChild(novaLinha);
  });
}

// Função para abrir o pop-up com os detalhes da linha correspondente
function abrirDetalhes(id) {
  const data = JSON.parse(localStorage.getItem("dadosTabela")); // Obtemos os dados da localStorage
  const detalhes = data.find((item) => item._id === id); // Encontramos o item com o id correspondente
  if (detalhes) {
    // Se encontrarmos os detalhes, preenchemos o pop-up e o exibimos
    preencherPopupComDetalhes(detalhes);
    abrirPopup2();
  } else {
    console.error("Detalhes não encontrados para o ID:", id);
  }
}

function getDataFromLocalStorage() {
  const localStorageData = localStorage.getItem("novaLinhaData");
  return JSON.parse(localStorageData);
}

function preencherPopupComDetalhes(detalhes) {
  // Armazena os detalhes no localStorage
  localStorage.setItem("detalhesPopup", JSON.stringify(detalhes));

  // Verifica se os detalhes são válidos
  if (detalhes) {
    // Obtém os elementos do popup
    const curvaInput = document.getElementById("curvaInput2");
    const horainput = document.getElementById("horainput2");
    const videoCheck = document.getElementById("videoCheck2");
    const reportCheck = document.getElementById("reportCheck2");
    const obsInput = document.getElementById("obsInput2");

    // Verifica se os elementos existem no DOM
    if (curvaInput && horainput && videoCheck && reportCheck && obsInput) {
      // Atribui os valores dos detalhes aos campos do popup
      curvaInput.value = detalhes.curva || "";
      horainput.value = detalhes.hora || "";
      videoCheck.checked = detalhes.video || false;
      reportCheck.checked = detalhes.report || false;
      obsInput.value = detalhes.obs || "";
    } else {
      console.error(
        "Um ou mais elementos do popup não foram encontrados no DOM."
      );
    }
  } else {
    console.error("Detalhes inválidos.");
  }
}

// Define a função para carregar os dados quando a página é carregada
function carregarDados() {
  // Faz uma requisição GET para obter os dados do servidor quando a página é carregada

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  const url = "http://localhost:3000/getData";
  //IP config WFR
  //const url = "http://192.168.1.53:3000/getData";
  //IP CORRIDAS
  //const url = "http://192.168.1.XYZ:3000/getData";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Atualiza a tabela com os dados recebidos
      atualizarTabela(data);
      // Armazena os dados localmente para uso posterior
      localStorage.setItem("dadosTabela", JSON.stringify(data));
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
}

// Adicionadar o evento de editar a hora
function editarHora() {
  const celulaHora = event.target;
  celulaHora.setAttribute("contenteditable", "true");
  celulaHora.style.color = "#";
  celulaHora.classList.remove("hora-editavel");
}

// Adicionar a função para atualizar a hora atual em uma linha
function atualizarHoraAtual(linha) {
  const celulaHora = linha.querySelector(".hora-editavel");
  celulaHora.innerText = obterHoraAtual();
}

// Adicionar a função para obter a hora atual formatada
function obterHoraAtual() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, "0");
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const segundos = agora.getSeconds().toString().padStart(2, "0");
  const hour = `${horas}:${minutos}:${segundos}`;
  document.getElementById("horainput").value = hour;
}

//Red Flag e Start
function obterStartOrRF(valor) {
  document.getElementById("curvaInput").value = document.getElementById(
    `race${valor}`
  ).value;
  console.log(numpadLinhas);
  //adicionarLinha();
}

// Preencher informação com a curva quando utilizar Numpad
function obterCurvaNum(curva) {
  document.getElementById("curvaInput").value = document.getElementById(
    `curva${curva}`
  ).value;
  //adicionarLinha();
}
//Adicionar Camera ou Post no field Curva/Post
function adicionarCameraOrPost(opcao) {
  document.getElementById("curvaInput").value += document.getElementById(
    `opcao${opcao}`
  ).value;
}
//Verificar password dar input de curvas
function checkPassword() {
  numpadPassword = "WFR2012";
  console.log(document.getElementById("numpadUnlock").value);
  if (document.getElementById("numpadUnlock").value == numpadPassword) {
    generateNumpad();
    fecharPopupNumpadPassword();
  } else {
    window.alert("Código introduzido errado!");
    fecharPopupNumpadPassword();
  }
}

// Adicionar a função para parar a contagem de hora
function pararContagemHora(elementoCurva) {
  const linha = elementoCurva.parentNode;
  const celulaHora = linha.querySelector(".hora-editavel");
  celulaHora.classList.remove("hora-editavel");
}

// Adicionar a função para enviar o número de linhas ao servidor
function enviarNumeroDeLinhas(numeroLinhas) {
  socket.emit("numeroLinhas", { type: "numeroLinhas", data: numeroLinhas });
}

// Adicionada a função para limpar a tabela
function limparTabela() {
  // Mensagem de confirmação
  if (!confirm("Tem certeza de que deseja apagar a tabela?")) {
    return; // Se o usuário cancelar, sair da função
    //location.reload;
  }

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  const url = "http://localhost:3000/dropData";
  //IP config WFR
  //const url = "http://192.168.1.53:3000/dropData";
  //IP CORRIDAS
  //const url = "http://192.168.1.XYZ:3000/dropData";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //location.reload;
      console.log(data.message); // Mensagem retornada pelo servidor
    })
    .catch((error) => {
      console.error("Erro ao apagar dados:", error);
    });
}

// Adicionada a função para atualizar o estado do checkbox no localStorage
function atualizarEstadoCheckbox(checkbox) {
  const estadoAtual = checkbox.dataset.estado;
  checkbox.dataset.estado = estadoAtual === "0" ? "1" : "0";
  localStorage.setItem(
    `checkbox_${checkbox.parentElement.parentElement.rowIndex}`,
    checkbox.dataset.estado
  );
}

// Certifique-se de que a função carregarDados() é chamada após o carregamento da página
document.addEventListener("DOMContentLoaded", function () {
  carregarDados();
});

// Adicionar tratamento de erros para requisições fetch
function refreshPage() {
  carregarDados(); // Chama a função para carregar os dados ao carregar a página
}

let popupAberto = false;
let popup2Aberto = false;
let popupNumpadAbero = false;
let popupNumpadPasswordAberto = false;

function atualizarPagina() {
  if (!popupAberto && !popup2Aberto) {
    // Lógica para atualizar a página
    //location.reload();
  }
}

// Função para carregar o mesmo número introduzido no numpad(quando é feito reload)
function carregarNumpad() {
  console.log(localStorage.getItem("numCurves"));
  document.getElementById("numberCurvas").value =
    localStorage.getItem("numCurves");
  generateNumpad();
  generateNumpad2();
}

// Chamar a função atualizarPagina a cada 5 segundos
//setInterval(atualizarPagina, 10000);

// Função para rolar até o final da página (última linha da tabela) com um pequeno atraso
function scrollToBottomWithDelay() {
  setTimeout(function () {
    var table = document.getElementById("tabela"); // ID da sua tabela
    if (table) {
      var lastRow = table.rows[table.rows.length - 1];
      if (lastRow) {
        lastRow.scrollIntoView();
      }
    }
  }, 100); // Ajuste o valor do atraso conforme necessário
}

// Chamar a função para rolar até o final da página quando a página for carregada
window.addEventListener("load", function () {
  scrollToBottomWithDelay();
});

function updateClock() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");
  var timeString = hours + ":" + minutes + ":" + seconds;

  var clockElement = document.getElementById("clock");
  if (clockElement) {
    clockElement.textContent = timeString;
  }

  // Obter a data atual e formatá-la
  var options = { day: "numeric", month: "short", year: "numeric" };
  var dateString = now.toLocaleDateString("en-UK", options);

  // Exibir a data abaixo do relógio
  var dateElement = document.getElementById("date");
  if (dateElement) {
    dateElement.textContent = dateString;
  }
}

// Atualizar o relógio a cada segundo
setInterval(updateClock, 1000);

// Chamar a função updateClock() para exibir a hora atual quando a página for carregada
window.addEventListener("load", updateClock);

// Gerar Número de curvas no numpad

let generatedNumber = 0;
let numpadLinhas;

function generateNumpad() {
  //Se já existir um numpad gerado, não acrescenta mais um
  if (document.getElementById("numpad-table") == null) {
    const num = document.getElementById("numberCurvas").value;
    generatedNumber = num;
    const numpadDiv = document.getElementById("numpad");
    const numpadTable = document.createElement("table");
    numpadTable.id = "numpad-table";
    let numpadRow = document.createElement("tr");
    numpadRow.classList.add("numpad-row");
    numpadTable.appendChild(numpadRow);
    numpadDiv.appendChild(numpadTable);
    // De acordo com o numero recebido gera 2 buttoes por linha
    for (let i = 1; i <= num; i++) {
      const numpadCell = document.createElement("td");
      numpadCell.classList.add("numpad-cell");
      const numpadButton = document.createElement("button");
      numpadButton.classList.add("numpad-Button");
      numpadButton.textContent = i;
      numpadButton.id = `curva${i}`;
      numpadButton.onclick = function () {
        abrirPopupNumpad();
        abrirPopup();
        obterHoraAtual();
        obterCurvaNum(i);
      };
      numpadButton.value = i;
      numpadCell.appendChild(numpadButton);
      numpadRow.appendChild(numpadCell);
      //A cada 2 celulas, fecha e abro uma linha nova
      if (i % 2 == 0 && i != num) {
        numpadRow = document.createElement("tr");
        numpadRow.classList.add("numpad-row");
        numpadTable.appendChild(numpadRow);
      }
    }
    //Esconder o botão e textbox.
    editarNumpad();
    //Guardar ultimo numero de curvas guardado
    localStorage.setItem("numCurves", num);
  } else {
    //Caso já exista uma, remover e adicionar novo input
    const num = document.getElementById("numberCurvas").value;
    generatedNumber = num;
    const numpadTable = document.getElementById("numpad-table");
    numpadTable.innerHTML = "";
    let numpadRow = document.createElement("tr");
    numpadRow.classList.add("numpad-row");
    numpadTable.appendChild(numpadRow);
    // De acordo com o numero recebido gera 2 buttoes por linha
    for (let i = 1; i <= num; i++) {
      const numpadCell = document.createElement("td");
      numpadCell.classList.add("numpad-cell");
      const numpadButton = document.createElement("button");
      numpadButton.classList.add("numpad-Button");
      numpadButton.textContent = i;
      numpadButton.id = `curva${i}`;
      numpadButton.onclick = function () {
        abrirPopupNumpad();
        abrirPopup();
        obterHoraAtual();
        obterCurvaNum(i);
      };
      numpadButton.value = i;
      numpadCell.appendChild(numpadButton);
      numpadRow.appendChild(numpadCell);
      //A cada 2 celulas, fecha e abro uma linha nova
      if (i % 2 == 0 && i != num) {
        numpadRow = document.createElement("tr");
        numpadRow.classList.add("numpad-row");
        numpadTable.appendChild(numpadRow);
      }
    }
    localStorage.setItem("numCurves", num);
    editarNumpad();
  }
}

function editarNumpad() {
  const numpadButton = document.getElementById("botao-numpad-editar");
  const numpadTextBox = document.getElementById("numberCurvas");
  const numpadGenerateButton = document.getElementById("botao-numpad");
  numpadButton.classList.toggle("hidden");
  numpadTextBox.classList.toggle("hidden");
  numpadGenerateButton.classList.toggle("hidden");
}

/*--------------------------------------------------Extra Numpad(numpad.html)-----------------------------------------*/

function generateNumpad2() {
  //Se já existir um numpad gerado, não acrescenta mais um
  if (document.getElementById("numpad-table2") == null) {
    const num = document.getElementById("numberCurvas").value;
    generatedNumber = num;
    const numpadDiv = document.getElementById("numpad2");
    const numpadTable = document.createElement("table");
    numpadTable.id = "numpad-table2";
    let numpadRow = document.createElement("tr");
    numpadRow.classList.add("numpad-row");
    numpadTable.appendChild(numpadRow);
    numpadDiv.appendChild(numpadTable);
    // De acordo com o numero recebido gera 2 buttoes por linha
    for (let i = 1; i <= num; i++) {
      const numpadCell = document.createElement("td");
      numpadCell.classList.add("numpad-cell");
      const numpadButton = document.createElement("button");
      numpadButton.classList.add("numpad-Button");
      numpadButton.textContent = i;
      numpadButton.id = `curva${i}`;
      numpadButton.onclick = function () {
        abrirPopupNumpad();
        abrirPopup();
        obterHoraAtual();
        obterCurvaNum(i);
      };
      numpadButton.value = i;
      numpadCell.appendChild(numpadButton);
      numpadRow.appendChild(numpadCell);
      //A cada 2 celulas, fecha e abro uma linha nova
      if (i % 2 == 0 && i != num) {
        numpadRow = document.createElement("tr");
        numpadRow.classList.add("numpad-row");
        numpadTable.appendChild(numpadRow);
      }
    }
    //Esconder o botão e textbox.
    editarNumpad();
    editarNumpad2();
    //Guardar ultimo numero de curvas guardado
    localStorage.setItem("numCurves", num);
  } else {
    //Caso já exista uma, remover e adicionar novo input
    const num = document.getElementById("numberCurvas").value;
    generatedNumber = num;
    const numpadTable = document.getElementById("numpad-table2");
    numpadTable.innerHTML = "";
    let numpadRow = document.createElement("tr");
    numpadRow.classList.add("numpad-row");
    numpadTable.appendChild(numpadRow);
    // De acordo com o numero recebido gera 2 buttoes por linha
    for (let i = 1; i <= num; i++) {
      const numpadCell = document.createElement("td");
      numpadCell.classList.add("numpad-cell");
      const numpadButton = document.createElement("button");
      numpadButton.classList.add("numpad-Button");
      numpadButton.textContent = i;
      numpadButton.id = `curva${i}`;
      numpadButton.onclick = function () {
        abrirPopupNumpad();
        abrirPopup();
        obterHoraAtual();
        obterCurvaNum(i);
      };
      numpadButton.value = i;
      numpadCell.appendChild(numpadButton);
      numpadRow.appendChild(numpadCell);
      //A cada 2 celulas, fecha e abro uma linha nova
      if (i % 2 == 0 && i != num) {
        numpadRow = document.createElement("tr");
        numpadRow.classList.add("numpad-row");
        numpadTable.appendChild(numpadRow);
      }
    }
    localStorage.setItem("numCurves", num);
    editarNumpad();
    editarNumpad2();
  }
}

function editarNumpad2() {
  const numpadButton = document.getElementById("botao-numpad-editar");
  const numpadTextBox = document.getElementById("numberCurvas");
  const numpadGenerateButton = document.getElementById("botao-numpad");
  numpadButton.classList.toggle("hidden");
  numpadTextBox.classList.toggle("hidden");
  numpadGenerateButton.classList.toggle("hidden");
}

function checkPassword2() {
  numpadPassword = "WFR2012";
  console.log(document.getElementById("numpadUnlock2").value);
  if (document.getElementById("numpadUnlock2").value == numpadPassword) {
    generateNumpad2();
    fecharPopupNumpadPassword();
  } else {
    window.alert("Código introduzido errado!");
    fecharPopupNumpadPassword();
  }
}

function carregarNumpad2() {
  console.log(localStorage.getItem("numCurves"));
  document.getElementById("numberCurvas").value =
    localStorage.getItem("numCurves");
  generateNumpad2();
}

//Atalhos para o numpad (no numpad físico) até 9
document.addEventListener("keydown", function (e) {
  //Vai buscar o numero currente de curvas definido
  numpadNumbers = localStorage.getItem("numCurves");
  botaoEditar = document.getElementById("botao-numpad-editar");

  // Caso nenhum dos popus estejam abertos
  if (
    popupAberto == false &&
    popup2Aberto == false &&
    popupNumpadAbero == false &&
    popupNumpadPasswordAberto == false &&
    botaoEditar.classList.contains("hidden") == false
  ) {
    for (let i = 1; i <= numpadNumbers; i++) {
      if (e.key === `${i}`) {
        abrirPopupNumpad();
        abrirPopup();
        obterHoraAtual();
        obterCurvaNum(i);
      }
    }
  }

  if (e.key === "Escape") {
    fecharPopup();
    fecharPopup2();
    fecharPopupNumpad();
    fecharPopupNumpadPassword();
  }
});

// Função para determinar qual ação executar com base no popup aberto
function handleEnterKey(e) {
  if (e.key === "Enter") {
    // Verifica se o popup regular está aberto
    if (popupAberto) {
      adicionarLinha();
      fecharPopup();
    }
    // Verifica se o popup2 está aberto
    else if (popup2Aberto) {
      updateLinha();
      fecharPopup2();
    }
    // Adicione mais verificações para outros popups, se necessário
    else {
      console.error("Erro: Nenhum popup aberto.");
    }
  }
}

// Adicione um ouvinte de evento de teclado ao documento
document.addEventListener("keydown", handleEnterKey);
