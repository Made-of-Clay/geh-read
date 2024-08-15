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
    // console.log(lines)
    // [ word, count ]
    const wordMap = new Map(); // so I don't keep mutating the underlying object "model"

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
    // TODO sort by value into array ASC/DESC
    // TODO get colors from book for CSS
    // TODO display results in table w/ sorting feature ASC/DESC
    // TODO highlight high/med/lowest words used & maybe "Sam-I-Am" count
    // TODO consider tabs with different visualizations like heat map of words frequency or scatter plot graph
}
