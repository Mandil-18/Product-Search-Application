// index.js

let currentPage = 1;
const pageSize = 10;

function searchProducts() {
  const searchInput = document.getElementById('searchInput').value;
  currentPage = 1; // Reset to the first page when performing a new search
  fetchProducts(searchInput);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    const searchInput = document.getElementById('searchInput').value;
    fetchProducts(searchInput);
  }
}

function nextPage() {
  currentPage++;
  const searchInput = document.getElementById('searchInput').value;
  fetchProducts(searchInput);
}
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchProducts();
  }
});

async function fetchProducts(searchInput) {
  const responseTime = document.getElementById('responseTime');
  const resultsList = document.getElementById('resultsList');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  responseTime.textContent = 'Loading...';
  resultsList.innerHTML = '';

  try {
    const startTime = performance.now();
    const response = await fetch(`/products?search=${searchInput}&page=${currentPage}&pageSize=${pageSize}`);
    const data = await response.json();
    const endTime = performance.now();
    const responseTimeValue = endTime - startTime;

    responseTime.textContent = `Response Time: ${responseTimeValue.toFixed(2)}ms`;

    if (response.ok) {
      const { products, totalPages } = data;
      products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <p><strong>Name:</strong> ${product.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Type:</strong> ${product.type}</p>
        `;
        resultsList.appendChild(listItem);
      });

      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error retrieving products:', error);
    responseTime.textContent = 'An error occurred.';
  }
}
