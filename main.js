fetch('./GreenEggsAndHam.txt')
    .then(response => response.text())
    .then(handleText)
    .catch(console.error);

/** @param {String} content */
function handleText(content) {
    const lines = content
        .replaceAll('!', ' ')
        .replaceAll('?', ' ')
        .replaceAll('.', ' ')
        .replaceAll('-', ' ')
        .replaceAll('(', ' ')
        .replaceAll(')', ' ')
        .replaceAll('\r', '')
        .split('\n')
        .slice(1)
        .filter(Boolean)
        .map(line => line.trim());

    const wordMap = new Map(); // [ word, count ]

    for (const line of lines) {
        const wordList = line.split(' ').filter(Boolean);
        for (const word of wordList) {
            if (!wordMap.has(word))
                wordMap.set(word, 1);
            else {
                const count = wordMap.get(word);
                wordMap.set(word, count + 1);
            }
        }
    }
    console.log(Array.from(wordMap));

    const sortableTh = document.querySelector('th:nth-child(2)');
    if (!sortableTh) {
        console.error('Cannot find 2nd th');
        return;
    }

    const ascClass = 'sort--asc';
    const descClass = 'sort--desc';

    sortableTh.addEventListener('click', () => {
        if (sortableTh.classList.contains(ascClass)) {
            sortableTh.classList.remove(ascClass);
            sortableTh.classList.add(descClass);
        } else if (sortableTh.classList.contains(descClass)) {
            sortableTh.classList.remove(descClass);
        } else {
            sortableTh.classList.add(ascClass);
        }
    });

    // TODO sort by value into array ASC/DESC
    // TODO get colors from book for CSS
    // TODO display results in table w/ sorting feature ASC/DESC
    // TODO highlight high/med/lowest words used & maybe "Sam-I-Am" count
    // TODO consider tabs with different visualizations like heat map of words frequency or scatter plot graph
}
