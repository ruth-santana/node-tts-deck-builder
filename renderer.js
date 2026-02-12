let uniqueCardCounter = 0
let cardList = []

const createCardElement = (src, id) => `<div class="cell" style="position: relative;" id="deck-card-${id}">
  <figure class="image">
    <img src="${src}" alt="" draggable="false" onClick="(function() { 
      const modalImg = document.getElementById('modal-card-image')
      const imgSrc = document.getElementById('card-image-preview')
      modalImg.classList.add('is-active')
      imgSrc.setAttribute('src', src)
    })()">
  </figure>
  <div class="tags has-addons card-close-icon" id="btn-remove-card-${id}">
    <a class="tag is-delete is-rounded"></a>
  </div>
</div>`

function deleteCardFromList(id) {
  return function() {
    document.getElementById(`deck-card-${id}`).remove()
    cardList = cardList.filter(card => card.id !== id)
  }
}

function addCardsToList(files = []) {
  for (const file of files) {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      uniqueCardCounter++
      cardListGrid.insertAdjacentHTML('beforeend', createCardElement(reader.result, uniqueCardCounter))
      const removeCardButton = document.getElementById(`btn-remove-card-${uniqueCardCounter}`)
      removeCardButton.onclick = deleteCardFromList(uniqueCardCounter)
      cardList.push({
        id: uniqueCardCounter,
        filePath: window.electronAPI.getFilePath(file),
      })
    }
  }
}

// Use webUtils.getPathForFile(file) to get the file paths from the cardList file array

const btn = document.getElementById('btn-export')

const setLoadingBtn = (loading) => {
  if (loading) {
    btn.classList.add('is-skeleton')
  } else {
    btn.classList.remove('is-skeleton')
  }
}

btn.addEventListener('click', async () => {
  const cards = cardList.map(card => card.filePath)
  setLoadingBtn(true)
  try {
    await window.electronAPI.createFile(cards)
  } catch (err) {
    console.log(err)
  } finally {
    setLoadingBtn(false)
  }
})

const modalImg = document.getElementById('modal-card-image')
const modalBg = document.getElementById('modal-card-bg')

modalBg.addEventListener('click', () => {
  modalImg.classList.remove('is-active')
})

const dropZone = document.getElementById('drop-zone')
const dragAndDropModal = document.getElementById('drag-and-drop-modal')
const cardListGrid = document.getElementById('card-list-grid')

let counter = 0

dropZone.addEventListener('dragenter', () => {
  counter++
  dragAndDropModal.classList.add('is-active')
})

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault()
  dragAndDropModal.classList.add('is-active')
})

dropZone.addEventListener('dragleave', () => {
  counter--
  console.log('dropped')
  if (!counter) {
    dragAndDropModal.classList.remove('is-active')
  }
})

dropZone.addEventListener('drop', (event) => {
  event.preventDefault()
  counter = 0
  dragAndDropModal.classList.remove('is-active')
  addCardsToList(event.dataTransfer.files)
})
