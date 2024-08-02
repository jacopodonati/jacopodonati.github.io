#!/bin/zsh

# Definizione delle cartelle
TEMPLATE_DIR="./template"
SRC_DIR="./src"
HTML_DIR="./public"
PARTIAL_DIR="$TEMPLATE_DIR/parziali"
STATIC_DIR="./static"

# Funzione per pulire la cartella HTML
clean_html_dir() {
    if [[ -d "$HTML_DIR" ]]; then
        echo "Pulizia della cartella $HTML_DIR..."
        rm -rf "$HTML_DIR"/*
    fi
    mkdir -p "$HTML_DIR"
}

# Funzione per copiare i file statici
copy_static_files() {
    if [[ -d "$STATIC_DIR" ]]; then
        echo "Copia dei file statici..."
        cp -R "$STATIC_DIR"/* "$HTML_DIR"
    else
        echo "La cartella $STATIC_DIR non esiste. Nessun file statico da copiare."
    fi
}

# Verifica che le cartelle esistano
for dir in $TEMPLATE_DIR $SRC_DIR $HTML_DIR $PARTIAL_DIR; do
    if [[ ! -d "$dir" ]]; then
        echo "La cartella $dir non esiste. Creazione in corso..."
        mkdir -p "$dir"
    fi
done

# Funzione per estrarre il nome del template dal file sorgente
get_template_name() {
    local src_file="$1"
    local template_name=$(sed -n 's/.*<!-- template: \(.*\) -->.*/\1/p' "$src_file")
    echo "${template_name:-default.html}"  # Se non trovato, usa default.html
}

# Funzione per estrarre i valori delle variabili dal file sorgente
get_variables() {
    local src_file="$1"
    sed -n 's/^<!-- \(.*\): \(.*\) -->$/\1="\2"/p' "$src_file"
}

# Funzione per sostituire le variabili nel template
replace_variables() {
    local content="$1"
    local vars="$2"
    
    local temp_file=$(mktemp)
    echo "$vars" > "$temp_file"
    source "$temp_file"
    rm "$temp_file"
    
    local result="$content"
    for var in ${(f)vars}; do
        local name="${var%%=*}"
        local value="${(P)name}"
        local marker=$'\xC2\xA0'"$name"$'\xC2\xA0'
        result=${result//$marker/$value}
    done
    
    echo "$result"
}

# Funzione per processare i template parziali
process_partials() {
    local content="$1"
    local result="$content"
    
    local partial_markers=($(echo "$content" | grep -o $'\xC2\xA0[^[:space:]]*\.html\xC2\xA0'))
    
    for marker in $partial_markers; do
        local partial_file="$PARTIAL_DIR/${marker//[[:space:]]}"
        if [[ -f "$partial_file" ]]; then
            local partial_content=$(cat "$partial_file")
            result=${result//$marker/$partial_content}
        else
            echo "File parziale non trovato: $partial_file"
        fi
    done
    
    echo "$result"
}

# Funzione per processare un singolo file
process_file() {
    local src_file="$1"
    local template_name=$(get_template_name "$src_file")
    local template_file="$TEMPLATE_DIR/$template_name"
    local rel_path=${src_file#$SRC_DIR/}
    local output_file="$HTML_DIR/${rel_path%.*}.html"
    
    if [[ ! -f "$template_file" ]]; then
        echo "Template $template_file non trovato per $src_file. Saltando..."
        return
    fi

    mkdir -p "$(dirname "$output_file")"

    local template=$(cat "$template_file")
    local content=$(cat "$src_file")
    
    template=$(process_partials "$template")
    
    local vars=$(get_variables "$src_file")
    local result=$(replace_variables "$template" "$vars")
    
    local marker=$'\xC2\xA0contenuto\xC2\xA0'
    result=${result//$marker/$content}

    echo "$result" > "$output_file"
    echo "File generato: $output_file"
}

# Pulisci la cartella HTML prima di iniziare
clean_html_dir

# Copia i file statici
copy_static_files

# Processa tutti i file nella cartella src e nelle sottocartelle
find "$SRC_DIR" -type f | while read src_file; do
    process_file "$src_file"
done

echo "Generazione completata."