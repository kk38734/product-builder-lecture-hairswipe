
class HairstyleCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .card {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .card-content {
                    padding: 15px;
                }
                h3 {
                    margin: 0;
                    font-size: 1.2em;
                }
            </style>
            <div class="card">
                <img src="${this.getAttribute('image')}" alt="${this.getAttribute('name')}">
                <div class="card-content">
                    <h3>${this.getAttribute('name')}</h3>
                </div>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('hairstyle-card', HairstyleCard);

const hairstyles = [
    {
        name: 'Classic Bob',
        image: 'https://picsum.photos/300/200?random=1',
        faceShape: ['oval', 'heart', 'square'],
        hairType: ['straight', 'wavy'],
        hairLength: ['short'],
    },
    {
        name: 'Long Layers',
        image: 'https://picsum.photos/300/200?random=2',
        faceShape: ['oval', 'round', 'square'],
        hairType: ['straight', 'wavy', 'curly'],
        hairLength: ['long'],
    },
    {
        name: 'Pixie Cut',
        image: 'https://picsum.photos/300/200?random=3',
        faceShape: ['oval', 'heart'],
        hairType: ['straight', 'wavy'],
        hairLength: ['short'],
    },
    {
        name: 'Shag Haircut',
        image: 'https://picsum.photos/300/200?random=4',
        faceShape: ['oval', 'round', 'square'],
        hairType: ['wavy', 'curly'],
        hairLength: ['medium', 'long'],
    },
    {
        name: 'Wavy Lob',
        image: 'https://picsum.photos/300/200?random=5',
        faceShape: ['oval', 'round', 'heart'],
        hairType: ['wavy'],
        hairLength: ['medium'],
    },
    {
        name: 'Curly Afro',
        image: 'https://picsum.photos/300/200?random=6',
        faceShape: ['round', 'square', 'heart'],
        hairType: ['curly', 'coily'],
        hairLength: ['short', 'medium'],
    },
];

const form = document.getElementById('hairstyle-form');
const recommendationsContainer = document.getElementById('recommendations-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const faceShape = form['face-shape'].value;
    const hairType = form['hair-type'].value;
    const hairLength = form['hair-length'].value;

    const recommendedHairstyles = hairstyles.filter(hairstyle => {
        return hairstyle.faceShape.includes(faceShape) &&
               hairstyle.hairType.includes(hairType) &&
               hairstyle.hairLength.includes(hairLength);
    });

    recommendationsContainer.innerHTML = '';

    if (recommendedHairstyles.length === 0) {
        recommendationsContainer.innerHTML = '<p>No recommendations found for your selection. Try other options!</p>';
    } else {
        recommendedHairstyles.forEach(hairstyle => {
            const card = document.createElement('hairstyle-card');
            card.setAttribute('name', hairstyle.name);
            card.setAttribute('image', hairstyle.image);
            recommendationsContainer.appendChild(card);
        });
    }
});
