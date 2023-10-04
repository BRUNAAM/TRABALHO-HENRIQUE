const apiUrl = 'http://seu_webservice_url/produtos';

function lerProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';  
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(produto => {
                const itemLista = document.createElement('li');
                itemLista.textContent = `ID: ${produto.id}, Nome: ${produto.nome}`;
                listaProdutos.appendChild(itemLista);
            });
        });
}
function inserirProduto() {
    const novoProdutoNome = document.getElementById('novoProdutoNome').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: novoProdutoNome })
    })
    .then(response => response.json())
    .then(data => console.log('Produto inserido com sucesso:', data))
    .catch(error => console.error('Erro ao inserir produto:', error));
}

function editarProduto() {
    const produtoId = document.getElementById('produtoId').value;
    const novoNome = document.getElementById('novoNome').value;

    fetch(`${apiUrl}/${produtoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: novoNome })
    })
    .then(response => response.json())
    .then(data => console.log('Produto editado com sucesso:', data))
    .catch(error => console.error('Erro ao editar produto:', error));
}

function excluirProduto() {
    const produtoIdExcluir = document.getElementById('produtoIdExcluir').value;

    fetch(`${apiUrl}/${produtoIdExcluir}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log('Produto excluído com sucesso:', data))
    .catch(error => console.error('Erro ao excluir produto:', error));
}
