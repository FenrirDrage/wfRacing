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


document.addEventListener("DOMContentLoaded", function () {
  
  // é necessário um pequeno delay para a local storage atualizar devidamente
  setTimeout(() => {
  const dadosExistentes = localStorage.getItem('dadosTabela')
  const data = JSON.parse(dadosExistentes)
  //filtrarPorStart();
  let indiceMaximo = 1;
  if(data!=null){
    data.forEach((item) =>{
      indiceMaximo++;
    })
  }
  console.log(indiceMaximo);
    localStorage.setItem('indiceCorrente',indiceMaximo);
  }, 1000); // 1 second delay
  
})

// Ir buscar dados numpad a database

function carregarDadosNumpad(){
  // Faz uma requisição GET para obter os dados do servidor quando a página é carregada

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  const url = "http://192.168.1.136:3000/getDataNumpad";
  //IP casa Luís
  //const url = "http://192.168.1.136:3000/getData";
  //IP config WFR
  //const url = "http://192.168.1.136:3000/getData";
  //IP CORRIDAS
  //const url = "http://192.168.1.53:3000/getData";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Atualiza a tabela com os dados recebidos
      atualizarTabela(data);
      // Armazena os dados localmente para uso posterior
      localStorage.setItem("numpadNum", JSON.stringify(data));
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
}



// Adicionar numero ao numpad

function adicionarNumpadNum(){
  // Eliminar o anterior
  eliminarNumpadNum()
  const numpadNumber = document.getElementById("numberCurvas").value;
  /* if(numpadNumber==null){
    numpadNumber = localStorage.getItem('numCurves')
  } */
  const newNum={
    numberButtons:numpadNumber,
  }
  localStorage.setItem("novoNumpadNum", JSON.stringify(newNum));
  enviarJsonNumpad();
}

function enviarJsonNumpad() {
  // Recuperar os dados do localStorage
  const localStorageData = localStorage.getItem("novoNumpadNum");
  console.log(localStorageData);

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  const url = "http://192.168.1.136:3000/addDataNumpad";
  //IP config casa Luís
  //const url ="http:// 192.168.1.136:3000/addData";
  //IP config WFR
  //const url = "http://192.168.1.148:3000/addData";
  //const url = "http://192.168.1.136:3000/addData";
  //IP CORRIDAS
  //const url = "http://192.168.1.53:3000/addData";

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

// Dar reset ao numero de numpad
function eliminarNumpadNum() {

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  const url = "http://192.168.1.136:3000/dropDataNumpad";
  //IP casa Luís
  //const url = "http://192.168.1.136/dropData";
  //IP config WFR
  //const url = "http://192.168.1.136:3000/dropData";
  //IP CORRIDAS
  //const url = "http://192.168.1.53:3000/dropData";

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

// Adicionadar função para adicionar nova linha à tabela
function adicionarLinha() {
  const tabela = document.querySelector("tbody");
  const novaLinha = document.createElement("tr");
  // Capturar os valores dos campos do pop-up
  const camera = document.getElementById("cameraNumber").value;
  const curva = document.getElementById("curvaInput").value;
  const hora = document.getElementById("horainput").value;
  const video = document.getElementById("videoCheck").checked;
  const report = document.getElementById("reportCheck").checked;
  const priority = document.getElementById("priorityCheck").checked;
  const obs = document.getElementById("obsInput").value;

  // Se report for 0, definir nfa como 1
  let nfa = false;
  if (!report) {
    nfa = null;
  }

  // Armazenar os dados no localStorage
  const newData = {
    camera: camera,
    curva: curva,
    hora: hora,
    video: video,
    report: report,
    nfa: nfa,
    priority: priority,
    obs: obs,
  };
console.log(newData)

  // Convertendo para JSON e armazenando no localStorage
  localStorage.setItem("novaLinhaData", JSON.stringify(newData));
  enviarJson();
  location.reload();
}


//envio dados para servidor
function enviarJson() {
  // Recuperar os dados do localStorage
  const localStorageData = localStorage.getItem("novaLinhaData");
  console.log(localStorageData);

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  const url = "http://192.168.1.136:3000/addData";
  //IP config casa Luís
  //const url ="http:// 192.168.1.136:3000/addData";
  //IP config WFR
  //const url = "http://192.168.1.148:3000/addData";
  //const url = "http://192.168.1.136:3000/addData";
  //IP CORRIDAS
  //const url = "http://192.168.1.53:3000/addData";

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
  const reportCheckbox = document.getElementById("reportCheck2");
  const nfaCheckbox = document.getElementById("nfacheck2");

  reportCheckbox.addEventListener("click", function () {
    if (this.checked && nfaCheckbox.checked) {
      /*alert(
        "Erro: Não é possível selecionar 'Report' e 'NFA' simultaneamente."
      );*/
      nfaCheckbox.checked = false; // Desmarca o checkbox "NFA"
    }
  });

  nfaCheckbox.addEventListener("click", function () {
    if (this.checked && reportCheckbox.checked) {
      /*alert(
        "Erro: Não é possível selecionar 'NFA' e 'Report' simultaneamente."
      );*/
      reportCheckbox.checked = false; // Desmarca o checkbox "Report"
    }
  });
});

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


// Detalhe da turn

let detalheCurva="NaN";


function updateLinha() {
  // Captura os valores atualizados dos campos do pop-up
  const camera = document.getElementById("cameraNumber2").value;
  let curva = document.getElementById("curvaInput2").value;
  const hora = document.getElementById("horainput2").value;
  const video = document.getElementById("videoCheck2").checked;
  const report = document.getElementById("reportCheck2").checked;
  const priority = document.getElementById("priorityCheck2").checked;
  const nfa = document.getElementById("nfacheck2").checked;
  const obs = document.getElementById("obsInput2").value;
  console.log(curva)
  console.log(detalheCurva);
  // Caso tenham sido Post ou Turn anteriormente
  if(!curva.includes('P') && !curva.includes('Turn')){
    if(detalheCurva=='P' || detalheCurva=='Turn'){
      curva += detalheCurva;
    }
  }

  // Cria um objeto com os dados atualizados
  const updatedData = {
    camera: camera,
    curva: curva,
    hora: hora,
    video: video,
    report: report,
    nfa: nfa,
    priority: priority,
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
    const url = `http://192.168.1.136:3000/updateData/${id}`;
    //IP casa Luís
    //const url = `http://192.168.1.136/updateData/${id}`;
    //IP config WFR
    //const url = `http://192.168.1.148:3000/updateData/${id}`;
    //const url = `http://192.168.1.136:3000/updateData/${id}`;
    //IP CORRIDAS
    //const url = "http://192.168.1.53:3000/updateData/";
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
        location.reload();
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

function deleteLinha() {
  // Recupera o ID dos detalhes armazenados no localStorage
  const detalhes = JSON.parse(localStorage.getItem("detalhesPopup"));
  console.log(detalhes._id)
  // Verifica se o ID está disponível nos detalhes
  if (detalhes && detalhes._id) {
    // Faz uma solicitação DELETE para excluir a linha com o ID especificado
    fetch(`http://192.168.1.136:3000/dropData/${detalhes._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Linha excluída com sucesso.");
          // Se a linha foi excluída com sucesso, você pode tomar alguma ação adicional aqui, como recarregar a página ou atualizar a tabela
        } else {
          console.error("Erro ao excluir linha:", response.status);
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir linha:", error);
      });
  } else {
    console.error(
      "Erro: ID não encontrado nos detalhes armazenados no localStorage."
    );
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
// Fechar popup rodaDentada
function abrirPopupRodaDentada() {
  document.getElementById("popupRodadentada").style.display = "block";
  popupRodaDentada = true;
}

// Fechar popup rodaDentada
function abrirPopupConfiguracoes() {
  document.getElementById("popupConfiguracoes").style.display = "block";
  popupConfiguracoes = true;
}

// Fechar popup filtros
function abrirPopupFiltros() {
  document.getElementById("popupFiltros").style.display = "block";
  popupFiltros = true;
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
  const popupEdit = document.getElementById("popupEdit")
  const botaoUp = document.getElementById("buttonUp")
  const botaoDown = document.getElementById("buttonDown")
  popupEdit.removeChild(botaoUp)
  popupEdit.removeChild(botaoDown)

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

// Fechar popup rodaDentada
function fecharPopupRodaDentada() {
  document.getElementById("popupRodadentada").style.display = "none";
  popupRodaDentada = false;
}

// Fechar popup Configuracoes
function fecharPopupConfiguracoes() {
  document.getElementById("popupConfiguracoes").style.display = "none";
  popupRodaDentada = false;
}

// Fechar popup Filtros
function fecharPopupFiltros() {
  document.getElementById("popupFiltros").style.display = "none";
  popupFiltros = false;
}

// Atualiza a tabela com os dados recebidos
function atualizarTabela(data) {
  const tabela = document.getElementById("tabela");

  // Limpa apenas as linhas de dados da tabela, mantendo o cabeçalho
  while (tabela.rows.length > 1) {
    tabela.deleteRow(1);
  }

  // Adiciona linhas à tabela com os dados recebidos
  var counter=1;
  data.forEach((item) => {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td class="hidden">${item._id}</td>
      <td contenteditable="false">${item.camera}</td>
      <td contenteditable="false">${item.curva}</td>
      <td contenteditable="false">${item.hora}</td>
      <td contenteditable="false"><input type="checkbox" ${
        item.video ? "checked" : ""
      } disabled></td>
      <td contenteditable="false"><input type="checkbox" ${
        item.report ? "checked" : ""
      } disabled></td>
      <td contenteditable="false"><input type="checkbox" ${
        item.nfa ? "checked" : ""
      } disabled></td>
      <td contenteditable="false">${item.obs}</td>
      <td id="tdlg"><img src="images/pen.png" alt="Editar" id="editlg" onclick="abrirDetalhes('${
        item._id
      }')"></td>
      <td id="positionButton" class="hidden"><button class="buttaoUpDown" id="buttonUp${item._id}" onclick="moveUp(this)">↑</button><button class="buttaoUpDown"  id="buttonDown${item._id}" onclick="moveDown(this)">↓</button>
      `;

    // Adiciona classes CSS com base nos valores de report e nfa
    if (item.report) {
      novaLinha.classList.add("report-true");
    }
    if (item.nfa) {
      novaLinha.classList.add("nfa-true");
    }
    if (item.priority) {
      novaLinha.classList.add("priority-set");
    }
    if (item.curva == "Start") {
      novaLinha.classList.add("post-start");
    }
    if (item.curva == "Slow Flag") {
      novaLinha.classList.add("post-slow");
    }
    if (item.curva == "Red Flag") {
      novaLinha.classList.add("post-redflag");
    }

    counter++;
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
    generatePositionButtons(detalhes);
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
    const cameraInput = document.getElementById("cameraNumber2");
    const curvaInput = document.getElementById("curvaInput2");
    const horainput = document.getElementById("horainput2");
    const videoCheck = document.getElementById("videoCheck2");
    const reportCheck = document.getElementById("reportCheck2");
    const priorityCheck = document.getElementById("priorityCheck2");
    const obsInput = document.getElementById("obsInput2");
    const nfaCheck = document.getElementById("nfacheck2");
    

    // Verifica se os elementos existem no DOM
    if (curvaInput && horainput && videoCheck && reportCheck && nfaCheck && obsInput && cameraInput && priorityCheck) {
      // Atribui os valores dos detalhes aos campos do popup
      cameraInput.value = detalhes.camera || "";
      curvaInput.value = detalhes.curva || "";
      horainput.value = detalhes.hora || "";
      videoCheck.checked = detalhes.video || false;
      nfaCheck.checked = detalhes.nfa || false;
      reportCheck.checked = detalhes.report || false;
      priorityCheck.checked = detalhes.priority || false;
      obsInput.value = detalhes.obs || "";

      //Guardar o input da curva anterior Turn ou Post
      if(curvaInput.value.includes("P")){
        detalheCurva = "P"
      }else if (curvaInput.value.includes("Turn")){
        detalheCurva = "Turn"
      }
      console.log(detalheCurva);
    } else {
      console.error(
        "Um ou mais elementos do popup não foram encontrados no DOM."
      );
    }
  } else {
    console.error("Detalhes inválidos.");
  }
}

// Função para criar os botões de troca de posição da linha selecionada
function generatePositionButtons(detalhes){
  const popupEdit = document.getElementById('popupEdit');
  const originalUp = document.getElementById(`buttonUp${detalhes._id}`)
  const originalDown = document.getElementById(`buttonDown${detalhes._id}`)
  const buttonUp = document.createElement("button");
  buttonUp.classList.add("buttaoUpDown");
  buttonUp.textContent = "↑";
  buttonUp.id = `buttonUp`;
  buttonUp.addEventListener('click',()=> {
    originalUp.click();
  })

  const buttonDown = document.createElement("button")
  buttonDown.classList.add("buttaoUpDown");
  buttonDown.textContent = "↓";
  buttonDown.id = `buttonDown`;
  buttonDown.addEventListener('click',()=> {
    originalDown.click();
  })

  popupEdit.appendChild(buttonUp)
  popupEdit.appendChild(buttonDown)
}

// Define a função para carregar os dados quando a página é carregada
function carregarDados() {
  // Faz uma requisição GET para obter os dados do servidor quando a página é carregada

  // Definir o IP/URL para onde enviar os dados
  //IP config casa
  const url = "http://192.168.1.136:3000/getData";
  //IP casa Luís
  //const url = "http://192.168.1.136:3000/getData";
  //IP config WFR
  //const url = "http://192.168.1.136:3000/getData";
  //IP CORRIDAS
  //const url = "http://192.168.1.53:3000/getData";

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

//Quando a página acaba de carregar verifica o indice máximo corrente



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
}

// Preencher informação com a curva quando utilizar Numpad
function obterCurvaNum(curva) {
  document.getElementById("curvaInput").value = document.getElementById(
    `curva${curva}`
  ).value;
}

//Adicionar Camera ou Post no field Curva/Post
function adicionarCameraOrPost(opcao) {
  if(opcao!='Camera'){
    document.getElementById("cameraNumber").value = ""
    document.getElementById("curvaInput").value += document.getElementById(
      `opcao${opcao}`
    ).value;
  }else{
    document.getElementById("cameraNumber").value = document.getElementById("curvaInput").value;
    document.getElementById("curvaInput").value = ""

  }
 

}

//Verificar password dar input de curvas
function checkPassword() {
  numpadPassword = "WFR2012";
  console.log(document.getElementById("numpadUnlock").value);
  if (document.getElementById("numpadUnlock").value == numpadPassword) {
    adicionarNumpadNum();
    generateNumpad();
    fecharPopupNumpadPassword();
    fecharPopupRodaDentada()
  } else {
    window.alert("Código introduzido errado!");
    fecharPopupNumpadPassword();
    fecharPopupRodaDentada()
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
  const url = "http://192.168.1.136:3000/dropData";
  //IP casa Luís
  //const url = "http://192.168.1.136/dropData";
  //IP config WFR
  //const url = "http://192.168.1.136:3000/dropData";
  //IP CORRIDAS
  //const url = "http://192.168.1.53:3000/dropData";

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
  carregarDadosNumpad();
  carregarDados();
});

// Adicionar tratamento de erros para requisições fetch
function refreshPage() {
  carregarDados(); // Chama a função para carregar os dados ao carregar a página
}

let popupAberto = false;
let popup2Aberto = false;
let popupNumpadAberto = false;
let popupNumpadPasswordAberto = false;
let popupRodaDentada = false;
let popupConfiguracoes = false;
let popupFiltros = false;

function atualizarPagina() {
  if (!popupAberto && !popup2Aberto && campoPesquisa==false &&!popupConfiguracoes) {
    // Lógica para atualizar a página
    //location.reload();
  }
}

// Função para carregar o mesmo número introduzido no numpad(quando é feito reload)
function carregarNumpad() {
  // Se existir um numero na base de dados vai buscar, senão usa localmente
  const databaseNum = JSON.parse(localStorage.getItem("numpadNum"))
  if(databaseNum){

      databaseNum.forEach((item)=>{
        if(item.numberButtons!=null || item.numberButtons != undefined){
          document.getElementById("numberCurvas").value = item.numberButtons
          console.log(item.numberButtons)
        }
      })
  }else{
    document.getElementById("numberCurvas").value =
    localStorage.getItem("numCurves");
  }
  generateNumpad();
}



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


function generateNumpad() {
  //Se já existir um numpad gerado, não acrescenta mais um
  if (document.getElementById("numpad-table") == null) {
    const num = document.getElementById("numberCurvas").value;
    const databaseNum = JSON.parse(localStorage.getItem("numpadNum"))
    console.log(databaseNum)
    if(databaseNum!=undefined || databaseNum !=null){
      setTimeout(() => {
      databaseNum.forEach((item)=>{
        console.log(item.numberButtons);
        generatedNumber = item.numberButtons
      })
      },100)
    }else{
      generatedNumber = num;
    }
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
    /* editarNumpad(); */
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
    /* editarNumpad(); */
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
    /*  editarNumpad();
    editarNumpad2(); */
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
    /* editarNumpad();
    editarNumpad2(); */
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

//Verificar se o campo de pesquisa esta ativo
let campoPesquisa = false;

document.addEventListener("DOMContentLoaded", function () {
  loadPesquisaChoice();
  const pesquisaField = document.getElementById("pesquisa");
  if (!pesquisaField) {
    console.log(pesquisaField);
    console.log("Campo não encontrado");
  } else {
    pesquisaField.addEventListener("focus", function () {
      console.log("focused on it");
      campoPesquisa = true;
    });
    pesquisaField.addEventListener("focusout", function () {
      console.log("unfocused on it");
      campoPesquisa = false;
    });
  }
});


if(campoPesquisa==false){
  // Chamar a função atualizarPagina a cada 5 segundos
  setInterval(atualizarPagina, 5000);
}



// Valor para o segundo input numérico no numpad
document.addEventListener("keydown", function (e) {
  if (popupNumpadAberto == true){
    let curvaInput = document.getElementById("curvaInput")
    const maxCurvas = localStorage.getItem("numCurves")
    console.log(maxCurvas);
    curvaInput.value += `${e.key}`;
    if(Number(curvaInput.value) > maxCurvas){
      curvaInput.value = String(maxCurvas)
    }
}
})

//Atalhos para o numpad (no numpad físico) até 9
document.addEventListener("keydown", function (e) {
  //Vai buscar o numero currente de curvas definido
  numpadNumbers = localStorage.getItem("numCurves");
  botaoEditar = document.getElementById("botao-numpad-editar");

  // Caso nenhum dos popus estejam abertos
  if (
    popupAberto == false &&
    popup2Aberto == false &&
    popupNumpadAberto == false &&
    popupNumpadPasswordAberto == false &&
    popupRodaDentada == false &&
    popupConfiguracoes == false &&
    campoPesquisa == false
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


document.addEventListener("keydown", function (e) {
  if (
    popupAberto == false &&
    popup2Aberto == false &&
    popupNumpadAberto == false &&
    popupNumpadPasswordAberto == false &&
    popupRodaDentada == false &&
    popupConfiguracoes == false &&
    campoPesquisa == false
  ) {
  if(e.key === 'p' || e.key==='P'){
    document.getElementById("curvaInput").value = 'Start';
    obterHoraAtual()
    adicionarLinha();
  }else if(e.key==='r' || e.key==='R'){
    document.getElementById("curvaInput").value = 'Red Flag';
    obterHoraAtual()
    adicionarLinha();
  }else if(e.key==='s' || e.key==='S'){
    document.getElementById("curvaInput").value = 'Slow Flag';
    obterHoraAtual()
    adicionarLinha();
  }
}
})


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
    else if (popupNumpadPasswordAberto){
      checkPassword();
    }
    // Adicione mais verificações para outros popups, se necessário
    else {
      console.error("Erro: Nenhum popup aberto.");
    }
  }
}

// Adicione um ouvinte de evento de teclado ao documento
document.addEventListener("keydown", handleEnterKey);

/* function checkPassword2() {
  numpadPassword = "WFR2012";
  console.log(document.getElementById("numpadUnlock2").value);
  if (document.getElementById("numpadUnlock2").value == numpadPassword) {
    generateNumpad2();
    fecharPopupNumpadPassword();
  } else {
    window.alert("Código introduzido errado!");
    fecharPopupNumpadPassword();
  }
} */

/* function carregarNumpad2() {
  console.log(localStorage.getItem("numCurves"));
  document.getElementById("numberCurvas").value =
    localStorage.getItem("numCurves");
  generateNumpad2();
} */

document.getElementById("pesquisaOptions").value = 1;
console.log(document.getElementById("pesquisaOptions").value);
// Alterar a coluna de pesquisa no campo de pesquisa


function mudaPesquisa() {
  let pesquisaChoice = document.getElementById("pesquisaOptions");
  const historyChoice = localStorage.getItem("pesquisaChoice");
  
  const pesquisa = document.getElementById("pesquisa");
  console.log(pesquisaChoice.value);
  let num = Number(pesquisaChoice.value);
  if (!pesquisaChoice) {
    console.log("Não há select");
  } else {
    pesquisaChoice.addEventListener("change", function () {
      if (pesquisaChoice.value == 1) {
        localStorage.setItem('pesquisaChoice', pesquisaChoice.value)
        pesquisa.onkeyup = function () {         
          pesquisarTabelaPost();
        };
        console.log(localStorage.getItem('pesquisaChoice'))
      } else if (pesquisaChoice.value == 2) {
        localStorage.setItem('pesquisaChoice', pesquisaChoice.value)
        console.log("Selected2!");
        console.log(localStorage.getItem('pesquisaChoice'))
        pesquisa.onkeyup = function () {     
          pesquisarTabelaHour();
        };
      } else if (pesquisaChoice.value == 3) {
        localStorage.setItem('pesquisaChoice', pesquisaChoice.value)
        console.log("Selected3!");
        pesquisa.onkeyup = function () {
          pesquisarTabelaObs();
        };
      }
    });
  }
}

// Carregar a pesquisa selecionada anteriormente
function loadPesquisaChoice(){
  let pesquisaChoice = document.getElementById("pesquisaOptions")
  const choice = localStorage.getItem("pesquisaChoice")
  const pesquisa = document.getElementById("pesquisa");
  console.log(choice)
  if(choice!=null){
    pesquisaChoice.value = choice;
    console.log(pesquisaChoice.value)
    if (pesquisaChoice.value == 1) {
      pesquisa.onkeyup = function () {         
        pesquisarTabelaPost();
      };
    } else if (pesquisaChoice.value == 2) {
      console.log("Selected2!");
      pesquisa.onkeyup = function () {     
        pesquisarTabelaHour();
      };
    } else if (pesquisaChoice.value == 3) {
      console.log("Selected3!");
      pesquisa.onkeyup = function () {
        pesquisarTabelaObs();
      };
    }
  }
  
}

/* Adiciona função filtragem*/
function pesquisarTabelaObs() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("pesquisa");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabela");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[7]; //Escolha de qual a coluna onde a pesquisa vai incidir 5->Observações
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function pesquisarTabelaHour() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("pesquisa");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabela");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3]; //Escolha de qual a coluna onde a pesquisa vai incidir 1->Hour
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function pesquisarTabelaPost() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("pesquisa");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabela");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2]; //Escolha de qual a coluna onde a pesquisa vai incidir 0->Post
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
/*  Escolher o tipo de pesquisa */
function pesquisaEscolhaPost() {
  const choice = getElementById("pesquisaObs");
  choice.classList.add("hidden");
  const actualChoice = getElementById("pesquisaPost");
  actualChoice.classList.remove("hidden");
}

function pesquisaEscolhaPostObs() {
  const choice = getElementById("pesquisaPost");
  choice.classList.add("hidden");
  const actualChoice = getElementById("pesquisaObs");
  actualChoice.classList.remove("hidden");
}


/* Esconder/Mostrar Tabela/Numpad */

function trocarParaNumpad() {
  const tabela = document.getElementById("tabela");
  const tabelaIcon = document.getElementById("iconTabela");
  const numpad = document.getElementById("numpad");
  const numpadIcon = document.getElementById("iconNumpad");
  const headerText = document.getElementById("currentOptionHeader");

  headerText.textContent = "Tabela:";
  tabela.classList.add("hidden");
  tabelaIcon.classList.remove("hidden");
  numpad.classList.remove("hidden");
  numpadIcon.classList.add("hidden");
}

function trocarParaTabela() {
  const tabela = document.getElementById("tabela");
  const tabelaIcon = document.getElementById("iconTabela");
  const numpad = document.getElementById("numpad");
  const numpadIcon = document.getElementById("iconNumpad");
  const headerText = document.getElementById("currentOptionHeader");

  headerText.textContent='Numpad:';
  tabela.classList.remove('hidden');
  tabelaIcon.classList.add('hidden');
  numpad.classList.add('hidden');
  numpadIcon.classList.remove('hidden');
}

// Mover a linha para cima

function moveUp(button) { //Vai buscar a celula do botão, e depois a linha dessa célula
  var row = button.parentNode.parentNode; //Vai buscar o celula do botão, e depois a linha dessa célula
  const idLinha = row.cells[0].textContent
  var table = row.parentNode;

  const dadosExistentes = localStorage.getItem('dadosTabela')
  const data = JSON.parse(dadosExistentes)
  var LinhaDados1;
  var LinhaDados2;
  var rowIndex = Array.from(table.rows).indexOf(row); //Procura o indice do elemento row dem relação á tabela. Podia só usar o rowIndex = row.rowIndex
  var tablePosition; // Variável para saber a posição no loop (e ir buscar o anterior na tabela mais tarde)
  var numCiclo=1;
  var allowNext = false // Variavel para executar o segundo if (entrada seguinte)
  if (rowIndex > 1) {
    if(data!=null){

      data.forEach((item) =>{ //Por cada item já armazenado na tabela
        if(item._id==idLinha){ //Vai buscar o id da linha onde foi primido o botao
          
          LinhaDados1 = {...item};// Como o valor LinhaDados1 passa por referencia ao item, quando o item era alterado, alterava o LinhaDados1 também, {...}->spread, utilizando o operador spread, cria-se uma copia do objecto para utilizar sem que o seu valor seja alterado.

          tablePosition = numCiclo; //Guarda a posição da linha onde foi primido o botao
          allowNext = true // Para adquirir os dados do que vem a seguir
          //localStorage.setItem('LinhaPosition1',JSON.stringify(item))

        }
        numCiclo++;
      })

      const linhaAnterior = table.rows[tablePosition-1]; // Ir buscar a linha da tabela anterior
      const idLinhaAnterior = linhaAnterior.cells[0].textContent; // Ir buscar o Id da linha anterior

      data.forEach((item)=>{ // Ciclo para encontrar os dados da linha anterior
        if(item._id==idLinhaAnterior){
          LinhaDados2 = {...item}; // Ir buscar dados da linha anterior
        }

      })

      data.forEach((item) =>{ // Ciclo para fazer a troca
      
        if(item._id==LinhaDados1._id){ //Vai buscar o objecto com o mesmo e ID e substituir pelos contéudos do qual pretende trocar
  
          item.camera = LinhaDados2.camera;
          item.curva = LinhaDados2.curva;
          item.hora = LinhaDados2.hora;
          item.video = LinhaDados2.video;
          item.report = LinhaDados2.report;
          item.nfa = LinhaDados2.nfa;
          item.priority = LinhaDados2.priority;
          item.obs = LinhaDados2.obs;
          item.__v= LinhaDados2.__v;
          localStorage.setItem('LinhaPosition1',JSON.stringify(item))
  
        }
        if(item._id==LinhaDados2._id){ //Vai buscar o objecto com o mesmo e ID e substituir pelos contéudos do qual pretende trocar
  
          item.camera = LinhaDados1.camera;
          item.curva = LinhaDados1.curva;
          item.hora = LinhaDados1.hora;
          item.video = LinhaDados1.video;
          item.report = LinhaDados1.report;
          item.nfa = LinhaDados1.nfa;
          item.priority = LinhaDados1.priority;
          item.obs = LinhaDados1.obs;
          item.__v= LinhaDados1.__v;
          localStorage.setItem('LinhaPosition2',JSON.stringify(item))
        }
      })

      updatePosition();
    }
  } else {
    console.log("No row before the current row");
  }
  
}


// Mover a linha para baixo

function moveDown(button) {
  var row = button.parentNode.parentNode; //Vai buscar o celula do botão, e depois a linha dessa célula
  const idLinha = row.cells[0].textContent
  var table = row.parentNode;

  const dadosExistentes = localStorage.getItem('dadosTabela')
  const data = JSON.parse(dadosExistentes)
  var LinhaDados1;
  var LinhaDados2;
  var rowIndex = Array.from(table.rows).indexOf(row); //Procura o indice do elemento row dem relação á tabela. Podia só usar o rowIndex = row.rowIndex
  var allowNext = false // Variavel para executar o segundo if (entrada seguinte)
  if (rowIndex < table.rows.length-1) {
    if(data!=null){

      data.forEach((item) =>{ //Por cada item já armazenado na tabela
        
        if(item._id==idLinha){ //Vai buscar o id da linha anterior
          LinhaDados1 = {...item};// Como o valor LinhaDados1 passa por referencia ao item, quando o item era alterado, alterava o LinhaDados1 também, {...}->spread, utilizando o operador spread, cria-se uma copia do objecto para utilizar sem que o seu valor seja alterado.
          allowNext = true // Para adquirir os dados do que vem a seguir
          //localStorage.setItem('LinhaPosition1',JSON.stringify(item))
        }
        else if(allowNext == true){ //Vai buscar o indice corrente e retira uma posição(passa para cima)
          LinhaDados2 = {...item};
          allowNext = false;
          //item.indice-=1;
          //localStorage.setItem('LinhaPosition2',JSON.stringify(item))
        }
      })


      data.forEach((item) =>{ //Ciclo para substituir
      
        if(item._id==LinhaDados1._id){ //Vai buscar o objecto com o mesmo e ID e substituir pelos contéudos do qual pretende trocar
  
          item.camera = LinhaDados2.camera;
          item.indice = LinhaDados2.indice;
          item.curva = LinhaDados2.curva;
          item.hora = LinhaDados2.hora;
          item.video = LinhaDados2.video;
          item.report = LinhaDados2.report;
          item.nfa = LinhaDados2.nfa;
          item.priority = LinhaDados2.priority;
          item.obs = LinhaDados2.obs;
          item.__v= LinhaDados2.__v;
          localStorage.setItem('LinhaPosition1',JSON.stringify(item))
  
        }
        if(item._id==LinhaDados2._id){ //Vai buscar o objecto com o mesmo e ID e substituir pelos contéudos do qual pretende trocar
  
          item.camera = LinhaDados1.camera;
          item.indice = LinhaDados1.indice;
          item.curva = LinhaDados1.curva;
          item.hora = LinhaDados1.hora;
          item.video = LinhaDados1.video;
          item.report = LinhaDados1.report;
          item.nfa = LinhaDados1.nfa;
          item.priority = LinhaDados1.priority;
          item.obs = LinhaDados1.obs;
          item.__v= LinhaDados1.__v;
          localStorage.setItem('LinhaPosition2',JSON.stringify(item))
  
        }
        updatePosition();
      })
      //
    }
  } else {
    console.log("No row after the current row");
  }
}






/* Fazer update dos indices quando as linhas trocarem de lugar*/
function updatePosition() {
  // Obtém os dados da linha atualizados do localStorage
  const updatedDataString1 = localStorage.getItem("LinhaPosition1");
  console.log(updatedDataString1);
  const updatedDataString2 = localStorage.getItem("LinhaPosition2");
  console.log(updatedDataString2);
  // Verifica se há dados no localStorage
  if (updatedDataString1 && updatedDataString2) {
    const updatedData1 = JSON.parse(updatedDataString1);
    console.log(updatedData1);

    // Define o ID do documento a ser atualizado (obtido do localStorage)
    const id = updatedData1._id;
    console.log(id);
    // Definir o IP/URL para onde enviar os dados
    //Ip casa
    const url = `http://192.168.1.136:3000/updateData/${id}`;
    //IP casa Luís 
    //const url = `http://192.168.1.136/updateData/${id}`;
    //IP config WFR
    //const url = `http://192.168.1.148:3000/updateData/${id}`;
    //const url = `http://192.168.1.136:3000/updateData/${id}`;
    //IP CORRIDAS
    //const url = "http://192.168.1.53:3000/updateData/";
    console.log(url);
    // Envia os dados atualizados para o servidor
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData1),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados atualizados com sucesso:", data);

        // Limpa os dados do localStorage após a atualização
        localStorage.removeItem("LinhaPosition1");
      })
      .catch((error) => {
        console.error(
          "Erro ao enviar dados atualizados para o servidor:",
          error
        );
      });

      //Processo da outra linha
      const updatedData2 = JSON.parse(updatedDataString2);
      console.log(updatedData2);

      // Define o ID do documento a ser atualizado (obtido do localStorage)
    const id2 = updatedData2._id;
    console.log(id2);
    // Definir o IP/URL para onde enviar os dados
    //Ip casa
    const url2 = `http://192.168.1.136:3000/updateData/${id2}`;
    //IP casa Luís 
    //const url = `http://192.168.1.136/updateData/${id}`;
    //IP config WFR
    //const url = `http://192.168.1.148:3000/updateData/${id}`;
    //const url = `http://192.168.1.136:3000/updateData/${id}`;
    //IP CORRIDAS
    //const url = "http://192.168.1.53:3000/updateData/";
    console.log(url2);
    // Envia os dados atualizados para o servidor
    fetch(url2, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData2),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados atualizados com sucesso:", data);

        // Limpa os dados do localStorage após a atualização
        localStorage.removeItem("LinhaPosition2");
      })
      .catch((error) => {
        console.error(
          "Erro ao enviar dados atualizados para o servidor:",
          error
        );
      });
      location.reload();
      
  } else {
    console.error("Nenhum dos dados encontrados no localStorage para enviar.");
  }
  
}
