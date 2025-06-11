// === State ===
let numberBank = [];
let oddNumbers = [];
let evenNumbers = [];

// === Helper Functions ===

function createElement(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([key, val]) => {
    if (key.startsWith("on") && typeof val === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), val);
    } else if (key === "className") {
      el.className = val;
    } else {
      el.setAttribute(key, val);
    }
  });
  children.forEach((child) => {
    if (typeof child === "string" || typeof child === "number") {
      el.appendChild(document.createTextNode(child));
    } else if (child) {
      el.appendChild(child);
    }
  });
  return el;
}

// === State Mutators ===

function addNumber(num) {
  if (!isNaN(num)) {
    numberBank.push(num);
    render();
  }
}

function sortOne() {
  if (numberBank.length === 0) return;
  const num = numberBank.shift();
  if (num % 2 === 0) {
    evenNumbers.push(num);
  } else {
    oddNumbers.push(num);
  }
  render();
}

function sortAll() {
  while (numberBank.length > 0) {
    sortOne();
  }
}

function clearAll() {
  numberBank = [];
  oddNumbers = [];
  evenNumbers = [];
  render();
}

// === Components ===

function NumberList({ title, numbers }) {
  return createElement(
    "div",
    { className: "number-list" },
    createElement("h3", {}, title),
    createElement(
      "ul",
      {},
      ...numbers.map((num) => createElement("li", {}, num))
    )
  );
}

function NumberInputForm() {
  let input;

  function onAddClick(e) {
    e.preventDefault();
    if (!input) return;
    const val = input.value.trim();
    if (val === "") return;

    const num = Number(val);
    if (isNaN(num)) {
      alert("Please enter a valid number");
      return;
    }
    addNumber(num);
    input.value = "";
  }

  const form = createElement(
    "form",
    { onSubmit: onAddClick },
    (input = createElement("input", {
      type: "number",
      placeholder: "Enter a number",
      required: true,
    })),
    createElement("button", { type: "submit" }, "Add number")
  );
  return form;
}

function SortButtons() {
  return createElement(
    "div",
    { className: "sort-buttons" },
    createElement("button", { onClick: sortOne }, "Sort 1"),
    createElement("button", { onClick: sortAll }, "Sort All"),
    createElement("button", { onClick: clearAll }, "Clear All")
  );
}

// === Render ===

function render() {
  document.body.innerHTML = ""; // clear everything

  document.body.appendChild(createElement("h1", {}, "Number Bank Sorter"));

  document.body.appendChild(NumberInputForm());
  document.body.appendChild(SortButtons());

  document.body.appendChild(
    NumberList({ title: "Number Bank", numbers: numberBank })
  );
  document.body.appendChild(
    NumberList({ title: "Odd Numbers", numbers: oddNumbers })
  );
  document.body.appendChild(
    NumberList({ title: "Even Numbers", numbers: evenNumbers })
  );
}

// === Initialize ===
render();
