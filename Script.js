// SAMPLE VEHICLE DATA
const vehicles = {
  2025: {
    Tesla: {
      "Model S": {
        image: "images/2025_Tesla_Model_S.jpg",
        fuseInfo: "Interior fuse box under dashboard. Engine bay fuse box near battery.",
        fuseGrid: [
          { fuse: "F1", description: "Headlights", amp: "15A" },
          { fuse: "F2", description: "Horn", amp: "10A" },
          { fuse: "F3", description: "AC", amp: "20A" }
        ]
      }
    }
  }
};

// DOM REFERENCES
const yearSelect = document.getElementById("yearSelect");
const makeSelect = document.getElementById("makeSelect");
const modelSelect = document.getElementById("modelSelect");
const carImage = document.getElementById("carImage");
const fuseInfo = document.getElementById("fuseInfo");
const fuseGrid = document.getElementById("fuseGrid");
const results = document.getElementById("results");
const pdfBtn = document.getElementById("pdfBtn");

// Populate years
Object.keys(vehicles).forEach(year => {
  const opt = document.createElement("option");
  opt.value = year;
  opt.textContent = year;
  yearSelect.appendChild(opt);
});

yearSelect.addEventListener("change", () => {
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  makeSelect.disabled = false;

  Object.keys(vehicles[yearSelect.value]).forEach(make => {
    const opt = document.createElement("option");
    opt.value = make;
    opt.textContent = make;
    makeSelect.appendChild(opt);
  });
});

makeSelect.addEventListener("change", () => {
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = false;

  Object.keys(vehicles[yearSelect.value][makeSelect.value]).forEach(model => {
    const opt = document.createElement("option");
    opt.value = model;
    opt.textContent = model;
    modelSelect.appendChild(opt);
  });
});

modelSelect.addEventListener("change", () => {
  const vehicle = vehicles[yearSelect.value][makeSelect.value][modelSelect.value];
  results.style.display = "block";
  carImage.src = vehicle.image;
  fuseInfo.textContent = vehicle.fuseInfo;

  fuseGrid.innerHTML = "";
  vehicle.fuseGrid.forEach(f => {
    const div = document.createElement("div");
    div.textContent = `${f.fuse} - ${f.description} (${f.amp})`;
    fuseGrid.appendChild(div);
  });
});

pdfBtn.onclick = () => alert("Premium PDF – Stripe goes here");
