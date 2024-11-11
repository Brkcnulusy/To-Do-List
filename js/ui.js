export const renderTodoList = function (element, datas) {
    element.innerHTML = '';
    datas.forEach(data => {
        const timeLeft = typeof data.timeleft === 'number' ? `${data.timeleft} days left.` : data.timeleft;
        element.innerHTML += `
            <li draggable="true" class="js-todo ${data.status}" data-id="${data.id}">
              <div class="check-button">
                <span class="js-check-button ${data.class}" data-id="${data.id}">
                    <img src="./assets/images/icon-check.svg" alt="check">
                </span>
              </div>
              <div class="todo-wrapper">
                <p class="js-todo-name">${data.name}</p>
                <p class="js-todo-date">${timeLeft}</p>
                <img class="js-remove-todo" src="./assets/images/icon-cross.svg" alt="Delete" />
              </div>
            </li>
        `;
    });
    
}

export const renderFailedList = function (element, datas) {
    element.innerHTML = '';

    datas.forEach(data => {
        element.innerHTML += `
        <li data-id="${data.id}">
            <div class="check-button">
                <span>
                    <img src="./assets/images/icon-cross.svg" alt="cross"/>
                </span>
            </div>
            <div class="todo-wrapper">
                <p class="js-failed-todo-name">${data.name}</p>
                <pclass="js-failed-todo-message">${data.timeleft}</p>
            </div>
        </li>
        `
    })

}

export const renderCompletedList = function (element, datas) {
    element.innerHTML = '';

    datas.forEach(data => {
        element.innerHTML += `
            <li data-id="${data.id}">
                <div class="check-button">
                    <span>
                        <img src="./assets/images/icon-check.svg" alt="check"/>
                    </span>
                </div>
                <div class="todo-wrapper">
                    <p class="js-compeleted-todo-name">${data.name}</p>
                    <p class="js-compeleted-todo-message">${data.timeleft}</p>
                </div>
            </li>
        `;
    })
}

export const addClass = function (element) {
    element.classList.add('active');
}

export const removeClass = function (element) {
    element.classList.remove('active');
}

export const _setQuantity = function (element, quantity) {
    element.innerHTML = '';

    element.innerHTML += `
        <p>${quantity} items left.</p>
    `;

}