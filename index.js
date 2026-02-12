// Width and height should be calculated automatically. 
// If you insert 10 cards it should be 10x1, if you insert 70 it should be 10x7. 
// If you insert 160 cards, it should be 10x7 (1), 10x7 (2), 10x2 (3).
// The last card must be the hidden card

const sharp = require("sharp");

async function createFile(cards, folder) {
    const targetPath = `${folder}/deck.png`

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
    .toFile(targetPath)
}

module.exports = {
    createFile
}