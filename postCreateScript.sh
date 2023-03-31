#! /bin/bash

# install dependencies for Go vscode extension
go get github.com/go-delve/delve/cmd/dlv
go get -u github.com/mdempsky/gocode
go get golang.org/x/tools/cmd/goimports
go get -u golang.org/x/lint/golint
go get golang.org/x/tools/gopls
go mod tidy
