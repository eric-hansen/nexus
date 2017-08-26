#!/bin/sh

FILE="swagger-codegen-cli.jar"
OUTPUT_DIR="./docs"

if [ ! -e "$FILE" ]; then
    echo -n "$FILE not found.  Downloading..."
    wget -q http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.2.3/swagger-codegen-cli-2.2.3.jar -O swagger-codegen-cli.jar
    echo "done."
fi

rm -rf "$OUTPUT_DIR/swagger.json"

java -jar "$FILE" generate -i "${PWD}/api/swagger/swagger.yaml" -l swagger -o "$OUTPUT_DIR"

cp docs/browser/dist/index.original docs/browser/dist/index.html

sed -i '/swagger-spec/{
    s/swagger-spec//g 
    r docs/swagger.json
    }' docs/browser/dist/index.html

if [ ! -e "docs/browser/index.html" ]; then
    ln -s docs/browser/dist/index.html docs/browser/index.html
fi

echo "View the docs at $PWD/docs/browser/index.html in your browser now."

exit 0