const { downloadImage } = require('../utils')

const exampleImageURL = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'

describe('downloadImage', () => {
  it('should download image properly to uploads folder when given a valid image URL', async () => {
    const { filename, image } = await downloadImage(exampleImageURL)

    expect(filename).toBeDefined()
    expect(image).toBeDefined()
    expect(typeof filename).toEqual('string')
    expect(image instanceof Buffer).toBeTruthy()
  })
})