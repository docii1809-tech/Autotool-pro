// Sample vehicle data
const vehicles = {
  2025: {
    Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
    Ford: ["F-150", "Mustang", "Explorer"]
  },
  2024: {
    Tesla: ["Model S", "Model 3"],
    Ford: ["F-150", "Mustang"]
  }
};

// Fuse info sample (for demo purposes)
const fuseData = {
  "Tesla_Model S": {
    image: "https://via.placeholder.com/300x150?text=Tesla+Model+S",
    info: "Main fuse layout for Tesla Model S.",
    grid: ["F1","F2","F3","F4","F5","F6","F7","F8"]
  },
  "Ford_F-150": {
    image: "https://via.placeholder.com/300x150?text=Ford+F-150",
    info: "Main fuse layout for Ford F-150.",
    grid: ["F1","F2","F3","F4","F5","F6","F7","F8"]
  }
};

// Get elements
const yearSelect = document.getElementById("yearSelect");
const makeSelect = document.getElementById("makeSelect");
const modelSelect = document.getElementById("modelSelect");
const results = document.getElementById("results");
const carImage = document.getElementById("carImage");
const fuseInfo = document.getElementById("fuseInfo");
const fuseGrid = document.getElementById("fuseGrid");

// Populate year dropdown
Object.keys(vehicles).forEach(year => {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
});

// When year changes
yearSelect.addEventListener("change", () => {
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;
  
  const selectedYear = yearSelect.value;
  if (!selectedYear) {
    makeSelect.disabled = true;
    return;
  }

  Object.keys(vehicles[selectedYear]).forEach(make => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  });
  makeSelect.disabled = false;
});

// When make changes
makeSelect.addEventListener("change", () => {
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  
  const selectedYear = yearSelect.value;
  const selectedMake = makeSelect.value;
  if (!selectedMake) {
    modelSelect.disabled = true;
    return;
  }

  vehicles[selectedYear][selectedMake].forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
  modelSelect.disabled = false;
});

// When model changes
modelSelect.addEventListener("change", () => {
  const make = makeSelect.value;
  const model = modelSelect.value;
  if (!model) {
    results.style.display = "none";
    return;
  }

  const key = `${make}_${model}`;
  const data = fuseData[key] || {
    image: "https://via.placeholder.com/300x150?text=No+Image",
    info: "No fuse info available.",
    grid: []
  };

  carImage.src = data.image;
  fuseInfo.textContent = data.info;

  // Populate fuse grid
  fuseGrid.innerHTML = "";
  data.grid.forEach(fuse => {
    const div = document.createElement("div");
    div.textContent = fuse;
    div.style.border = "1px solid #000";
    div.style.padding = "5px";
    div.style.textAlign = "center";
    fuseGrid.appendChild(div);
  });

  results.style.display = "block";
});

// PDF button (demo alert)
document.getElementById("pdfBtn").addEventListener("click", () => {
  alert("PDF download not implemented in this demo.");
});
