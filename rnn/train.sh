#!/bin/bash
cd /home/frogny/Documents/torch-rnn

source scrape_env/bin/activate
python scrape.py
deactivate

source env/bin/activate
python scripts/preprocess.py
deactivate

DATE=`date +%Y-%m-%d`

if [ ! -d cv/$DATE ]
then mkdir cv/$DATE
fi

th train.lua -input_h5 data/input.h5 -input_json data/input.json -num_layers 3 -rnn_size 512 -dropout .25 -checkpoint_name "cv/$DATE/checkpoint"
