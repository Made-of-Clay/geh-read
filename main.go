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

func showOutput(data map[string]int) {
	// row := func(val1 string, val2 int) {}
	fmt.Println(data)
	fmt.Println("| Word | Count |")
	fmt.Println("|------|-------|")
}
