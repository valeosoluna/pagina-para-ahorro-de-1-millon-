document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    const totalAhorradoSpan = document.getElementById('total-ahorrado');
    const cajasTachadasSpan = document.getElementById('cajas-tachadas');
    
    // Load saved progress from local storage
    let totalAhorrado = parseInt(localStorage.getItem('totalAhorrado')) || 0;
    let cajasTachadas = parseInt(localStorage.getItem('cajasTachadas')) || 0;
    let completedItems = JSON.parse(localStorage.getItem('completedItems')) || [];

    // Update the UI with loaded progress
    totalAhorradoSpan.textContent = totalAhorrado.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    cajasTachadasSpan.textContent = cajasTachadas;
    
    completedItems.forEach(index => {
        if (gridItems[index]) {
            gridItems[index].classList.add('completed');
        }
    });

    gridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('completed')) {
                item.classList.add('completed');
                
                const amount = parseInt(item.getAttribute('data-amount'));
                totalAhorrado += amount;
                cajasTachadas++;
                
                // Update and save progress
                totalAhorradoSpan.textContent = totalAhorrado.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
                cajasTachadasSpan.textContent = cajasTachadas;
                
                localStorage.setItem('totalAhorrado', totalAhorrado);
                localStorage.setItem('cajasTachadas', cajasTachadas);

                // Save which items are completed
                completedItems.push(index);
                localStorage.setItem('completedItems', JSON.stringify(completedItems));
            }
        });
    });
});
