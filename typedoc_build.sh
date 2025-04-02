#!/bin/bash

CORE_DIR=$(dirname "$0")

rm -f -R $CORE_DIR/docs-json

yarn typedoc \
    --json $CORE_DIR/docs-json/core.json \
    --options $CORE_DIR/typedoc.json \
    --searchInComments \
    --validation.invalidLink false

yarn typedoc \
    --gitRemote github.com/pocketminers/core.git \
    --gitRevision main \
    --searchInComments \
    --plugin typedoc-plugin-inline-sources \
    --cleanOutputDir \
    --out $CORE_DIR/docs \
    --entryPointStrategy merge "$CORE_DIR/docs-json/*.json"

# echo docs.pocketminers.xyz > docs/CNAME

rm -f -R $CORE_DIR/docs-json