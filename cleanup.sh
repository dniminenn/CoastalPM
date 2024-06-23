#!/bin/bash

BASE_DIR="."

FILES_TO_DELETE=(
    "assets/sass"
    "image_handler.py"
    "cleanup.sh"
    "README.txt"
)

for file in "${FILES_TO_DELETE[@]}"; do
  FILE_PATH="$BASE_DIR/$file"
  if [ -e "$FILE_PATH" ]; then
    rm -rf "$FILE_PATH"
    echo "Deleted: $FILE_PATH"
  else
    echo "File not found: $FILE_PATH"
  fi
done
