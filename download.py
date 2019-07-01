import urllib.request
import json
import os
import re

if not os.path.exists('data'):
    os.mkdir('data')
with open('data.json', 'r') as dataFile:
    data = json.load(dataFile)
    for nationality in data.keys():
        if not os.path.exists('data/' + nationality):
            os.mkdir('data/' + nationality)
        print('Nationality: ' + nationality)
        for url in data[nationality]:
            print(url)
            urllib.request.urlretrieve(
                url, 'data/' + nationality + '/' + re.sub(r'(.*)/', '', url))
