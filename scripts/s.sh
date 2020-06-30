#!/bin/sh
set -e

if [ -z "$1" ]; then
  echo "Please specify node name"
  exit 1
fi

IP="$(kubectl get node "$1" -o=jsonpath='{.status.addresses[?(@.type=="InternalIP")].address}')"
CONTEXT="$(kubectl config current-context)"
CONTEXT="$(echo "$CONTEXT" | sed 's/[^a-zA-Z0-9]/_/g')"

[ ! -f ~/.kube/ssh-config ] || . ~/.kube/ssh-config

CONTEXT_USERNAME="$(eval "echo \"\$${CONTEXT^^}_USERNAME\"")"
CONTEXT_SSH_OPTIONS="$(eval "echo \"\$${CONTEXT^^}_SSH_OPTIONS\"")"

if [ -n "$CONTEXT_SSH_OPTIONS" ]; then
  SSH_OPTIONS="$CONTEXT_SSH_OPTIONS"
fi
if [ -n "$CONTEXT_USERNAME" ]; then
  USERNAME="$CONTEXT_USERNAME"
fi
if [ -n "$USERNAME" ]; then
  SSH_OPTIONS="$SSH_OPTIONS -l $USERNAME"
fi

exec ssh $SSH_OPTIONS $IP "${@:2}"
