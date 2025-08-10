document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    const totalAhorradoSpan = document.getElementById('total-ahorrado');
    const cajasCompletadasSpan = document.getElementById('cajas-completadas');
    const toggleLockBtn = document.getElementById('toggle-lock-btn');
    
    let isLocked = true; // Por defecto, los cuadros están bloqueados
    let totalAhorrado = 0;
    let cajasCompletadas = 0;

    // Función para actualizar la interfaz
    const updateUI = () => {
        totalAhorradoSpan.textContent = totalAhorrado.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
        cajasCompletadasSpan.textContent = cajasCompletadas;
    };

    // Cargar el progreso guardado del Local Storage
    const loadProgress = () => {
        const savedProgress = JSON.parse(localStorage.getItem('savingsTrackerProgress')) || {
            completedItems: [],
            totalAhorrado: 0,
            cajasCompletadas: 0
        };

        totalAhorrado = savedProgress.totalAhorrado;
        cajasCompletadas = savedProgress.cajasCompletadas;
        
        savedProgress.completedItems.forEach(index => {
            if (gridItems[index]) {
                gridItems[index].classList.add('completed');
            }
        });
        updateUI();
    };

    // Guardar el progreso en el Local Storage
    const saveProgress = () => {
        const completedItems = Array.from(gridItems).reduce((acc, item, index) => {
            if (item.classList.contains('completed')) {
                acc.push(index);
            }
            return acc;
        }, []);

        const progress = {
            completedItems,
            totalAhorrado,
            cajasCompletadas
        };

        localStorage.setItem('savingsTrackerProgress', JSON.stringify(progress));
    };

    // Manejar el clic en los cuadros
    gridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (!isLocked) {
                const amount = parseInt(item.getAttribute('data-amount'));

                if (item.classList.contains('completed')) {
                    item.classList.remove('completed');
                    totalAhorrado -= amount;
                    cajasCompletadas--;
                } else {
                    item.classList.add('completed');
                    totalAhorrado += amount;
                    cajasCompletadas++;
                }
                
                updateUI();
                saveProgress();
            }
        });
    });

    // Manejar el botón de bloqueo/desbloqueo
    toggleLockBtn.addEventListener('click', () => {
        isLocked = !isLocked;
        if (isLocked) {
            toggleLockBtn.textContent = 'Bloquear Cuadros';
            gridItems.forEach(item => item.classList.add('locked'));
        } else {
            toggleLockBtn.textContent = 'Desbloquear Cuadros';
            gridItems.forEach(item => item.classList.remove('locked'));
        }
    });

    // Inicialización al cargar la página
    loadProgress();
    // Bloquear los cuadros por defecto al iniciar
    gridItems.forEach(item => item.classList.add('locked'));
});
