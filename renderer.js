const btn = document.getElementById('butao')

const setLoadingBtn = (loading) => {
  btn.disabled = loading
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
