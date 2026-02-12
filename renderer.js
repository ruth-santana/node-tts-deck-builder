const btn = document.getElementById('butao')

const setLoadingBtn = (loading) => {
  if (loading) {
    btn.classList.add('is-skeleton')
  } else {
    btn.classList.remove('is-skeleton')
  }
}

btn.addEventListener('click', async () => {
  setLoadingBtn(true)
  try {
    await window.electronAPI.createFile()
  } catch (err) {
    console.log(err)
  } finally {
    setLoadingBtn(false)
  }
})

const btnModal = document.getElementById('btn-card-image')
const modalImg = document.getElementById('modal-card-image')
const modalBg = document.getElementById('modal-card-bg')

btnModal.addEventListener('click', () => {
  modalImg.classList.add('is-active')
})

modalBg.addEventListener('click', () => {
  modalImg.classList.remove('is-active')
})

const deckListContainer = document.getElementById('deck-list-container')
const dragAndDropModal = document.getElementById('drag-and-drop-modal')

deckListContainer.addEventListener('dragenter', () => {
  dragAndDropModal.classList.add('is-active')
})

deckListContainer.addEventListener('dragover', () => {
  dragAndDropModal.classList.add('is-active')
})

deckListContainer.addEventListener('dragleave', () => {
  dragAndDropModal.classList.remove('is-active')
})

deckListContainer.addEventListener('drop', () => {
  dragAndDropModal.classList.remove('is-active')
})
