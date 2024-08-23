function fetchAndCompareJsonFiles() {
    const json1Url = document.getElementById('json1-url').value;
    const json2Url = document.getElementById('json2-url').value;

    fetchAndReadJson(json1Url, 'json1-output');
    fetchAndReadJson(json2Url, 'json2-output');
}

function fetchAndReadJson(url, outputElementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            return response.blob();
        })
        .then(blob => {
            const fileReader = new FileReader();
            fileReader.onload = function(event) {
                const jsonContent = event.target.result;
                document.getElementById(outputElementId).textContent = jsonContent.slice(0, 20);
            };
            fileReader.readAsText(blob);
        })
        .catch(error => {
            console.error('Error fetching and reading JSON:', error);
            document.getElementById(outputElementId).textContent = `Error: ${error.message}`;
        });
}
