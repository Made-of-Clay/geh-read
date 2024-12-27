package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	text := readFile()
	lines := formatText(text)
	words := mapWordsFromLines(lines)
	showOutput(words)
}

func readFile() string {
	var fileName = "./GreenEggsAndHam.txt"
	fmt.Println("Reading " + fileName)
	data, err := os.ReadFile(fileName)
	if err != nil {
		panic(err)
	}
	return string(data)
}

func formatText(text string) []string {
	modified := strings.ToUpper(text)
	modified = strings.ReplaceAll(modified, "!", " ")
	modified = strings.ReplaceAll(modified, "?", " ")
	modified = strings.ReplaceAll(modified, ".", " ")
	modified = strings.ReplaceAll(modified, ",", " ")
	modified = strings.ReplaceAll(modified, "-", " ")
	modified = strings.ReplaceAll(modified, "(", " ")
	modified = strings.ReplaceAll(modified, ")", " ")
	modified = strings.ReplaceAll(modified, "  ", " ")
	modified = strings.ReplaceAll(modified, "\r", "")
	modifiedList := strings.Split(modified, "\n")[1:]

	maxListLength := len(modifiedList)
	newModifiedList := make([]string, 0, maxListLength)

	for _, v := range modifiedList {
		v = strings.TrimSpace(v)
		if v != "" {
			newModifiedList = append(newModifiedList, v)
		}
	}

	return newModifiedList
}

func getSpaceCount(value string) int {
	count := 0
	charToCount := " "
	for _, char := range value {
		if string(char) == charToCount {
			count++
		}
	}
	return count
}

func mapWordsFromLines(lines []string) map[string]int {
	words := make(map[string]int)
	for _, l := range lines {
		// split on space
		wordsInLine := strings.Split(l, " ")
		for _, w := range wordsInLine {
			words[w] += 1
		}
	}
	return words
}

func getLongestKeyCount(data map[string]int) int {
	longestCharCount := 0
	for k := range data {
		curKeyCount := len(k)
		if curKeyCount > longestCharCount {
			longestCharCount = curKeyCount
		}
	}
	return longestCharCount
}

func buildString(count int, char string) string {
	str := ""
	for i := 0; i < count; i++ {
		str += char
	}
	return str
}

func showOutput(data map[string]int) {
	longestKeyCount := getLongestKeyCount(data)
	fmt.Println("longestCharCount", longestKeyCount)

	row := func(val1 string, val2 int) {
		curWordCount := len(val1)
		spaceCharCount := longestKeyCount - curWordCount
		spaces := buildString(spaceCharCount, " ")
		// fmt.Println("spaces", spaces, "spaceCharCount", spaceCharCount)
		fmt.Printf("| %s | %d |\n", val1+spaces, val2)
	}
	// fmt.Println(data)
	dashCharCount := longestKeyCount - 4
	dashes := buildString(dashCharCount, "-")
	col1Spaces := buildString(4, " ")
	// TODO get digit count when inside loop
	// col2Spaces := buildString(7 - )
	fmt.Printf("| Word%s | Count |\n", col1Spaces)
	fmt.Printf("|------%s|-------|\n", dashes)
	// TODO loop and output rows
	row("foo", 1)
}
