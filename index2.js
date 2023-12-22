const bodyNode  = document.querySelector('body');
const pageNodes = [...document.querySelectorAll('.page')];

let prevPage    = null;
let currentPage = 0;

// Очистить тело документа
bodyNode.innerHTML = '';

// Добавить первую страницу
bodyNode.appendChild(pageNodes[currentPage]);

window.addEventListener('wheel', (event) => {
  const currentPageNode = bodyNode.querySelector('.page');

  switch(currentPageNode.dataset.animation) {
    case 'vertical':
      verticalAnimation(scrollDirection(event.deltaY));
      break;

    case 'reverse':
      reverseAnimation(scrollDirection(event.deltaY));
      break;
  }

  swipePage(event.deltaY);
});

function reverseAnimation(direction) {
  const currElement = pageNodes[currentPage];
  const nextElement = 'bottom' === direction ? pageNodes[currentPage + 1] : pageNodes[currentPage - 1];

  if (nextElement) {
    const [leftColumnNode, rightColumnNode] = [...currElement.querySelectorAll('.block-column')];
    currElement.classList.add('reverse-animation');
    bodyNode.appendChild(nextElement);
  }

  clearBoth(currElement, nextElement);
}

function verticalAnimation(direction) {
  const currElement = pageNodes[currentPage];
  const nextElement = 'bottom' === direction ? pageNodes[currentPage + 1] : pageNodes[currentPage - 1];

  if (nextElement) {
    bodyNode.appendChild(nextElement);

    if (direction === 'bottom') {
      currElement.classList.add('shrink-from-bottom-to-up');
      nextElement.classList.add('break-from-bottom-to-up');
    }

    if (direction === 'top') {
      currElement.classList.add('shrink-from-up-to-bottom');
      nextElement.classList.add('break-from-up-to-bottom');
    }
  }

  clearBoth(currElement, nextElement);
}

function swipePage(delta) {
  // Скролл вниз
  if (delta > 0 && currentPage < pageNodes.length - 1) {
    currentPage++;
  }
  // Скролл верх
  else if (delta < 0 && currentPage > 0) {
    currentPage--;
  }
}

function scrollDirection(delta) {
  // Скролл вниз
  if (delta > 0 && currentPage <= pageNodes.length - 1) {
    return 'bottom'
  }
  // Скролл верх
  else if (delta < 0 && currentPage >= 0) {
    return 'top'
  }
}

function clearBoth(currElement, nextElement) {
  setTimeout(() => {
    currElement.classList.forEach(className => {
      if (className != 'page') { currElement.classList.remove(className) }
    });

    nextElement.classList.forEach(className => {
      if (className != 'page') { nextElement.classList.remove(className) }
    });

    bodyNode.removeChild(currElement);
  }, 500);
}