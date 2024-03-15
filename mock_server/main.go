package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
    filename := fmt.Sprintf("%s", strings.Split(r.URL.Path, "/")[1] + ".json") 

    ex, err := os.Executable()
    if err != nil {
        panic(err)
    }
    exPath := filepath.Dir(ex)

    byte, err := os.ReadFile(filepath.Join(exPath, "../src/mocks", filename))
    if err != nil {
      fmt.Fprint(w, "{\"error\":\"No such file\"}")
      return
    }

    w.Header().Add("Content-Type", "application/json")
    w.Header().Add("Access-Control-Allow-Origin", "*")
    w.Write(byte)
}

func main() {
    http.HandleFunc("/", handler);    

    port := ":";
    if(len(os.Args) > 1) {
      port += os.Args[1] 
    } else {
      // default port
      port += "8080"
    }

    log.Fatal(http.ListenAndServe(port, nil))
}
