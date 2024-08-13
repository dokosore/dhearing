#!/bin/bash

# 結合するフォルダと出力ファイルを指定
input_folder="$1"
output_file="$2"

# 出力ファイルを初期化
> "$output_file"

# フォルダ内のすべてのファイルを処理
for file in "$input_folder"/*; do
  if [ -f "$file" ]; then
    # ファイルがテキストファイルかどうかをチェック
    if file "$file" | grep -q 'text'; then
      # テキストファイルの場合、ファイルのパスを出力ファイルに追加
      echo "File: $file" >> "$output_file"
      echo "--------------------" >> "$output_file"

      # ファイルの内容を出力ファイルに追加
      cat "$file" >> "$output_file"

      # ファイル間に区切り線を追加
      echo -e "\n\n" >> "$output_file"
    else
      # バイナリファイルの場合、無視して情報だけ記録
      echo "Binary file skipped: $file" >> "$output_file"
      echo "--------------------" >> "$output_file"
      echo -e "\n\n" >> "$output_file"
    fi
  fi
done

echo "All files have been combined into $output_file."
