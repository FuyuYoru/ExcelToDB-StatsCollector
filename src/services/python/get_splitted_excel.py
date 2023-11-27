import json

from file_preprocess import *
import sys


def analysis(data_path, sheet_name):
    # Загружается excel-лист по заданному пути и листу
    tmp = pd.read_excel(data_path, header=None, sheet_name=sheet_name)
    # Отрезается та часть датафрейма, в которой повторяется больше 5-ти пустых столбцов подряд
    check_cols = get_index_empty_columns(pd.read_excel(data_path, header=None, sheet_name=sheet_name))
    if check_cols is not None:
        tmp = tmp.iloc[:, :check_cols]
    # Задаётся новый, пустой датафрейм для перезаписи листа
    splited_dataframe = pd.DataFrame(columns=tmp.columns)
    # Создание датафрейма, с объединёнными ячейками как в оригинальном Excel-файле
    origViewDataframe = get_original_view(data_path, sheet_name).iloc[:, :tmp.shape[1]]
    row_index_header, similar_indexes = get_header_indexes(origViewDataframe)
    threshold = len(origViewDataframe['unique_class_values'].loc[row_index_header])
    tmp = tmp.fillna('None')
    similarity_length = 0
    for row in tmp.index:
        row_len = 0
        for value in tmp.loc[row].values:
            if value != 'None':
                row_len += 1
        if row_len >= 0.75 * threshold:
            found_similarity = any(
                all(preprocess_and_compare(a, b) for a, b in
                    zip(tmp.loc[row].values, tmp.loc[i].values)) for i in similar_indexes
            )
            if found_similarity:
                if similarity_length == 0:
                    splited_dataframe = splited_dataframe._append(
                        {splited_dataframe.columns[0]: f"<block>"}, ignore_index=True
                    )
                similarity_length += 1
                splited_dataframe = splited_dataframe._append(tmp.loc[row], ignore_index=True)
            else:
                splited_dataframe = splited_dataframe._append(tmp.loc[row], ignore_index=True)
                similarity_length = 0
    splited_dataframe = splited_dataframe._append({splited_dataframe.columns[0]: f"<block>"}, ignore_index=True)
    blocks_slice = get_blocks(splited_dataframe)
    splited_dataframe = splited_dataframe.to_json(orient='split', force_ascii=True)
    header_strings = arrayFilter(origViewDataframe.iloc[row_index_header, :-1].values.tolist())

    return splited_dataframe, blocks_slice, header_strings


path = r'C:\Users\vveli\OneDrive\Рабочий стол\TEST_KAYUM.xlsx'
sheetName = '111'
df, bs, head = analysis(path, sheetName)
print(df)
# result = {
#     'table': df,
#     'blocks': bs,
#     'header': head,
# }
# json_res = json.dumps(result)


# if __name__ == "__main__":
#     file_path = sys.argv[1]
#     sheetName = sys.argv[2]
#     jsonData, jsonBlocks, header = analysis(file_path, sheetName)
#     result = {
#         'table': jsonData,
#         'blocks': jsonBlocks,
#         'header': header,
#     }
#     json_result = json.dumps(result)
#     sys.stdout.write(json_result)
#     sys.stdout.flush()
