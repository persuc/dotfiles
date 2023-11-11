export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="half-life"

plugins=(git)

source $ZSH/oh-my-zsh.sh

. $HOME/.asdf/asdf.sh

. ~/.asdf/plugins/java/set-java-home.zsh

# User configuration

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='code'
fi

# Compilation flags
export PATH="/opt/homebrew/opt/llvm/bin:$PATH"
export PATH="/Library/Developer/CommandLineTools/usr/bin:$PATH"
export PATH="/opt/homebrew/opt/libarchive/bin:$PATH"
export LIBRARY_PATH="$LIBRARY_PATH:/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/lib"
export LDFLAGS="-L/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/lib -L/opt/homebrew/Cellar/openssl@3/3.1.1_1/lib -L/opt/homebrew/opt/libarchive/lib -F/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/"
export CPPFLAGS="-I/opt/homebrew/opt/libarchive/include" #  -I/usr/local/include/fuse
export OPENSSL_ROOT_DIR="/usr/bin/openssl"
export PKG_CONFIG_PATH="/opt/homebrew/opt/libarchive/lib/pkgconfig"
export CC=clang
export CXX=clang++

# Personal aliases
# For a full list of active aliases, run `alias`.

alias zshconfig="code ~/.zshrc"
alias tsm="transmission-remote"
alias src="source ~/.zshrc"
alias undate="find . -exec SetFile -md \"$(date +'%m/%d/%Y %H:%M:%S')\" '{}' \;"

function nano {
  echo "𐫰 Cruel laughter𐫰"
  say -v 'Jester' "ha ha ha ha ha"
}

function dir {
  echo "𐫰 A cold voice whispers𐫰 \"please stop\""
  say -v 'Whisper' "please stop"
}

PROMPT_EOL_MARK=''

test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"

