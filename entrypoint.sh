#!/bin/sh

# This script is used to build the core package for the project.
# It sets up the environment, installs dependencies, and runs the build process.

# Check that the script is being run in the correct directory
if [ ! -d "/usr/app/core" ]; then
  echo "❌ This script must be run from the root of the project."
  exit 1
fi

# Check that the source directory exists
if [ ! -d "/usr/app/core/src" ]; then
  echo "❌ Source directory does not exist."
  exit 1
fi

# Check that the node_modules directory exists
if [ ! -d "/usr/app/core/node_modules" ]; then
  echo "📦 node_modules directory does not exist. Installing dependencies..."
  yarn install
fi

# Lint the code
echo "🔍 Linting the code..."
yarn lint
if [ $? -ne 0 ]; then
  echo "⚠️ Linting failed. Make note of the errors. Continuing...."
fi

##########################################################################################
# TODO: Uncomment the following lines to run tests, needs fixing, throwing this error:   #
# SyntaxError: Unexpected identifier 'assert'                                            #
#    at compileSourceTextModule (node:internal/modules/esm/utils:344:16)                 #
##########################################################################################

# Run the tests
echo "🧪 Running tests..."
yarn test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Make note of the errors. Continuing...."
fi

# Ensure the script is running in a Production environment
if [ "$NODE_ENV" != "production" ]; then
  echo "🌍 NODE_ENV is not set to production. Setting it to production..."
  export NODE_ENV=production
fi

# Build the project
echo "🏗️ Building the project..."
yarn build:no-docs

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please fix the errors and try again."
  exit 1
fi

# Check that the build directory exists
if [ ! -d "/usr/app/core/dist" ]; then
  echo "❌ Distribute directory does not exist. Build failed."
  exit 1
fi

# Check that the build was successful
if [ -z "$(ls -A /usr/app/core/dist)" ]; then
  echo "❌ Build directory is empty. Build failed."
  exit 1
fi

echo "✅ Build completed successfully."

exec "$@"
