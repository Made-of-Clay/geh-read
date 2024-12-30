package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
)

func TryCli() {
	fmt.Println("TryCli() line 1")
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		fmt.Println("running anon func")
		<-c
		fmt.Println("\nExiting...")
		os.Exit(0)
	}()

}
