'use strict';

// Local recommendation data keeps the project usable on GitHub Pages and offline.
// The matching travel_recommendation_api.json is included for inspection.
const recommendations = [
  { id:'bora-bora', category:'beaches', name:'Matira Beach', location:'Bora Bora, French Polynesia', country:'French Polynesia', description:'Powder-soft sand and translucent lagoon waters make this iconic island beach a peaceful tropical escape.', tip:'Visit around sunset for calm light and unforgettable lagoon views.', photo:'photo-1507525428034-b723cf961d3e', fallback:'assets/beach-one.svg', keywords:['beach','island','lagoon','bora bora','polynesia'] },
  { id:'bondi', category:'beaches', name:'Bondi Beach', location:'Sydney, Australia', country:'Australia', description:'A lively stretch of golden sand with ocean pools, coastal walks, and Australia’s unmistakable surf culture.', tip:'Walk the coastal path towards Coogee for dramatic seaside scenery.', photo:'photo-1519046904884-53103b34b206', fallback:'assets/beach-two.svg', keywords:['beach','bondi','sydney','australia','coast'] },
  { id:'nusa-penida', category:'beaches', name:'Kelingking Beach', location:'Nusa Penida, Indonesia', country:'Indonesia', description:'A dramatic cliffside viewpoint overlooking a secluded cove and vivid turquoise water.', tip:'Take care on steep paths and follow local safety guidance.', photo:'photo-1537996194471-e657df975ab4', fallback:'assets/beach-one.svg', keywords:['beach','indonesia','bali','nusa penida','coast'] },
  { id:'copacabana', category:'beaches', name:'Copacabana Beach', location:'Rio de Janeiro, Brazil', country:'Brazil', description:'A world-famous city beach framed by green mountains, vibrant cafés, and sweeping views of the Atlantic.', tip:'Explore the promenade during daylight for its mosaic pavement.', photo:'photo-1500534623283-312aade485b7', fallback:'assets/beach-two.svg', keywords:['beach','brazil','rio','copacabana'] },
  { id:'fushimi', category:'temples', name:'Fushimi Inari Shrine', location:'Kyoto, Japan', country:'Japan', description:'Follow pathways lined with thousands of bright vermilion torii gates climbing the forested slopes of Mount Inari.', tip:'Start early for quieter paths and atmospheric morning light.', photo:'photo-1493976040374-85c8e12f0c0e', fallback:'assets/temple-one.svg', keywords:['temple','shrine','kyoto','japan','fushimi','torii'] },
  { id:'angkor', category:'temples', name:'Angkor Wat', location:'Siem Reap, Cambodia', country:'Cambodia', description:'Explore one of the world’s great temple complexes, famous for intricate Khmer stonework and reflecting pools.', tip:'Dress respectfully and arrive early to experience the sunrise.', photo:'photo-1528181304800-259b08848526', fallback:'assets/temple-two.svg', keywords:['temple','cambodia','angkor','siem reap','heritage'] },
  { id:'ulun', category:'temples', name:'Ulun Danu Beratan Temple', location:'Bali, Indonesia', country:'Indonesia', description:'A photogenic Balinese water temple set against misty highland mountains beside Lake Beratan.', tip:'Cloudy mornings bring an especially peaceful atmosphere.', photo:'photo-1537996194471-e657df975ab4', fallback:'assets/temple-one.svg', keywords:['temple','bali','indonesia','ulun danu'] },
  { id:'sensō', category:'temples', name:'Sensō-ji Temple', location:'Tokyo, Japan', country:'Japan', description:'Tokyo’s oldest temple, where a colorful five-story pagoda rises beside historic shopping streets.', tip:'Visit the surrounding Asakusa neighborhood for traditional snacks.', photo:'photo-1542051841857-5f90071e7989', fallback:'assets/temple-two.svg', keywords:['temple','japan','tokyo','asakusa'] },
  { id:'japan', category:'countries', name:'Japan', location:'East Asia', country:'Japan', description:'Experience an inspiring contrast of quiet gardens, vibrant cities, historic shrines, and exceptional cuisine.', tip:'Combine Kyoto’s temples with Tokyo’s modern neighborhoods.', photo:'photo-1493976040374-85c8e12f0c0e', fallback:'assets/country-one.svg', keywords:['country','countries','japan','asia','tokyo','kyoto'] },
  { id:'italy', category:'countries', name:'Italy', location:'Southern Europe', country:'Italy', description:'Discover artistic cities, incredible food, scenic coastlines, and centuries of history across its regions.', tip:'Pair Rome or Florence with a few days along the coast.', photo:'photo-1533105079780-92b9be482077', fallback:'assets/country-two.svg', keywords:['country','countries','italy','europe','rome','venice'] },
  { id:'australia', category:'countries', name:'Australia', location:'Oceania', country:'Australia', description:'From coral reefs and dramatic desert landscapes to welcoming coastal cities, Australia has adventures for everyone.', tip:'Plan distances carefully — the country is much bigger than it looks.', photo:'photo-1500534623283-312aade485b7', fallback:'assets/country-one.svg', keywords:['country','countries','australia','sydney','oceania'] },
  { id:'brazil', category:'countries', name:'Brazil', location:'South America', country:'Brazil', description:'Feel the energy of vibrant cities, lush rainforests, and extraordinary beaches across a diverse country.', tip:'Leave time for both local culture and outdoor exploration.', photo:'photo-1483729558449-99ef09a8c325', fallback:'assets/country-two.svg', keywords:['country','countries','brazil','rio','south america'] }
];

function normalize(value) {
  return value.trim().toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
}

function searchDestinations(query) {
  const term = normalize(query);
  if (!term) return [];
  const categories = {
    beach: 'beaches', beaches: 'beaches', shore: 'beaches', shores: 'beaches',
    temple: 'temples', temples: 'temples', shrine: 'temples', shrines: 'temples',
    country: 'countries', countries: 'countries', nation: 'countries', nations: 'countries'
  };
  if (categories[term]) return recommendations.filter(item => item.category === categories[term]);
  return recommendations.filter(item => {
    const haystack = [item.name, item.location, item.country, item.category, ...item.keywords].join(' ');
    return normalize(haystack).includes(term);
  });
}

const searchForm = document.getElementById('search-form');
const resultsSection = document.getElementById('results');
const resultsGrid = document.getElementById('search-results');
const resultsDescription = document.getElementById('results-description');
const searchInput = document.getElementById('destination-search');

function renderResults(query) {
  if (!resultsSection || !resultsGrid) return;
  const matches = searchDestinations(query);
  resultsGrid.replaceChildren();
  resultsSection.hidden = false;
  resultsDescription.textContent = matches.length === 1
    ? `1 destination found for “${query.trim()}”.`
    : `${matches.length} destinations found for “${query.trim()}”.`;

  for (const place of matches) {
    const card = document.createElement('article');
    card.className = 'result-card';
    const media = document.createElement('div');
    media.className = 'result-media';
    const img = document.createElement('img');
    img.alt = `Travel recommendation image of ${place.name}, ${place.location}`;
    img.loading = 'lazy';
    img.src = `https://images.unsplash.com/${place.photo}?auto=format&fit=crop&w=1000&q=80`;
    img.addEventListener('error', () => { if (!img.src.endsWith(place.fallback)) img.src = place.fallback; }, { once: true });
    const type = document.createElement('span');
    type.className = 'result-type';
    type.textContent = place.category;
    media.append(img, type);

    const body = document.createElement('div');
    body.className = 'result-content';
    const location = document.createElement('span');
    location.className = 'result-location';
    location.textContent = `↗ ${place.location}`;
    const title = document.createElement('h3');
    title.textContent = place.name;
    const description = document.createElement('p');
    description.textContent = place.description;
    const tip = document.createElement('div');
    tip.className = 'result-tips';
    tip.textContent = `✦ Travel tip: ${place.tip}`;
    body.append(location, title, description, tip);
    card.append(media, body);
    resultsGrid.append(card);
  }

  if (!matches.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-results';
    const title = document.createElement('h3');
    title.textContent = 'No destinations found — yet.';
    const p = document.createElement('p');
    p.textContent = 'Try “beach”, “temple”, “country”, “Japan”, or “Australia”.';
    empty.append(title, p);
    resultsGrid.append(empty);
  }
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (searchForm) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) { searchInput.focus(); return; }
    renderResults(query);
  });
  document.getElementById('clear-search').addEventListener('click', () => {
    searchInput.value = '';
    resultsGrid.replaceChildren();
    resultsSection.hidden = true;
    searchInput.focus();
  });
  document.getElementById('close-results').addEventListener('click', () => {
    resultsGrid.replaceChildren();
    resultsSection.hidden = true;
    document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
  });
  for (const button of document.querySelectorAll('[data-search]')) {
    button.addEventListener('click', () => {
      searchInput.value = button.dataset.search;
      renderResults(button.dataset.search);
    });
  }
  const initialSearch = new URLSearchParams(location.search).get('q');
  if (initialSearch) { searchInput.value = initialSearch; renderResults(initialSearch); }
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.getElementById('contact-status');
    if (!contactForm.reportValidity()) {
      status.textContent = 'Please complete all required fields with valid information.';
      return;
    }
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !email || !message) {
      status.textContent = 'Please complete all required fields.';
      return;
    }
    status.textContent = `Thanks, ${name}! Your message has been prepared. This demo form does not transmit emails.`;
    contactForm.reset();
  });
}
