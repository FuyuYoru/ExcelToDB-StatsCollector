import os
import sys
import pandas as pd
import json

# .encode('utf8').decode('cp1251')
def get_excel_sheet_names(file_path):
    xls = pd.ExcelFile(file_path)
    sheet_names = xls.sheet_names
    xls.close()
    for num,value in enumerate(sheet_names):
      sheet_names[num] = value.encode('utf8').decode('cp1251')
    return {
        'sheetName': sheet_names,
        'filename': os.path.basename(file_path.encode('utf8').decode('cp1251')),
    }


if __name__ == "__main__":
    file_path = sys.argv[1]
    result = get_excel_sheet_names(file_path)
    json_result = json.dumps(result, ensure_ascii=False)
    sys.stdout.write(json_result)
    sys.stdout.flush()
    sys.exit(0)
