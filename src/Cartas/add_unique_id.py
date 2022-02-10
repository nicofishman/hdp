# Add unique id to each entry of a json file

import json
from pprint import pprint as print 

f = open('D:\DOCUments D\Proyectos-programacion\React\hdp\src\Cartas\english.json')

data = json.load(f)
# print(data)
idx = 1
for entry in data:
    for card in data[entry]:
        card['id'] = idx
        idx += 1

newFile = open('D:\DOCUments D\Proyectos-programacion\React\hdp\src\Cartas\cartas_en.json', 'w')
newFile.write(json.dumps(data, indent=4))