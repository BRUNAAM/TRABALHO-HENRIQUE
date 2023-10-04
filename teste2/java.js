const apiUrl = 'http://seu_webservice_url/produtos';  // Substitua com a URL do seu webservice

function cadastrarProduto() {
    const nomeProduto = document.getElementById('nomeProduto').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nomeProduto })
    })
    .then(response => response.json())
    .then(data => {
        // Adicionar o produto à tabela
        const tabelaProdutos = document.getElementById('tabelaProdutos');
        const newRow = tabelaProdutos.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        cell1.innerHTML = data.id;
        cell2.innerHTML = data.nome;
        cell3.innerHTML = '<button onclick="editarProduto()">Editar</button> <button onclick="excluirProduto()">Excluir</button>';
    })
    .catch(error => console.error('Erro ao cadastrar produto:', error));
}

function editarProduto() {
    const idEditar = document.getElementById('idEditar').value;
    const novoNome = document.getElementById('novoNome').value;

    fetch(`${apiUrl}/${idEditar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: novoNome })
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto editado com sucesso!');
        // Atualizar a tabela de produtos
        lerProdutos();
    })
    .catch(error => console.error('Erro ao editar produto:', error));
}

function excluirProduto() {
    const idExcluir = document.getElementById('idExcluir').value;

    fetch(`${apiUrl}/${idExcluir}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto excluído com sucesso!');
        // Atualizar a tabela de produtos
        lerProdutos();
    })
    .catch(error => console.error('Erro ao excluir produto:', error));
}

function lerProdutos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tabelaProdutos = document.getElementById('tabelaProdutos');
            tabelaProdutos.innerHTML = '<tr><th>ID</th><th>Nome</th><th>Ações</th></tr>';

            data.forEach(produto => {
                const newRow = tabelaProdutos.insertRow();
                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);
                cell1.innerHTML = produto.id;
                cell2.innerHTML = produto.nome;
                cell3.innerHTML = `<button onclick="editarProduto()">Editar</button> <button onclick="excluirProduto()">Excluir</button>`;
            });
        })
        .catch(error => console.error('Erro ao ler produtos:', error));
}

// Inicialmente, ao carregar a página, ler todos os produtos
lerProdutos();
