document.getElementById("launchFuse").onclick = () => {
  alert("Fuse Finder Pro coming next. This is your monetization engine.");
};
// Sample vehicle data
const vehicles = {
  2025: {
    Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
    Ford: ["F-150", "Mustang", "Explorer"],
  },
  2024: {
    Tesla: ["Model S", "Model 3", "Model X"],
    Ford: ["F-150", "Mustang"],
  },
};

// DOM references
const yearSelect = document.getElementById("yearSelect");
const makeSelect = document.getElementById("makeSelect");
const modelSelect = document.getElementById("modelSelect");
const carImage = document.getElementById("carImage");
const fuseInfo = document.getElementById("fuseInfo");
const fuseGrid = document.getElementById("fuseGrid");
const results = document.getElementById("results");

// Populate years
Object.keys(vehicles).forEach((year) => {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
});

// When year changes
yearSelect.addEventListener("change", () => {
  const year = yearSelect.value;
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;

  if (!year) {
    makeSelect.disabled = true;
    results.style.display = "none";
    return;
  }

  Object.keys(vehicles[year]).forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  });
  makeSelect.disabled = false;
  results.style.display = "none";
});

// When make changes
makeSelect.addEventListener("change", () => {
  const year = yearSelect.value;
  const make = makeSelect.value;
  modelSelect.innerHTML = '<option value="">Select Model</option>';

  if (!make) {
    modelSelect.disabled = true;
    results.style.display = "none";
    return;
  }

  vehicles[year][make].forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });

  modelSelect.disabled = false;
  results.style.display = "none";
});

// When model changes
modelSelect.addEventListener("change", () => {
  const year = yearSelect.value;
  const make = makeSelect.value;
  const model = modelSelect.value;

  if (!model) {
    results.style.display = "none";
    return;
  }

  // Show results
  results.style.display = "block";

  // Placeholder image & info
  carImage.src = `images/${year}_${make}_${model}.jpg`;
  carImage.alt = `${year} ${make} ${model}`;

  fuseInfo.textContent = `Fuse info for ${year} ${make} ${model} goes here.`;
  fuseGrid.innerHTML = `<p>Sample fuse grid for ${year} ${make} ${model}</p>`;
});
