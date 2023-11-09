## Recommended Applications

In order of installation:

* [Firefox](https://www.mozilla.org/en-US/firefox/new/)
* [homebrew](https://brew.sh/)
* [asdf](https://asdf-vm.com/guide/getting-started.html)
* [iTerm](https://iterm2.com/) : `brew install --cask iterm2`
* [VSCode](https://code.visualstudio.com/docs/setup/mac) : `brew install --cask visual-studio-code`
* [Bitwarden](https://bitwarden.com/) : `brew install --cask bitwarden`

## UserChrome.js

Firefox script that automatically loads temporary addons. I mostly use it for running little JavaScript snippets to modify various websites that annoyed me at some point, but you can run any extension you like at startup. Just beware the risks, see [this repo](https://github.com/tsaost/autoload-temporary-addon) for more details

## Brew Formulae

To install one of my formulae, first tap this repository with the command:

`brew tap persuck/dotfiles git@github.com:persuck/dotfiles.git`

Then to install a package, for example `zeal`, run:

`brew install persuck/dotfiles/zeal --HEAD`

You may also want to create a symlink in `/Applications` with:

`ln -s /opt/homebrew/Cellar/zeal/*/Zeal.app /Applications/Zeal.app`

__Debugging Formulae__

You can run the following command to install any formula from a file, print verbose output, and also open an interactive shell inside the temporary build directory:

`HOMEBREW_NO_INSTALL_FROM_API=1 brew install --build-from-source --verbose --debug --HEAD /path/to/formula.rb`