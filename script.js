function inputRace() {
  const rname = prompt("Qual é o nome da corrida?");
  if (rname != null) {
    document.getElementById("header").innerHTML = "Race - " + rname;
  }
}

//limpar LocalStorage
function limparLS() {
  localStorage.clear();
  console.log("localStorage foi limpo.");
}

// Recuperar informações salvas no localStorage e atualizar checkboxes
const informacoesSalvas = localStorage.getItem("informacoes");
if (informacoesSalvas) {
  const tabela = document.querySelector("tbody");
  tabela.innerHTML = informacoesSalvas;
}

// notdefinned
const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  const estado = localStorage.getItem(
    `checkbox_${checkbox.parentElement.parentElement.rowIndex}`
  );
  if (estado) {
    checkbox.dataset.estado = estado;
    checkbox.checked = estado === "1";
  }
});

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
  // Armazenar os dados no localStorage
  const newData = {
    curva: curva,
    hora: hora,
    video: video,
    report: report,
    obs: obs,
  };
  // Convertendo para JSON e armazenando no localStorage
  localStorage.setItem("novaLinhaData", JSON.stringify(newData));
  enviarJson();
  refreshPage;
}

//envio dados para servidor
function enviarJson() {
  // Recuperar os dados do localStorage
  const localStorageData = localStorage.getItem("novaLinhaData");
  console.log(localStorageData);
  // Definir o URL para onde enviar os dados
  const url = "http://localhost:3000/addData";
  //const url = "http://192.168.1.148:3000/addData";

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

//abre o popup
function abrirPopup() {
  document.getElementById("popup").style.display = "block";
}

//fecha o popup
function fecharPopup() {
  document.getElementById("popup").style.display = "none";

  // Definir o URL para onde enviar os dados
  const url = "http://localhost:3000/getData";
  //const url = "http://192.168.1.148:3000/getData";

  // Faz uma requisição GET para obter os dados do servidor
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Atualiza a tabela com os dados recebidos
      atualizarTabela(data);
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
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
      <td contenteditable="true">${item.obs}</td>
      <td id="tdlg"><img src="images/pen.png" alt="Editar" id="editlg" onclick="abrirDetalhes()"></td>
      `;

    tabela.appendChild(novaLinha);
  });
}

// Função para abrir o pop-up com os detalhes da linha correspondente
function abrirDetalhes(index) {
  const data = getDataFromLocalStorage(); // Função que você deve definir para obter os dados da linha correspondente
  const detalhes = data[index]; // Obtém os detalhes da linha com base no índice

  // Preencha o pop-up com os detalhes da linha e exiba-o
  preencherPopupComDetalhes(detalhes); // Função que você deve definir para preencher o pop-up
  abrirPopup(); // Função que já está definida para abrir o pop-up
}

function getDataFromLocalStorage() {
  const localStorageData = localStorage.getItem("novaLinhaData");
  return JSON.parse(localStorageData);
}

function preencherPopupComDetalhes(detalhes) {
  const curvaInput = document.getElementById("curvaInput");
  const horainput = document.getElementById("horainput");
  const videoCheck = document.getElementById("videoCheck");
  const reportCheck = document.getElementById("reportCheck");
  const obsInput = document.getElementById("obsInput");

  // Preencha os campos do popup com os detalhes fornecidos
  curvaInput.value = detalhes.curva;
  horainput.value = detalhes.hora;
  videoCheck.checked = detalhes.video;
  reportCheck.checked = detalhes.report;
  obsInput.value = detalhes.obs;
}

// Define a função para carregar os dados quando a página é carregada
function carregarDados() {
  // Faz uma requisição GET para obter os dados do servidor quando a página é carregada
  fetch("http://localhost:3000/getData")
    //fetch("http://192.168.1.148:3000/getData")

    .then((response) => response.json())
    .then((data) => {
      // Atualiza a tabela com os dados recebidos
      atualizarTabela(data);
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
  fetch("http://localhost:3000/dropData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message); // Mensagem retornada pelo servidor
    })
    .catch((error) => {
      console.error("Erro ao apagar dados:", error);
    });
  refreshPage();
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

// Chama a função para carregar os dados quando a página é carregada
window.onload = refreshPage;

function refreshPage() {
  carregarDados(); // Chama a função para carregar os dados ao carregar a página
}
