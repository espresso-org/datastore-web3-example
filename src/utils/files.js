export function downloadFile(file: ArrayBuffer, filename: string) {
    var blob = new Blob([file], { type: "application/pdf" })

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob)
        return
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob)
    var link = document.createElement('a')
    link.href = data
    link.download = filename
    link.click()

    // For Firefox it is necessary to delay revoking the ObjectURL
    setTimeout(() => window.URL.revokeObjectURL(data), 100)

}


export function convertFileToArrayBuffer(file) {
    return new Promise((res, rej) => {

        let reader = new FileReader()

        reader.onload = function (e) {
            res(reader.result)
        }

        reader.readAsArrayBuffer(file)
    })
}