function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    const url = `/products?search=${query}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayResults(data.products, data.responseTime);
      })
      .catch(error => console.error('Error fetching products:', error));
  }

  function displayResults(products, responseTime) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    const responseTimeDiv = document.getElementById('responseTime');
    responseTimeDiv.textContent = `Response Time: ${responseTime.toFixed(2)} ms`;

    if (products.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No products found.';
      resultsList.appendChild(li);
      return;
    }

    products.forEach(product => {
  const li = document.createElement('li');
  const category = document.createElement('span');
  category.textContent = `Category: ${product.category}`;
  const price = document.createElement('span');
  price.textContent = `Price: $${product.price}`;
  const type = document.createElement('span');
  type.textContent = `Type: ${product.type}`;
  const name = document.createElement('span');
  name.textContent = `Name: ${product.name}`;

  li.appendChild(name);
  li.appendChild(document.createElement('br'));
  li.appendChild(price);
  li.appendChild(document.createElement('br'));
  li.appendChild(category);
  li.appendChild(document.createElement('br'));
  li.appendChild(type);

  resultsList.appendChild(li);
});
  }