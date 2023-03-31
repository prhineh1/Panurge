#! /bin/bash

# install dependencies for Go vscode extension
go get github.com/go-delve/delve/cmd/dlv
go get -u github.com/mdempsky/gocode
go get golang.org/x/tools/cmd/goimports
go get -u golang.org/x/lint/golint
go get golang.org/x/tools/gopls
go install -v github.com/ramya-rao-a/go-outline@v0.0.0-20210608161538-9736a4bde949
go install -v golang.org/x/tools/gopls@latest
go mod tidy
