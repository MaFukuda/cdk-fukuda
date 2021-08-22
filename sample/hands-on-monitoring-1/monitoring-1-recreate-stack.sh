#/bin/sh

set -e -u -o pipefail

sh ./monitoring-1-delete-stack.sh
sh ./monitoring-1-create-stack.sh