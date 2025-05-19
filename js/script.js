// Configurações e constantes do aplicativo
const CONFIG = {
  maxValues: [99999, 19999, 9999999, 499, 499, 3999999],
  buttonIDs: ["attic", "caros", "egypt", "etrus", "psalt", "roman"],
  ajudas: [
    "https://en.wikipedia.org/wiki/Attic_numerals#The_system",
    "https://en.wikipedia.org/wiki/kharosthi#Numerals",
    "https://en.wikipedia.org/wiki/Egyptian_numerals#Digits_and_numbers",
    "https://en.wikipedia.org/wiki/Etruscan_numerals",
    "https://en.wikipedia.org/wiki/Psalter_Pahlavi#Numbers",
    "https://en.wikipedia.org/wiki/Roman_numerals",
  ],
  bgImages: [
    'url("https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/A_City_of_Ancient_Greece_by_William_Linton.jpg/960px-A_City_of_Ancient_Greece_by_William_Linton.jpg?20230606183934")',
    'url("https://upload.wikimedia.org/wikipedia/commons/e/e2/Across_the_Pool_to_the_Golden_Temple_of_Amritsar_by_Edwin_Lord_Weeks.jpg")',
    'url("https://cdn2.oceansbridge.com/2018/06/22173929/Egyptian-Landscape-with-the-Pyramids-Georg-Macco-Oil-Painting.jpg")',
    'url("https://blogs.unimelb.edu.au/shaps-research/files/2024/03/Hubert-Robert-Ancient-ruins-as-baths-1798-1466a6123e0eab63-1050x591.png")',
    'url("https://idsb.tmgrup.com.tr/ly/uploads/images/2023/09/26/thumbs/800x531/293777.jpg")',
    'url("https://www.dailyartmagazine.com/wp-content/uploads/2022/01/Cole_Thomas_The_Course_of_Empire_Destruction_1836-scaled.jpeg")',
  ]
};

const conversionTable = [
    atticValues = {[String.fromCodePoint(0x10147)]: 50000, 'Μ': 10000, [String.fromCodePoint(0x10146)]: 5000, 'Χ': 1000, [String.fromCodePoint(0x10145)]: 500, 'Η': 100, [String.fromCodePoint(0x10144)]: 50, 'Δ': 10, 'Π': 5, 'Ι': 1},
    carosValues = {"𐩄𐩇": 10000, "𐩃𐩃𐩀𐩇": 9000, "𐩃𐩃𐩇": 8000, "𐩃𐩂𐩇": 7000, "𐩃𐩁𐩇": 6000, "𐩃𐩀𐩇": 5000, "𐩃𐩇": 4000, "𐩂𐩇": 3000, "𐩁𐩇": 2000, "𐩇": 1000, "𐩃𐩃𐩀𐩆": 900, "𐩃𐩃𐩆": 800, "𐩃𐩂𐩆": 700, "𐩃𐩁𐩆": 600, "𐩃𐩀𐩆": 500, "𐩃𐩆": 400, "𐩂𐩆": 300, "𐩁𐩆": 200, "𐩆": 100, "𐩅": 20, "𐩄": 10, "𐩃": 4, "𐩂": 3, "𐩁": 2, "𐩀": 1},
    egyptValues = {[String.fromCodePoint(0x13067)]: 1000000, [String.fromCodePoint(0x13190)]: 100000, [String.fromCodePoint(0x130AD)]: 10000, [String.fromCodePoint(0x131BC)]: 1000, [String.fromCodePoint(0x13362)]: 100, [String.fromCodePoint(0x13386)]: 10, [String.fromCodePoint(0x133E4)]: 1},
    etrusValues = {[String.fromCodePoint(0x1031F)]: 100, '𐌣': 50, '𐌢': 10, '𐌡': 5, '𐌠': 1},
    psaltValues = {[String.fromCodePoint(0x10BAF)]: 100, [String.fromCodePoint(0x10BAE)]: 20, [String.fromCodePoint(0x10BAD)]: 10, [String.fromCodePoint(0x10BAC)]: 4, [String.fromCodePoint(0x10BAB)]: 3, [String.fromCodePoint(0x10BAA)]: 2, [String.fromCodePoint(0x10BA9)]: 1},
    romanValues = {M̅: 1000000, C̅M̅: 900000, D̅: 500000, C̅D̅: 400000, C̅: 100000, X̅C̅: 90000, L̅: 50000, X̅L̅: 40000, X̅: 10000, I̅X̅: 9000, V̅I̅I̅I̅: 8000, V̅I̅I̅: 7000, V̅I̅: 6000, V̅: 5000, I̅V̅: 4000, M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1}
];

// Estado global da aplicação
const appState = {
  currentSystem: 5, // Sistema numérico atual (começa com Romano)
  currentValues: {} // Valores de conversão atuais
};

// Cache de elementos DOM
const elements = {
  htmlTag: document.querySelector("html"),
  resultDisplay: document.querySelector("#resultado"),
  inputField: document.querySelector("#input"),
  helpLink: document.getElementById("ajuda"),
  navButtons: document.getElementsByClassName("nav-btn")
};

/**
 * Inicializa a aplicação 
 */
function initApp() {
  // Definir sistema inicial
  appState.currentSystem = 5; // Romano como padrão
  updateNavigationUI();
  
  // Adicionar event listeners
  elements.inputField.addEventListener('input', performConversion);
  
  // Aplicar estilo inicial
  elements.htmlTag.style.backgroundImage = CONFIG.bgImages[appState.currentSystem];
}

/**
 * Altera o estilo dos elementos baseado no contexto
 * @param {number} styleMode - 1: normal, 2: erro
 */
function applyStyles(styleMode) {
  const { resultDisplay, inputField, helpLink } = elements;
  
  if (styleMode === 1) {
    // Estilo normal
    resultDisplay.style.boxShadow = 'none';
    resultDisplay.style.borderColor = 'ivory';
    helpLink.style.boxShadow = 'none';
    helpLink.style.borderColor = 'ivory';
    inputField.style.boxShadow = 'none';
    inputField.style.borderColor = 'ivory';
  } else if (styleMode === 2) {
    // Estilo de erro
    resultDisplay.style.boxShadow = '0px 0px 5px red';
    inputField.style.boxShadow = '0px 0px 5px red';
    resultDisplay.style.borderColor = 'red';
    inputField.style.borderColor = 'red';
    resultDisplay.style.visibility = "visible";
    resultDisplay.style.fontFamily = '"Quivira", sans-serif';
    helpLink.style.boxShadow = '0px 0px 5px red';
    helpLink.style.borderColor = 'red';
  }
}

/**
 * Atualiza a UI de navegação quando o sistema é alterado
 */
function updateNavigationUI() {
  const { currentSystem } = appState;
  const { navButtons, htmlTag, resultDisplay, inputField, helpLink } = elements;
  
  // Redefinir todos os botões
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].style.backgroundColor = 'transparent';
    navButtons[i].style.color = 'ivory';
  }
  
  // Configurar estilos para o resultado
  resultDisplay.style.fontFamily = '"Quivira", sans-serif';
  resultDisplay.style.fontSize = 'x-large';
  resultDisplay.style.padding = '2vh 2vw';
  resultDisplay.style.lineHeight = 'normal';
  resultDisplay.style.letterSpacing = 'normal';
  
  // Atualizar o placeholder com o valor máximo para o sistema atual
  inputField.placeholder = 'Insira um número de 1 a ' + CONFIG.maxValues[currentSystem];
  
  // Atualizar link de ajuda
  helpLink.href = CONFIG.ajudas[currentSystem];
  
  // Configurações específicas por sistema
  if (currentSystem === 4) {
    resultDisplay.style.fontFamily = '"Noto Sans Psalter Pahlavi", sans-serif';
  }
  
  // Atualizar fundo
  htmlTag.style.backgroundImage = CONFIG.bgImages[currentSystem];
  
  // Atualizar valores de conversão atuais
  appState.currentValues = conversionTable[currentSystem];
  
  // Destacar botão atual
  const currentButton = document.getElementById(CONFIG.buttonIDs[currentSystem]);
  currentButton.style.backgroundColor = 'ivory';
  currentButton.style.color = 'black';
  
  // Realizar conversão com o novo sistema
  performConversion();
}

/**
 * Inverte uma string
 * @param {string} text - Texto a ser invertido
 * @returns {string} - Texto invertido
 */
function reverseString(text) {
  return _.split(text, '').reverse().join('');
}

/**
 * Configura o estilo de exibição do resultado
 * @param {number} displayType - Tipo de exibição (0: normal, 1: especial para egípcios)
 */
function configureResultDisplay(displayType) {
  const { resultDisplay } = elements;
  
  if (displayType === 0) {
    resultDisplay.style.fontSize = 'x-large';
    resultDisplay.style.padding = '2vh 2vw';
    resultDisplay.style.lineHeight = 'normal';
    resultDisplay.style.letterSpacing = 'normal';
  } else if (displayType === 1) {
    resultDisplay.style.fontSize = 'x-large';
    resultDisplay.style.padding = '0vh 2vw 0vh';
    resultDisplay.style.lineHeight = '1';
    resultDisplay.style.letterSpacing = '10px';
    resultDisplay.style.visibility = "visible";
  }
}

/**
 * Realiza a conversão do número para o sistema numérico atual
 */
function performConversion() {
  const { resultDisplay, inputField } = elements;
  const { currentSystem, currentValues } = appState;
  
  let inputValue = inputField.value;
  let conversion = '';
  
  // Aplicar estilo normal inicialmente
  applyStyles(1);
  
  // Verificar se o input está vazio
  if (!inputValue) {
    resultDisplay.style.visibility = "hidden";
    return;
  }
  
  // Converter para número
  inputValue = Number(inputValue);
  
  // Verificar se o input está dentro dos limites válidos
  if (inputValue > 0 && inputValue <= CONFIG.maxValues[currentSystem]) {
    // Realizar conversão
    for (let key in currentValues) {
      while (inputValue >= currentValues[key]) {
        conversion += key;
        inputValue -= currentValues[key];
      }
      if (conversion.includes(key) && currentSystem == 2) conversion += '\n';
    }
    
    // Exibir resultado dependendo do sistema
    switch (currentSystem) {
      case 2: // Egípcio
        configureResultDisplay(1);
        resultDisplay.innerHTML = '<pre>' + conversion + '</pre>';
        break;
      case 3: // Etrusco (invertido)
        configureResultDisplay(0);
        resultDisplay.innerHTML = reverseString(conversion);
        break;
      default:
        configureResultDisplay(0);
        resultDisplay.innerHTML = conversion;
        break;
    }
    resultDisplay.style.visibility = "visible";
  } 
  else if (inputValue <= 0 || inputValue > CONFIG.maxValues[currentSystem]) {
    // Exibir mensagem de erro para valores inválidos
    configureResultDisplay(0);
    applyStyles(2);
    resultDisplay.innerHTML = "INSIRA UM NÚMERO DE 1 A " + CONFIG.maxValues[currentSystem];
  }
}

/**
 * Altera o sistema numérico atual
 * @param {number} systemIndex - Índice do sistema numérico
 */
function changeNumericalSystem(systemIndex) {
  appState.currentSystem = systemIndex;
  updateNavigationUI();
}

// Atribuir a função ao contexto global para acesso no HTML
window.changeNumericalSystem = changeNumericalSystem;

// Inicializar a aplicação quando a página carregar
document.addEventListener('DOMContentLoaded', initApp);
