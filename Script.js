// -----------------------------
// Launch Fuse Pro (monetization placeholder)
// -----------------------------
const launchBtn = document.getElementById("launchFuse");
if (launchBtn) {
  launchBtn.onclick = () => {
    alert("Fuse Finder Pro is the monetization engine.");
  };
}

// -----------------------------
// SAMPLE VEHICLE DATA
// -----------------------------
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
      },
      "Model 3": {
        image: "images/2025_Tesla_Model_3.jpg",
        fuseInfo: "Front trunk fuse box and interior panel.",
        fuseGrid: [
          { fuse: "F1", description: "Lights", amp: "10A" },
          { fuse: "F2", description: "Radio", amp: "15A" }
        ]
      }
    },
    Ford: {
      "F-150": {
        image: "images/2025_Ford_F150.jpg",
        fuseInfo: "Passenger footwell and engine compartment.",
        fuseGrid: [
          { fuse: "F1", description: "Headlights", amp: "15A" },
          { fuse: "F2", description: "Horn", amp: "10A" },
          { fuse: "F3", description: "AC", amp: "20A" },
          { fuse: "F4", description: "Radio", amp: "10A" }
        ]
      }
    }
  }
};

// -----------------------------
// DOM REFERENCES
// -----------------------------
const yearSelect = document.getElementById("yearSelect");
const makeSelect = document.getElementById("makeSelect");
const modelSelect = document.getElementById("modelSelect");
const carImage = document.getElementById("carImage");
const fuseInfo = document.getElementById("fuseInfo");
const fuseGrid = document.getElementById("fuseGrid");
const results = document.getElementById("results");
const pdfBtn = document.getElementById("pdfBtn");

// -----------------------------
// POPULATE YEARS
// -----------------------------
Object.keys(vehicles).forEach(year => {
  const opt = document.createElement("option");
  opt.value = year;
  opt.textContent = year;
  yearSelect.appendChild(opt);
});

// -----------------------------
// YEAR → MAKE
// -----------------------------
yearSelect.addEventListener("change", () => {
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  makeSelect.disabled = true;
  modelSelect.disabled = true;
  results.style.display = "none";

  const year = yearSelect.value;
  if (!year) return;

  Object.keys(vehicles[year]).forEach(make => {
    const opt = document.createElement("option");
    opt.value = make;
    opt.textContent = make;
    makeSelect.appendChild(opt);
  });

  makeSelect.disabled = false;
});

// -----------------------------
// MAKE → MODEL
// -----------------------------
makeSelect.addEventListener("change", () => {
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;
  results.style.display = "none";

  const year = yearSelect.value;
  const make = makeSelect.value;
  if (!make) return;

  Object.keys(vehicles[year][make]).forEach(model => {
    const opt = document.createElement("option");
    opt.value = model;
    opt.textContent = model;
    modelSelect.appendChild(opt);
  });

  modelSelect.disabled = false;
});

// -----------------------------
// MODEL → RESULTS
// -----------------------------
modelSelect.addEventListener("change", () => {
  const year = yearSelect.value;
  const make = makeSelect.value;
  const model = modelSelect.value;
  if (!model) return;

  const vehicle = vehicles[year][make][model];

  results.style.display = "block";
  carImage.src = vehicle.image || "images/placeholder.jpg";
  carImage.alt = `${year} ${make} ${model}`;
  fuseInfo.textContent = vehicle.fuseInfo;

  buildFuseGrid(vehicle.fuseGrid);
});

// -----------------------------
// BUILD FUSE GRID
// -----------------------------
function buildFuseGrid(fuses) {
  fuseGrid.innerHTML = "";
  fuseGrid.style.display = "grid";
  fuseGrid.style.gridTemplateColumns = "repeat(auto-fill, minmax(80px, 1fr))";
  fuseGrid.style.gap = "10px";

  fuses.forEach(f => {
    const box = document.createElement("div");
    box.style.border = "1px solid #ccc";
    box.style.padding = "10px";
    box.style.cursor = "pointer";
    box.style.borderRadius = "6px";
    box.style.textAlign = "center";
    box.textContent = f.fuse;

    box.onclick = () => {
      alert(`${f.fuse}\n${f.description}\n${f.amp}`);
    };

    fuseGrid.appendChild(box);
  });
}

// -----------------------------
// PDF BUTTON (STRIPE GATE)
// -----------------------------
if (pdfBtn) {
  pdfBtn.onclick = () => {
    alert("Premium PDF download — Stripe checkout goes here.");
  };
}
