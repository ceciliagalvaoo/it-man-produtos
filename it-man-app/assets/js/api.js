// public/js/api.js
async function fetchProducts() {
    const response = await fetch('/product');
    return response.json();
  }
  
  async function addProduct(formData) {
    const response = await fetch('/product/create', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Erro ao adicionar produto');
    }
  
    return response.json();
  }
  
  async function fetchProductById(productId) {
    const response = await fetch(`/product/${productId}`);
  
    if (!response.ok) {
      throw new Error('Produto não encontrado');
    }
  
    return response.json();
  }
  
  async function updateProduct(productId, formData) {
    const data = {
        name: formData.get('nameToUpdate'),
        description: formData.get('descriptionToUpdate'),
        price: formData.get('priceToUpdate')
    };
    const response = await fetch(`/product/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar produto');
    }
  }

  
  async function deleteProduct(productId) {
    const response = await fetch(`/product/${productId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Erro ao excluir produto');
    }
  }
  