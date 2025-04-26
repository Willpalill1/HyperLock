document.getElementById('encrypt-btn').addEventListener('click', () => {
    const fileInput = document.getElementById('file-input');
    const password = document.getElementById('password').value;
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file first!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const code = event.target.result;
        const encryptedCode = xorEncrypt(code, password);

        const blob = new Blob([encryptedCode], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = file.name.replace('.py', '_encrypted.py');
        link.click();
    };
    reader.readAsText(file);
});

document.getElementById('drop-area').addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
});

document.getElementById('drop-area').addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
        document.getElementById('file-input').files = event.dataTransfer.files;
    }
});

function xorEncrypt(text, password) {
    const keys = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 255) + 1);
    let encrypted = [];
    for (let i = 0; i < text.length; i++) {
        let num = text.charCodeAt(i);
        keys.forEach(key => num ^= key);
        if (password) {
            for (let p of password) {
                num ^= p.charCodeAt(0);
            }
        }
        encrypted.push(num);
    }
    return encrypted.join(',');
}
