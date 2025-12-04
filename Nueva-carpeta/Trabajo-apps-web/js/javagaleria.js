const galeria = document.getElementById('galeria')
const cajas = document.querySelectorAll('.caja')
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const dotsContainer = document.getElementById('dots-container')

const content = ["A", "B", "C", "D"]
const images = [
    'https://asset.msi.com/resize/image/global/product/product_1610444727141cea66314ca97c59b99cdf7148e400.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    'https://media.ldlc.com/r1600/ld/products/00/05/97/33/LD0005973394.jpg',
    'https://www.info-computer.com/modules/dbblog/views/img/uploads/2020/06/intel-10-generacion-i5.jpg',
    'https://mexx-img-2019.s3.amazonaws.com/Memoria-Ram-DDR5-16Gb-4800Mhz-Kingston-Fury-Beast-Rgb_45957_2.jpeg'
]

let currentIndex = 0


cajas.forEach((caja)=> {
    const img = document.createElement('img')
    img.alt = 'Galeria image'
    img.draggable = false
    caja.appendChild(img)
})

images.forEach(() => {
    const dot = document.createElement('div')
    dot.classList.add('dot', 'inactive')
    dotsContainer.appendChild(dot)
})

function updateGaleria() {
    const prevIndex = (currentIndex -1 + content.length) % content.length
    const nextIndex = (currentIndex + 1) % content.length

    cajas.forEach((caja, index) =>{
        const img = caja.querySelector('img')
        if(index === 0) {
            //caja.textContent = content[prevIndex]
            img.src = images[prevIndex]
        } else if (index === 1) {
            //caja.textContent = content[currentIndex]
            img.src = images[currentIndex]
        } else if (index === 2) {
            //caja.textContent = content[nextIndex]
            img.src = images[nextIndex]
        }
    })

    const dots = document.querySelectorAll('.dot')
    dots.forEach((dot, index) => {
        if(index === currentIndex) {
            dot.classList.add('active')
            dot.classList.remove('inactive')
        } else {
            dot.classList.remove('active')
            dot.classList.add('inactive')
        }
    })
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + content.length) % content.length
    updateGaleria()
})

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % content.length
    updateGaleria()
})



updateGaleria()