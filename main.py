import os
from os import listdir
from pathlib import Path
# get the path/directory
folder_dir = "/home/noah/Documents/Projects/TFT/frontend/src/data/items"
for images in os.listdir(folder_dir):
 
    # check if the image ends with png
    if (images.endswith(".webp")):
        if 'Radiant' in images:
            originalname = '/home/noah/Documents/Projects/TFT/frontend/src/data/items/' + images
            print(originalname)
            abc = Path(images).stem.replace("Radiant", "" ) + 'Radiant'
            newname = '/home/noah/Documents/Projects/TFT/frontend/src/data/items/' + abc + '.webp'
            os.rename(originalname,newname)
            print(newname)
            print(abc)
        # name = Path(images).stem.replace("-", " " ).title()
        # name1 = 'TFT_Item_' + name.replace(" ", "" )
        
        # newname = '/home/noah/Documents/Projects/TFT/frontend/src/data/items/' + name1 + '.webp'
        
        # print(newname)