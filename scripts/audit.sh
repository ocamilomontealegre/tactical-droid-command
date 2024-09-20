#!/bin/bash

show_help() {
    echo "Uso: ./audit.sh [opción] [ID] [DATA]"
    echo ""
    echo "Opciones:"
    echo "  list                Listar todas las interacciones"
    echo "  detail [ID]         Mostrar detalle de una interacción específica"
    echo "  delete [ID]         Eliminar una interacción específica"
    echo "  create [DATA]       Crear una nueva interacción"
    echo ""
    echo "Ejemplos:"
    echo "  ./audit.sh list"
    echo "  ./audit.sh detail 614d1f78b28f4a5a5c9e9d5a"
    echo "  ./audit.sh delete 614d1f78b28f4a5a5c9e9d5a"
    echo "  ./audit.sh create '{\"protocols\":[\"avoid-mech\"],\"scan\":[{\"coordinates\":{\"x\":0,\"y\":40},\"enemies\":{\"type\":\"soldier\",\"number\":10}}]}'"
}

if [ -z "$1" ]; then
    echo "Error: Se requiere una opción."
    show_help
    exit 1
fi

if [ "$1" == "list" ]; then
    curl -X GET http://localhost:8888/audit
    exit 0
fi

if [ "$1" == "detail" ] || [ "$1" == "delete" ]; then
    if [ -z "$2" ]; then
        echo "Error: Se requiere un ID para la opción '$1'."
        show_help
        exit 1
    fi
fi

if [ "$1" == "detail" ]; then
    curl -X GET http://localhost:8888/audit/$2
    exit 0
fi

if [ "$1" == "delete" ]; then
    curl -X DELETE http://localhost:8888/audit/$2
    exit 0
fi

if [ "$1" == "create" ]; then
    if [ -z "$2" ]; then
        echo "Error: Se requiere un cuerpo de datos en formato JSON para la opción 'create'."
        show_help
        exit 1
    fi
    curl -X POST http://localhost:8888/radar -H "Content-Type: application/json" -d "$2"
    exit 0
fi

echo "Error: Opción no reconocida."
show_help
exit 1
