const path = require('path')
const uuid = require('uuid/v4')
const { promises: fsPromises, constants: fsConstants } = require('fs')
const download = require('image-downloader')

async function downloadImage(url) {
  const folderPath = path.resolve(__dirname, 'uploads')
  try {
    await fsPromises.access(folderPath, fsConstants.R_OK | fsConstants.W_OK)
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fsPromises.mkdir(folderPath)
    } else {
      console.error(e)
    }
  }

  try {
    const fileType = url.split('.').pop()
    const generatedFileName = uuid()
    const { filename, image } = await download.image({
      url,
      dest: path.resolve(__dirname, 'uploads', `${generatedFileName}.${fileType}`)
    })

    return {
      filename, image
    }
  } catch (e) {
    console.error(e)
  }
}

async function downloadAndResizeImage(url, cacheLocation, staticLocation) {
  return
}

module.exports = {
  downloadImage,
  downloadAndResizeImage
}