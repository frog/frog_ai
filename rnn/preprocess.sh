#!/bin/bash
python scripts/preprocess.py --input_txt "$1" --output_h5 "$2" --output_json "$3"
