document.addEventListener('DOMContentLoaded', () => {
    const dataBody = document.getElementById('dataBody');
    const refreshButton = document.getElementById('refreshButton');

    // Function to populate the table with localStorage data
    function populateTable() {
        // Clear the table body
        dataBody.innerHTML = '';

        // Iterate over localStorage items
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            // Create a new table row
            const row = document.createElement('tr');

            // Create ID cell
            const idCell = document.createElement('td');
            idCell.textContent = value.username || key;
            row.appendChild(idCell);

            // Create Generated Key cell
            const keyCell = document.createElement('td');
            keyCell.textContent = value.key || 'N/A';
            row.appendChild(keyCell);

            // Append the row to the table body
            dataBody.appendChild(row);
        }
    }

    // Refresh data on button click
    refreshButton.addEventListener('click', populateTable);

    // Initial table population
    populateTable();
});

