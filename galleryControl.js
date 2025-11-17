async function loadGallery () {
  try {
    // Load JSON data
    const response = await fetch('turing_award.json')
    const data = await response.json()

    // Shuffle the data randomly
    const shuffled = data.sort(() => 0.5 - Math.random())

    // Select only 9 random winners
    const selected = shuffled.slice(0, 9)

    // Fill gallery slots
    selected.forEach((winner, index) => {
      const div = document.getElementById(`gallery-pic-${index + 1}`)
      div.innerHTML = `
          <a href="https://www.google.com/search?q=${winner.Photo} turing award" target="_blank">
            <img src="${winner.Photo}" alt="${winner.Name}">
          </a>
        `
    })
  } catch (err) {
    console.error('Error loading gallery:', err)
  }
}

setInterval(() => {
    loadGallery();
}, 2500);
