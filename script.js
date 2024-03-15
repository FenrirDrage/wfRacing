window.onload = function() {
  // Chama a função abrirDetalhes após o carregamento completo da página
  abrirDetalhes(id);
};

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
  
  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  //const url = "http://localhost:3000/addData";
  //IP config WFR
  const url = "http://192.168.1.148:3000/addData";
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

//abre o popup
function abrirPopup() {
  document.getElementById("popup").style.display = "block";
}

//abre o popup2
function abrirPopup2() {
  document.getElementById("popup2").style.display = "block";
}

//fecha o popup
function fecharPopup() {
  document.getElementById("popup").style.display = "none";
}
//fecha o popup
function fechaddPopup() {
  document.getElementById("popup").style.display = "none";

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  //const url = "http://localhost:3000/addData";
  //IP config WFR
  const url = "http://192.168.1.148:3000/addData";
  //IP CORRIDAS
  //const url = "http://192.168.1.XYZ:3000/addData";
  // Faz uma requisição GET para obter os dados do servidor
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Atualiza a tabela com os dados recebidos
      atualizarTabela(data);
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
    location.reload();
}

//fecha o pupup
function fecharPopup2() {
  document.getElementById("popup2").style.display = "none";
}

//fecha o pupup
function fechaddPopup2() {
  document.getElementById("popup2").style.display = "none";

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  //const url = "http://localhost:3000/addData";
  //IP config WFR
  const url = "http://192.168.1.148:3000/addData";
  //IP CORRIDAS
  //const url = "http://192.168.1.XYZ:3000/addData";

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
      <td id="tdlg"><img src="images/pen.png" alt="Editar" id="editlg" onclick="abrirDetalhes('${item._id}')"></td>
      `;
    tabela.appendChild(novaLinha);
  });
}

// Função para abrir o pop-up com os detalhes da linha correspondente
function abrirDetalhes(id) {
  const data = JSON.parse(localStorage.getItem("dadosTabela")); // Obtemos os dados da localStorage
  const detalhes = data.find(item => item._id === id); // Encontramos o item com o id correspondente
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
      console.error("Um ou mais elementos do popup não foram encontrados no DOM.");
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
  //fetch("http://localhost:3000/getData")
  //IP config WFR
  fetch("http://192.168.1.148:3000/getData")
  //IP CORRIDAS
  //fetch("http://192.168.1.148:3000/getData")

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
      refreshPage();
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

// Chama a função para carregar os dados quando a página é carregada
window.onload = refreshPage;

function refreshPage() {
  carregarDados(); // Chama a função para carregar os dados ao carregar a página
}
