/*
  Error 1 (grade.html, Line 10): onsubmit="checkMark()" did not return false, causing form submission to clear the result.
  Error 2 (grade.html, Line 18): onclick="showtable()" had wrong casing; should call showTable().
  Error 3 (grade.html, Line 20): <script src="grades.js"> referenced a non-existent file instead of grade.js.
  Error 4 (grade.js, Line 2): Missing '=' in variable declaration for name.
  Error 5 (grade.js, Line 3): Missing '=' and mismatched ')' in variable declaration for mark.
  Error 6 (grade.js, Line 4): Used '=' instead of '===' for name check and missed closing '}' before next if.
  Error 7 (grade.js, Line 7): Used 'isNan' instead of 'isNaN' and did not check empty mark first.
  Error 8 (grade.js, Line 14): Used '&&' instead of '||' for out-of-range check (mark < 0 || mark > 100).
  Error 9 (grade.js, Line 16): Missing '=' in mark = parseInt(mark, 10).
  Error 10 (grade.js, Line 23): Missing closing ')' in else if (mark >= 50) and missing ';' on line 24.
  Error 11 (grade.js, Line 26): Missing '=' in grade = "F".
  Error 12 (grade.js, Line 28): Used 'getElementByID' instead of 'getElementById' and missed '=' before string.
  Error 13 (grade.js, Line 30): Used 'style.colour' instead of 'style.color'.
  Error 14 (grade.js, Line 38): Loop started at i = 1 instead of i = 0, omitting grade A.
  Error 15 (grade.js, Line 43): Used 'innerHtml' instead of 'innerHTML'.
*/

function checkMark() {
  let name = document.forms["gradeForm"]["name"].value.trim();
  let markInput = document.forms["gradeForm"]["mark"].value.trim();

  // Check for empty name
  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  // Check for empty mark
  if (markInput === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  // Check numeric input
  if (isNaN(markInput)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  let mark = Number(markInput);

  // Validate range 0 to 100
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  // Determine grade
  let grade;
  if (mark >= 80) {
    grade = "A";
  } else if (mark >= 65) {
    grade = "B";
  } else if (mark >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }

  // Display result and set colour by grade
  let resultEl = document.getElementById("result");
  resultEl.innerHTML = name + " got grade " + grade;

  if (grade === "A" || grade === "B") {
    resultEl.style.color = "green";
  } else if (grade === "C") {
    resultEl.style.color = "orange";
  } else {
    resultEl.style.color = "red";
  }

  // Display date and time when grade was checked
  document.getElementById("checkedDate").innerHTML = "Checked on: " + new Date();

  return false;
}

// Generate a random whole number from 0 to 100
function setRandomMark() {
  let randomMark = Math.floor(Math.random() * 101);
  document.getElementById("mark").value = randomMark;
}

// Render grade scale table starting from index 0 (A, B, C, F)
function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];
  let tableHTML = "<table><thead><tr><th>Grade</th><th>Mark Range</th></tr></thead><tbody>";

  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }

  tableHTML += "</tbody></table>";
  document.getElementById("tableContainer").innerHTML = tableHTML;
}