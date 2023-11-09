
## Brew Formulae

First tap this repository with the command:

`brew tap persuck/dotfiles git@github.com:persuck/dotfiles.git`

Then to install a package, for example `zeal`, run:

`brew install persuck/dotfiles/zeal --HEAD`

__Debugging__

You can clone this repo, and then run the following command to install a formula from a file, and print verbose output and also open an interactive shell inside the temporary build directory

`HOMEBREW_NO_INSTALL_FROM_API=1 brew install --build-from-source --verbose --debug --HEAD /path/to/formula.rb`