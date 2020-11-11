// https://github.com/neelpatel05/periodic-table-api-go
const BASE_API = "https://periodic-table-api.herokuapp.com";

let elements = [];
async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function load() {
  const elements = await getData(`${BASE_API}`);
  const $elementContainer = document.querySelector(".container");
  const $description = document.querySelector(".description-element");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");

  console.log($description.children);

  renderElements($elementContainer, elements);

  function addEventClick($element) {
    $element.addEventListener("click", () => {
      showDescription($element);
    });
  }

  function renderElements($container, elements) {
    elements.forEach((element) => {
      const HTMLString = templateElements(element);
      const playElement = createTemplate(HTMLString);
      $container.append(playElement);
      addEventClick(playElement);
    });
  }

  for (let i = 0; i <= elements.length - 1; i++) {
    const $elementTable = document.getElementById(`${i + 1}`);
    $elementTable.style.color = `#${elements[i].cpkHexColor}`;
    $elementTable.style.background = `linear-gradient(to bottom , #${elements[i].cpkHexColor}, rgba(0,0,0,.5) 70%)`;
    $elementTable.style.border = `3px solid #${elements[i].cpkHexColor}`;
  }

  async function showDescription(elemento) {
    $overlay.classList.add("active");
    const id = elemento.dataset.id;
    const element = await getData(`${BASE_API}/atomicNumber/${id}`);

    $description.children[0].textContent = element.name;
    $description.children[1].textContent = element.symbol;
    $description.children[2].textContent = `Numero Atómico: ${element.atomicNumber}`;
    $description.children[3].textContent = `Masa Atómica: ${element.atomicMass}`;
    $description.children[4].textContent = `Radio Atómico: ${element.atomicRadius}`;
    $description.children[5].textContent = `Punto de Ebullición: ${element.boilingPoint}`;
    $description.children[6].textContent = `Punto de Fusión: ${element.meltingPoint}`;
    $description.children[7].textContent = `Densidad: ${element.density}`;
    $description.children[8].textContent = `Afinidad Electrónica: ${element.electronAffinity}`;
    $description.children[9].textContent = `Electronegatividad: ${element.electronegativity}`;
    $description.children[10].textContent = `Radio iónico: ${element.ionRadius}`;
    $description.children[11].textContent = `Energía de ionización: ${element.ionizationEnergy}`;
    $description.children[12].textContent = `Estados de oxidación: ${element.oxidationStates}`;
    $description.children[13].textContent = `Radio de van Der Waals: ${element.vanDelWaalsRadius}`;
    $description.children[14].textContent = `Estado estándar: ${element.standardState}`;
    $description.children[15].textContent = `Grupo: ${element.groupBlock}`;
    $description.children[16].textContent = `Configuración Electrónica: ${element.electronicConfiguration}`;
    $description.children[17].textContent = `Tipo de unión: ${element.bondingType}`;
    $description.children[18].textContent = `Año de descubrimiento: ${element.yearDiscovered}`;
  }

  $hideModal.addEventListener("click", hideModal);

  function hideModal() {
    $overlay.classList.remove("active");
  }
}

load();

function templateElements(element) {
  return `
      <div class="element-table" id="${element.atomicNumber}" data-id="${element.atomicNumber}">
        <div class="symbol">${element.symbol}</div>
        <div class="atomicnumber">${element.atomicNumber}</div>
        <div class="name">${element.name}</div>
      </div>
      `;
}

function createTemplate(HTMLString) {
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = HTMLString;
  return html.body.children[0];
}
