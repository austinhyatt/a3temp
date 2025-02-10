const submit = async function (event) {
  event.preventDefault();

  const playerName = document.querySelector("#name"),
    playerScore = document.querySelector("#score"),
    playerDate = document.querySelector("#date");

  const json = {
    username: localStorage.getItem("user"),
    name: playerName.value,
    score: playerScore.value,
    date: playerDate.value,
  };

  await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json),
  });

  check(); // Auto-update scoreboard
};

const check = async function (event) {
  event?.preventDefault();

  const response = await fetch("/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: localStorage.getItem("user") }),
  });
  const data = await response.json();

  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="nes-text is-primary">${i + 1}</td>
        <td><span id="name-span-${i}">${item.name}</span></td>
        <td><span id="score-span-${i}">${item.score}</span></td>
        <td><span id="date-span-${i}">${item.date}</span></td>
        <td><button id="edit-${i}" class="nes-btn is-warning">Edit</button></td>
        <td><button id="delete-${i}" class="nes-btn is-warning">Delete</button></td>
    `;
    tableBody.appendChild(row);

    document.getElementById(`delete-${i}`).onclick = async () => {
      await deleteFunct(i);
    };

    document.getElementById(`edit-${i}`).onclick = async () => {
      enableEditMode(i, item);
    };
  });
};

const enableEditMode = (index, item) => {
  const row = document.getElementById(`edit-${index}`).parentElement.parentElement;

  row.innerHTML = `
    <td>${index + 1}</td>
    <td><input type="text" id="name-${index}" value="${item.name}"></td>
    <td><input type="number" id="score-${index}" value="${item.score}"></td>
    <td><input type="date" id="date-${index}" value="${item.date}"></td>
    <td><button id="save-${index}">Save</button></td>
    <td><button id="delete-${index}">Delete</button></td>
  `;

  document.getElementById(`save-${index}`).onclick = async () => {
    await editFunct(index);
  };

  document.getElementById(`delete-${index}`).onclick = async () => {
    await deleteFunct(index);
  };
};

const deleteFunct = async function (index) {
  await fetch("/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index }),
  });

  check(); // Auto-update scoreboard
};

const editFunct = async function (index) {
  const name = document.getElementById(`name-${index}`).value;
  const score = document.getElementById(`score-${index}`).value;
  const date = document.getElementById(`date-${index}`).value;

  const response = await fetch("/edit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index, name, score, date }),
  });

  if (!response.ok) {
    console.error("Failed to edit entry");
    return;
  }

  check(); // Auto-update scoreboard after edit
};

window.onload = function () {
  document.querySelector("#submitButton").onclick = submit;
  document.querySelector("#checkButton").onclick = check;
  check(); // Load scoreboard on page load
};
