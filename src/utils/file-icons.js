import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

const iconsList = {
    image: 'fa-file-image',
    pdf: 'fa-file-pdf',
    word: 'fa-file-word',
    powerpoint: 'fa-file-powerpoint',
    excel: 'fa-file-excel',
    audio: 'fa-file-audio',
    video: 'fa-file-video',
    zip: 'fa-file-archive',
    code: 'fa-file-code',
    text: 'fa-file-alt',
    file: 'fa-file'
}

const extensions = {
    gif: iconsList.image,
    jpeg: iconsList.image,
    jpg: iconsList.image,
    png: iconsList.image,

    pdf: iconsList.pdf,

    doc: iconsList.word,
    docx: iconsList.word,

    ppt: iconsList.powerpoint,
    pptx: iconsList.powerpoint,

    xls: iconsList.excel,
    xlsx: iconsList.excel,

    aac: iconsList.audio,
    mp3: iconsList.audio,
    ogg: iconsList.audio,

    avi: iconsList.video,
    flv: iconsList.video,
    mkv: iconsList.video,
    mp4: iconsList.video,

    gz: iconsList.zip,
    zip: iconsList.zip,

    css: iconsList.code,
    html: iconsList.code,
    js: iconsList.code,
    jsx: iconsList.code,
    sol: iconsList.code,

    txt: iconsList.text,

    file: iconsList.file
}

/**
 * @param {string} extension
 * @returns {string}
 */
export function getClassNameForExtension(extension) {
    return extensions[extension.toLowerCase()] || iconsList.file
}


/**
 * @param {string} extension
 * @returns {string}
 */
export function getExtensionForFilename(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * @param {string} extension
 * @returns {string}
 */
export function getClassNameForFilename(filename) {
    return getClassNameForExtension(getExtensionForFilename(filename))
}

export default getClassNameForFilename

const icons = [
    'faFileImage',
    'faFilePdf',
    'faFileWord',
    'faFilePowerpoint',
    'faFileExcel',
    'faFileAudio',
    'faFileVideo',
    'faFileArchive',
    'faFileCode',
    'faFileAlt',
    'faFile',
]

for (let icon of icons)
    fontawesome.library.add(solid[icon])