#!/bin/bash

# Inspired by https://github.com/devillex/wercker-ionic-login-step/blob/master/run.sh
cli="ionic"

main() {

  if [ -z "$IONIC_EMAIL" ]; then
    fail "ionic-login: email argument cannot be empty"
  fi

	if [ -z "$IONIC_PASSWORD" ]; then
    fail "ionic-login: password argument cannot be empty"
  fi

	# Command
  cmd="login"

  eval "$cli" "$cmd"
}

main;
