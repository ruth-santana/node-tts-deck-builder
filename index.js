// Width and height should be calculated automatically. 
// If you insert 10 cards it should be 10x1, if you insert 70 it should be 10x7. 
// If you insert 160 cards, it should be 10x7 (1), 10x7 (2), 10x2 (3).
// The last card must be the hidden card

const fs = require('fs')
const sharp = require("sharp");
const args = require('minimist')(process.argv.slice(2));

const deckFromPath = args.deck ?? './deck-template.json'
const deck = require(deckFromPath)

// Use toBuffer later to save image in a user chosen folder or documents
// function getDocumentsFolder() {
//     return path.join(os.homedir(), 'Documents')
// }

async function createFile() {
    const targetPath = `generated/${deck.name}.png`

    const composites = deck.cards.map(async (card, index) => {
        const [width, height] = [407, 585]
        return {
            input: await sharp(card)
                .resize(width, height)
                .toBuffer(),
            top: 0,
            left: (width * index) + (index * 3)
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

    console.log('file created at ', targetPath)
}

createFile()