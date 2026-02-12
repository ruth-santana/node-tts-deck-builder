const sharp = require("sharp");

async function buildImageAndSave(cards, path) {
    const composites = cards.map(async (card, index) => {
        const [width, height] = [407, 585]
        const dozens = Math.floor(index / 10)
        const line = (dozens * height) + (dozens * 3)
        const column = ((width * index) + ((index % 10) * 3)) - dozens * 4070
        return {
            input: await sharp(card)
                .resize(width, height)
                .toBuffer(),
            top: line,
            left: column
        }
    })

    await sharp({
        create: {
            width: 4096,
            height: 4096,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
    })
    .composite(await Promise.all(composites))
    .png()
    .toFile(path)
}

async function createFile(cards, folder) {
    const totalPages = Math.ceil(cards.length / 70)

    for (let page = 1; page <= totalPages; page++) {
        const cardsPage = cards.slice((page - 1) * 70, page * 70)
        await buildImageAndSave(cardsPage, `${folder}-${page}-${totalPages}.png`)
    }
}

module.exports = {
    createFile
}