import './style.css'

document.querySelector('#app').innerHTML = `
<div>
    <h1>Green Eggs & Ham Counter</h1>
    <p id="output"></p>
</div>
`
const textOutput = document.querySelector('#output');

fetch('./GreenEggsAndHam.txt')
    .then(function (response) {
        return response.text();
    })
    .then(function (data) {
        const wordCounts = processData(data);
        textOutput.innerHTML = formatWordCounts(wordCounts);
    })
    .catch(function (error) {
        console.log(error);
    });

function processData(data) {
    const noPunctuation = data.replace(/[^\w\s-]|_/g, "");   // Everything but hyphens
    const noCommas = noPunctuation.replace(/[,|-]/g, ' ');   // Replace commas and hyphens with spaces
    const noLineBreaks = noCommas.replace(/[\r\n]+/gm, " "); // Remove linebreaks
    const dataSplit = noLineBreaks.split(' ');

    let sortedWords = {};
    dataSplit.forEach(word => {
        word = word.toLowerCase();
        sortedWords[word] ? sortedWords[word] += 1 : sortedWords[word] = 1;
    })
    return sortedWords;
}

function formatWordCounts(wordCounts) {
    let output = '<ul></ul>';
    let totalWordCount = 0;
    for (const [ word, count ] of Object.entries(wordCounts)) {
        output += `<li>${word}: ${count}</li>`;
        totalWordCount++;
    }
    output += `Total word count: ${totalWordCount}`;
    return output;
}
