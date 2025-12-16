
// Launch Fuse Pro (monetization placeholder)
const launchBtn = document.getElementById("launchFuse");
if (launchBtn) {
  launchBtn.onclick = () => {
    alert("Fuse Finder Pro coming next. This is your monetization engine.");
  };
}

// Sample vehicle data with image & fuse info
const vehicles = {
  2025: {
    Tesla: {
      "Model S": {
        image: "images/2025_Tesla_Model S.jpg",
        fuseInfo: "Tesla Model S fuse info here.",
        fuseGrid: [
          { fuse: "F1", description: "Headlights" },
          { fuse: "F2", description: "Horn" },
          { fuse: "F3", description: "AC" }
        ]
      },
      "Model 3": {
        image: "images/2025_Tesla_Model 3.jpg",
        fuseInfo: "Tesla Model 3 fuse info here.",
        fuseGrid: [
          { fuse: "F1", description: "Headlights" },
          { fuse: "F2", description: "Horn" }
        ]
      }
    },
    Ford: {
      "F-150": {
        image: "images/2025_Ford_F-150.jpg",
        fuseInfo: "Ford F-150 fuse info here.",
        fuseGrid: [
          { fuse: "F1", description: "Headlights" },
          { fuse: "F2", description: "Horn" },
          { fuse: "F3", description: "AC" },
          { fuse: "F4", description: "Radio" }
        ]
      }
    }
  }
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
Object.keys(vehicles).forEach(year => {
  const opt = document.createElement("option");
  opt.value = year;
  opt.textContent = year;
  yearSelect.appendChild(opt);
});

// Year change
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

  Object.keys(vehicles[year]).forEach(make => {
    const opt = document.createElement("option");
    opt.value = make;
    opt.textContent = make;
    makeSelect.appendChild(opt);
  });

  makeSelect.disabled = false;
  results.style.display = "none";
});

// Make change
makeSelect.addEventListener("change", () => {
  const year = yearSelect.value;
  const make = makeSelect.value;
  modelSelect.innerHTML = '<option value="">Select Model</option>';

  if (!make) {
    modelSelect.disabled = true;
    results.style.display = "none";
    return;
  }

  Object.keys(vehicles[year][make]).forEach(model => {
    const opt = document.createElement("option");
    opt.value = model;
    opt.textContent = model;
    modelSelect.appendChild(opt);
  });

  modelSelect.disabled = false;
  results.style.display = "none";
});

// Model change
modelSelect.addEventListener("change", () => {
  const year = yearSelect.value;
  const make = makeSelect.value;
  const model = modelSelect.value;

  if (!model) {
    results.style.display = "none";
    return;
  }

  const vehicle = vehicles[year][make][model];
  results.style.display = "block";

  // Car image
  carImage.src = vehicle.image || "images/placeholder.jpg";
  carImage.alt = `${year} ${make} ${model}`;

  // Fuse info
  fuseInfo.textContent = vehicle.fuseInfo || "No fuse info available.";

  // Fuse grid
  fuseGrid.innerHTML = "";
  vehicle.fuseGrid.forEach(f => {
    const p = document.createElement("p");
    p.textContent = `${f.fuse}: ${f.description}`;
    fuseGrid.appendChild(p);
  });
});

// PDF button placeholder
const pdfBtn = document.getElementById("pdfBtn");
if (pdfBtn) {
  pdfBtn.onclick = () => {
    alert("PDF download coming soon. You will integrate Stripe here.");
  };
                            }
