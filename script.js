function handleSubmit() {
  const query = document.getElementById("query").value;
  const mode = document.getElementById("mode").value;

  let answer = "";
  let confidence = "";
  let model = "";
  let cost = "";

  // Simulated logic
  if (mode === "fast") {
    answer = "Quick answer (may be less accurate)";
    confidence = "60%";
    model = "Cheap Model";
    cost = "$0.001";
  } else if (mode === "balanced") {
    answer = "Improved answer after basic validation";
    confidence = "80%";
    model = "Cheap + Validation";
    cost = "$0.003";
  } else {
    answer = "Highly accurate answer using premium model";
    confidence = "95%";
    model = "Premium Model";
    cost = "$0.01";
  }

  // Display
  document.getElementById("answer").innerText = answer;
  document.getElementById("confidence").innerText = confidence;
  document.getElementById("model").innerText = model;
  document.getElementById("cost").innerText = cost;
}