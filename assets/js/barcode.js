// 条形码生成器的脚本 

function generateBarcodes() {
    const input = document.getElementById('inputText').value;
    const resultDiv = document.getElementById('barcodeResult');
    resultDiv.innerHTML = '';

    // 分割输入文本（按换行或逗号）
    const items = input.split(/[\n,]+/).filter(item => item.trim());

    items.forEach((item, index) => {
        // 创建条码容器
        const barcodeContainer = document.createElement('div');
        barcodeContainer.className = 'barcode-item';
        
        const canvas = document.createElement('canvas');
        try {
            JsBarcode(canvas, item.trim(), {
                format: "CODE128",
                width: 2,
                height: 100,
                displayValue: true,
                margin: 10,
                background: "#f8f8f8",
                lineColor: "#000"
            });
            barcodeContainer.appendChild(canvas);
            resultDiv.appendChild(barcodeContainer);
        } catch (e) {
            console.error('条形码生成失败:', e);
        }
    });
}

function clearAll() {
    document.getElementById('inputText').value = '';
    document.getElementById('barcodeResult').innerHTML = '';
}

function copyToClipboard() {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById('inputText').value = text;
        })
        .catch(err => {
            console.error('读取剪贴板失败:', err);
        });
} 