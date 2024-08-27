document.addEventListener('DOMContentLoaded', () => {
    // Event listener para mudar para a seção de dados do empréstimo
    document.querySelector('#personalDataSection button').addEventListener('click', goToLoanDetails);

    // Event listener para calcular o empréstimo
    document.querySelector('#loanDataSection button').addEventListener('click', calculateLoan);

    // Event listener para enviar a simulação para o WhatsApp
    document.querySelector('#whatsappButton').addEventListener('click', sendToWhatsApp);
});

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

function goToLoanDetails() {
    const personalSection = document.getElementById('personalDataSection');
    const loanSection = document.getElementById('loanDataSection');
    
    if (validatePersonalData()) {
        personalSection.classList.remove('active');
        loanSection.classList.add('active');
    }
}

function validatePersonalData() {
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const phone = document.getElementById('phone').value;

    if (!name || !city || !state || !phone) {
        alert('Por favor, preencha todos os campos de dados pessoais.');
        return false;
    }
    return true;
}

function calculateLoan() {
    const propertyValue = parseFloat(document.getElementById('propertyValue').value);
    const loanValue = parseFloat(document.getElementById('loanValue').value);
    const term = parseInt(document.getElementById('term').value);

    if (!validateLoanData(propertyValue, loanValue, term)) {
        return;
    }

    const interestRate = 0.0119; // 1.19% ao mês
    const monthlyInterestRate = interestRate / 100;
    const monthlyInstallment = loanValue * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) / (Math.pow(1 + monthlyInterestRate, term) - 1);
    const totalPayment = monthlyInstallment * term;

    document.getElementById('propertyValueDisplay').textContent = formatCurrency(propertyValue);
    document.getElementById('loanValueDisplay').textContent = formatCurrency(loanValue);
    document.getElementById('termDisplay').textContent = term;
    document.getElementById('installment').textContent = formatCurrency(monthlyInstallment.toFixed(2));
    document.getElementById('totalPayment').textContent = formatCurrency(totalPayment.toFixed(2));
    
    // Torna o resultado visível
    document.getElementById('result').style.display = 'block';
}

function validateLoanData(propertyValue, loanValue, term) {
    if (isNaN(propertyValue) || isNaN(loanValue) || isNaN(term)) {
        alert('Por favor, preencha todos os campos de dados do empréstimo corretamente.');
        return false;
    }
    if (loanValue > propertyValue) {
        alert('O valor do empréstimo não pode ser maior que o valor do imóvel.');
        return false;
    }
    if (term < 1 || term > 180) {
        alert('O prazo deve ser entre 1 e 180 meses.');
        return false;
    }
    return true;
}

function formatCurrency(value) {
    return `R$${value.toString().replace('.', ',')}`;
}

function sendToWhatsApp() {
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const phone = document.getElementById('phone').value;

    const propertyValue = document.getElementById('propertyValue').value;
    const loanValue = document.getElementById('loanValue').value;
    const term = document.getElementById('term').value;

    const installment = document.getElementById('installment').textContent.replace('R$', '').trim();
    const totalPayment = document.getElementById('totalPayment').textContent.replace('R$', '').trim();

    const whatsappNumber = "5519994782797"; // Substitua pelo seu número de WhatsApp
    const message = `Simulação de Empréstimo:\n\nNome: ${name}\nCidade: ${city}\nEstado: ${state}\nNúmero: ${phone}\n\nValor do Imóvel: R$${propertyValue}\nValor do Empréstimo: R$${loanValue}\nPrazo: ${term} meses\nParcela: R$${installment}\nTotal a Pagar: R$${totalPayment}\n\n*Esses valores são uma estimativa e podem variar conforme a negociação e análise de crédito.*`;

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}
