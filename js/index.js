document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const searchInput = document.querySelector('.filters input[type="text"]');
    const employeeRows = document.querySelectorAll('tbody tr');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    const paginationButtons = document.querySelectorAll('.pagination .pages .btn');
    const prevButton = document.querySelector('.pagination .prev');
    const nextButton = document.querySelector('.pagination .next');
    const rowsPerPage = 5;
    let currentPage = 1;

    // Functions
    function filterEmployees() {
        const searchTerm = searchInput.value.toLowerCase();
        employeeRows.forEach(row => {
            const name = row.querySelector('.name').textContent.toLowerCase();
            const email = row.querySelector('.email').textContent.toLowerCase();
            const role = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            const status = row.querySelector('.status').textContent.toLowerCase();
            if (name.includes(searchTerm) || email.includes(searchTerm) || role.includes(searchTerm) || status.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function paginate() {
        employeeRows.forEach((row, index) => {
            row.style.display = (index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage) ? '' : 'none';
        });
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        const totalPages = Math.ceil(employeeRows.length / rowsPerPage);
        paginationButtons.forEach(button => {
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    function changePage(event) {
        currentPage = parseInt(event.target.textContent);
        paginate();
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            paginate();
        }
    }

    function nextPage() {
        const totalPages = Math.ceil(employeeRows.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            paginate();
        }
    }

    // Event Listeners
    searchInput.addEventListener('input', filterEmployees);
    paginationButtons.forEach(button => button.addEventListener('click', changePage));
    prevButton.addEventListener('click', prevPage);
    nextButton.addEventListener('click', nextPage);

    // Initial setup
    paginate();
});
