require('dotenv').config()
const path = require('path')
const { downloadImage } = require('../utils')
const exampleImageURL = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'

const { CACHE_NAME } = process.env
const CACHE_LOCATION = path.resolve(__dirname, CACHE_NAME)

describe('downloadImage', () => {
  it('should download image properly to a given local cache folder (create if not exists) when a valid image URL is given', async () => {
    const { filename, image } = await downloadImage(exampleImageURL, CACHE_LOCATION)
    const locationMatch = new RegExp(`${CACHE_LOCATION}\/.+`)

    const downloadLocationMatches = locationMatch.test(filename)
    expect(filename).toBeDefined()
    expect(image).toBeDefined()
    expect(typeof filename).toEqual('string')
    expect(downloadLocationMatches).toBeTruthy()
    expect(image instanceof Buffer).toBeTruthy()
  })
})
