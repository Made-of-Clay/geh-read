fetch('./GreenEggsAndHam.txt')
    .then(response => response.text())
    .then(handleText)
    .catch(console.error);

/** @param {String} content */
function handleText(content) {
    const lines = content
        .toUpperCase()
        .replaceAll('!', ' ')
        .replaceAll('?', ' ')
        .replaceAll('.', ' ')
        .replaceAll('-', ' ')
        .replaceAll('(', ' ')
        .replaceAll(')', ' ')
        .replaceAll('\r', '')
        .replaceAll(',', '\n')
        .split('\n')
        .slice(1)
        .filter(Boolean)
        .map(line => line.trim());

    /** @type {Map<string, number>} wordMap */
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
    /** @type {number} order -1 = desc, 0 = none, 1 = asc */
    let order = 0;
    const orderNext = {
        // current order: next order
        '0': 1,
        '1': -1,
        '-1': 0,
    }

    renderRows();

    sortableTh.addEventListener('click', () => {
        order = orderNext[order];
        handleSortClass();
        renderRows();
    });

    function handleSortClass() {
        // Clean start
        sortableTh.classList.contains(ascClass)
            && sortableTh.classList.remove(ascClass);
        sortableTh.classList.contains(descClass)
            && sortableTh.classList.remove(descClass);

        if (order === 1)
            sortableTh.classList.add(ascClass);
        if (order === -1)
            sortableTh.classList.add(descClass);
    }

    function renderRows() {
        /** @type {[string, number][]} wordMap */
        let wordList = Array.from(wordMap);
        if (order) {
            // I need to handle this sort much better; JS sort sucks when DESC for some reason
            wordList = wordList.sort((a, b) => a[1] - b[1]);
            if (order === -1)
                wordList = wordList.reverse();
        }

        let rows = '';
        for (const [word, count] of wordList) {
            rows += `<tr><td>${word}</td><td>${count}</td></tr>`;
        }

        document.querySelector('tbody').innerHTML = rows;
    }
    // TODO highlight high/med/lowest words used & maybe "Sam-I-Am" count
    // TODO consider tabs with different visualizations like heat map of words frequency or scatter plot graph
}
