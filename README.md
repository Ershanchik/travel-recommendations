# Wander Atlas — Travel Recommendation Web Application

An original, responsive HTML/CSS/JavaScript travel recommendation project built for the IBM JavaScript Programming Essentials Coursera final assignment.

## Features
- Home page with an introduction and interactive destination search.
- About Us page explaining the project and its goals.
- Contact Us page with labelled, validated email-message form (front-end demo; **does not transmit messages to a server**).
- Navigation between all three pages and Home/Explore/Category buttons.
- Working Search and Clear controls.
- Curated beach, temple and country recommendations: at least two illustrated destinations per category.
- Search by category, country, city or destination name. No API keys or third-party dependencies.
- Responsive layout, accessible labels, descriptive alt text, empty-state handling.
- Includes travel_recommendation_api.json as a readable sample of the destination data.

## Run locally

Open `index.html` in your browser. No server is required. External photographs use Unsplash CDN and gracefully fall back to local original SVG travel illustrations if network access is unavailable.

Optional local web server:

```bash
python -m http.server 8000
```

Navigate to `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a **new public GitHub repository** named `travel-recommendations`.
2. Upload **all files and the `assets` folder to the repository root**, then commit.
3. In GitHub select **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**.
4. The expected website address after deployment is `https://YOUR_USERNAME.github.io/travel-recommendations/`.
5. Submit the repository URL and the **actual published Pages URL** in Coursera. Wait for GitHub Pages to finish publishing before submitting.

## Evaluation checklist

| Requirement | Implementation |
|---|---|
| Public repository URL | GitHub repository after upload |
| Home, About Us, Contact Us pages | `index.html`, `about_us.html`, `contact_us.html` |
| Home introduction | Hero and explanatory paragraph |
| About Us page | Story, mission, values |
| Contact form | `contact_us.html` with name, email, subject, message |
| Navigation | All three pages linked from every page |
| Beaches, 2+ images | Search `beaches`; four results with `<img>` elements |
| Temples, 2+ images | Search `temples`; four results |
| Countries, 2+ images | Search `countries`; four results |
| Interactive search | `travel_recommendation.js` |

Images: remote Unsplash CDN photos (with locally created SVG fallback scenery), suitable for a non-commercial educational demonstration. All descriptions are original.
