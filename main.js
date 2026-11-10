const form = document.getElementById('form-atividade');
const atividades = new Set();
const notas = [];
let notaMinima = null;
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const campoNome = document.getElementById('nome-atividade');
    const campoNota = document.getElementById('nota-atividade');
    const nome = campoNome.value.trim();
    const nota = Number(campoNota.value);
    if (!nome || !campoNota.value.trim() || !Number.isFinite(nota) || nota < 0 || nota > 10) {
        alert('Informe uma atividade e uma nota entre 0 e 10.');
        return;
    }
    const chave = nome.toLocaleLowerCase('pt-BR');
    if (atividades.has(chave)) {
        alert('Esta atividade já foi adicionada.');
        return;
    }
    if (notaMinima === null) {
        const entrada = prompt('Digite a nota mínima para aprovação (0 a 10):');
        if (entrada === null) return;
        const valor = Number(entrada.trim().replace(',', '.'));
        if (!entrada.trim() || !Number.isFinite(valor) || valor < 0 || valor > 10) {
            alert('A nota mínima deve estar entre 0 e 10.');
            return;
        }
        notaMinima = valor;
    }
    const linha = document.createElement('tr');
    for (const valor of [nome, String(nota)]) {
        const celula = document.createElement('td');
        celula.textContent = valor;
        linha.appendChild(celula);
    }
    const celula = document.createElement('td');
    const imagem = document.createElement('img');
    imagem.src = nota >= notaMinima ? './images/aprovado.png' : './images/reprovado.png';
    imagem.alt = nota >= notaMinima ? 'Aprovado' : 'Reprovado';
    celula.appendChild(imagem);
    linha.appendChild(celula);
    document.querySelector('tbody').appendChild(linha);
    atividades.add(chave);
    notas.push(nota);
    const media = notas.reduce((soma, atual) => soma + atual, 0) / notas.length;
    document.getElementById('media-final-valor').textContent = media.toFixed(2);
    const resultado = document.createElement('span');
    resultado.className = media >= notaMinima ? 'resultado aprovado' : 'resultado reprovado';
    resultado.textContent = media >= notaMinima ? 'Aprovado' : 'Reprovado';
    document.getElementById('media-final-resultado').replaceChildren(resultado);
    form.reset();
    campoNome.focus();
});
