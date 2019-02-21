// UFO data from data.js
var tableData = data;
console.log(tableData);

// Function to delete existing rows from the results
function deleteRow(){
    var tbody = d3.select("tbody");
    tbody.selectAll("*").remove();
}

// Function to filter the results when the user clicks the Filter Results button
function handleSubmit() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputDateElement = d3.select("#datetime");
    var inputCityElement = d3.select("#city");
    var inputStateElement = d3.select("#state");
  
    // Get the value property of the input element
    var inputDateValue = inputDateElement.property("value");
    var inputCityValue = inputCityElement.property("value");
    var inputStateValue = inputStateElement.property("value");
    console.log(inputDateValue);
    console.log(inputCityValue);
    console.log(inputStateValue);

    // Filter the data based on the input parameters
    if (inputDateValue !== "") {
        if (inputCityValue !== ""){
            if (inputStateValue !== "") {
                var filteredData = tableData.filter(input => (input.datetime === inputDateValue && input.city === inputCityValue && input.state === inputStateValue));
            } 
            else {
                var filteredData = tableData.filter(input => (input.datetime === inputDateValue && input.city === inputCityValue));
            }
        }
        else if (inputStateValue !== ""){
                var filteredData = tableData.filter(input => (input.datetime === inputDateValue && input.state === inputStateValue));
        } 
        else {
            var filteredData = tableData.filter(input => (input.datetime === inputDateValue));
        }
    }
    else if (inputCityValue !== "") {
        if (inputStateValue !== "") {
            var filteredData = tableData.filter(input => (input.city === inputCityValue && input.state === inputStateValue));
        } 
        else {
            var filteredData = tableData.filter(input => (input.city === inputCityValue));
        }
    }
    else if (inputStateValue !== "") {
        var filteredData = tableData.filter(input => (input.state === inputStateValue));
    }
    else {
        var filteredData = tableData;
    }

    // Get the number of rows in the table.  If more than one row for the header, then call the delete row function
    var x = document.getElementById("ufo-table").rows.length;
    if (x > 1){ 
        deleteRow();
    }

    filteredData.forEach((ufoSiting) => {
        var tbody = d3.select("tbody");
        var row = tbody.append("tr");
        Object.entries(ufoSiting).forEach(([key, value]) => {
          var cell = tbody.append("td");
          cell.text(value);
        });
      });
}

d3.select("#filter-btn").on("click", handleSubmit);