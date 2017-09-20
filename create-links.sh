#!/usr/bin/env bash

NPM_PACKAGES=$(npm config get prefix)
NPM_CORE_PACKAGES_DIR="$NPM_PACKAGES/lib/node_modules/partgui-core-components-library"

PART_CORE_COMPONENTS_DIST_DIR="/Users/juha/Work/particl/partgui-core-components-library/dist"
PARTGUI_DEPENDENCY_DIR="/Users/juha/Work/particl/partgui-client/node_modules/partgui-core-components-library"

if [ ! -e $NPM_CORE_PACKAGES_DIR ]; then
  ln -s $PART_CORE_COMPONENTS_DIST_DIR $NPM_CORE_PACKAGES_DIR
  echo "created $NPM_CORE_PACKAGES_DIR."
  ls -al $NPM_CORE_PACKAGES_DIR
fi

if [ ! -e $PARTGUI_DEPENDENCY_DIR ]; then
  ln -s $NPM_CORE_PACKAGES_DIR $PARTGUI_DEPENDENCY_DIR
  echo "created $PARTGUI_DEPENDENCY_DIR."
  ls -al $PARTGUI_DEPENDENCY_DIR
fi

