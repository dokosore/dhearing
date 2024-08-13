# Makefile

# デフォルトの入力フォルダと出力ファイル
INPUT_FOLDER := ./src/app
OUTPUT_FILE := ./meta/all_files.txt

# Bashスクリプトの名前
SCRIPT_NAME := combine_files.sh

# allターゲット（デフォルトターゲット）
all: combine

# スクリプトの実行
combine: $(SCRIPT_NAME)
	@sh $(SCRIPT_NAME) $(INPUT_FOLDER) $(OUTPUT_FILE)
	@echo "Files combined into $(OUTPUT_FILE)"

# スクリプトファイルが存在するか確認
$(SCRIPT_NAME):
	@echo "Error: $(SCRIPT_NAME) script not found."
	@exit 1

# cleanターゲット（クリーンアップ）
clean:
	@rm -f $(OUTPUT_FILE)
	@echo "Cleaned up $(OUTPUT_FILE)"

.PHONY: all combine clean
