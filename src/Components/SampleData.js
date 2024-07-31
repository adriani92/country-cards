import axios from 'axios';

const UnsplashAPI = 'https://api.unsplash.com/photos/';
const AccessKey = 'xd4hbnvulmI9ppzSCRG8CD1a6wuBWFBs07QuKnnFFB4';

const cities = [
  { 
    name: 'Tokyo', 
    country: 'Japan', 
    description: "Tokyo, Japan’s bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid sprawling public gardens. The city is famed for its vibrant food scene, and its Shibuya and Harajuku districts are the heart of its trendy teen fashion culture." 
  },
  { 
    name: 'Bangkok', 
    country: 'Thailand', 
    description: "Bangkok, Thailand's bustling capital, is known for its vibrant street life and ornate shrines. The iconic Wat Arun temple sits on the Chao Phraya River. The city is also home to opulent Grand Palace and its sacred Wat Phra Kaew Temple." 
  },
  { 
    name: 'Mumbai', 
    country: 'India', 
    description: "Mumbai, India's largest city, is known for its bustling streets, vibrant markets, and Bollywood film industry. Its iconic landmarks include the Gateway of India arch, the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya museum, and the towering Haji Ali Dargah mosque." 
  },
  { 
    name: 'Seoul', 
    country: 'South Korea', 
    description: "Seoul, South Korea's dynamic capital, is a mix of modern skyscrapers, high-tech subways, and pop culture alongside Buddhist temples, palaces, and street markets. The iconic N Seoul Tower offers panoramic views of the city, while the Gyeongbokgung Palace showcases traditional Korean architecture." 
  },
  { 
    name: 'Istanbul', 
    country: 'Turkey', 
    description: "Istanbul, Turkey's largest city, straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here. In the Sultanahmet district, the open-air, Roman-era Hippodrome was for centuries the site of chariot races, and Egyptian obelisks also remain." 
  },
  { 
    name: 'London', 
    country: 'United Kingdom', 
    description: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its center stand the imposing Houses of Parliament, the iconic 'Big Ben' clock tower, and Westminster Abbey, site of British monarch coronations. Across the Thames River, the London Eye observation wheel provides panoramic views of the South Bank cultural complex and the entire city." 
  },
  { 
    name: 'Paris', 
    country: 'France', 
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques." 
  },
  { 
    name: 'Madrid', 
    country: 'Spain', 
    description: "Madrid, Spain's central capital, is a city of elegant boulevards and expansive, manicured parks such as the Buen Retiro. It’s renowned for its rich repositories of European art, including the Prado Museum’s works by Goya, Velázquez, and other Spanish masters." 
  },
  { 
    name: 'New York City', 
    country: 'United States', 
    description: "New York City, often simply called New York, is the most populous city in the United States. With an estimated 2019 population of 8,336,817 distributed over about 302.6 square miles (784 km2), New York is also the most densely populated major city in the United States." 
  },
  { 
    name: 'Toronto', 
    country: 'Canada', 
    description: "Toronto, the capital of the province of Ontario, is a major Canadian city along Lake Ontario’s northwestern shore. It's a dynamic metropolis with a core of soaring skyscrapers, all dwarfed by the iconic, free-standing CN Tower." 
  },
  { 
    name: 'Mexico City', 
    country: 'Mexico', 
    description: "Mexico City is the densely populated, high-altitude capital of Mexico. It's known for its Templo Mayor (a 13th-century Aztec temple), the baroque Catedral Metropolitana de México of the Spanish conquistadors, and the Palacio Nacional, which houses historic murals by Diego Rivera." 
  },
  { 
    name: 'England', 
    country: 'United Kingdom', 
    description: "England is a country that is part of the United Kingdom. It shares land borders with Wales to its west and Scotland to its north. The Irish Sea lies northwest of England and the Celtic Sea to the southwest." 
  },
  { 
    name: 'Bern', 
    country: 'Switzerland', 
    description: "Bern, the capital city of Switzerland, is built around a crook in the Aare River. It traces its origins back to the 12th century, with medieval architecture preserved in the Altstadt (Old Town)." 
  }
];


const fetchData = async () => {
  try {
    const data = await Promise.all(
      cities.map(async city => {
        const response = await axios.get(`${UnsplashAPI}/random`, {
          params: {
            query: city.name,
            count: 5,
            client_id: AccessKey
          }
        });
        const photoLinks = response.data.map(photo => photo.urls.small);
        return {
          city: city.name,
          description: city.description,
          photos: photoLinks,
          country: city.country
        };
      })
    );
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();