figma.showUI(__html__, { width: 320, height: 180 });

const sampleData = {
 names: [
  "Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince",
  "Ethan Hunt", "Fiona Gallagher", "George Michael", "Hannah Baker",
  "Ian Somerhalder", "Jane Doe", "Kevin Hart", "Lara Croft",
  "Michael Scott", "Nina Dobrev", "Oscar Wilde", "Paula Patton",
  "Quincy Jones", "Rachel Green", "Steve Rogers", "Tina Fey",
  "Uma Thurman", "Victor Hugo", "Wendy Williams", "Xander Cage",
  "Yara Shahidi", "Zachary Quinto", "Abigail Adams", "Brian Cox",
  "Catherine Zeta", "David Beckham", "Elena Gilbert", "Frank Castle",
  "Grace Hopper", "Harold Finch", "Isla Fisher", "Jack Ryan",
  "Katherine Pierce", "Leonardo DiCaprio", "Maggie Smith", "Noah Bennett"
],

cities: [
  "New York", "London", "Paris", "Tokyo", "Berlin",
  "Sydney", "Toronto", "San Francisco", "Moscow", "Cape Town",
  "Dubai", "Singapore", "Rome", "Amsterdam", "Los Angeles",
  "Chicago", "Hong Kong", "Barcelona", "Buenos Aires", "Cairo",
  "Bangkok", "Istanbul", "Lisbon", "Mexico City", "Melbourne",
  "Miami", "Milan", "Montreal", "Mumbai", "Munich",
  "Nairobi", "Oslo", "Prague", "Rio de Janeiro", "Seoul",
  "Shanghai", "Stockholm", "Vancouver", "Venice", "Warsaw"
],

emails: [
  "alice@example.com", "bob.smith@example.com", "charlie.b@example.net",
  "diana.prince@example.org", "ethan.hunt@example.com",
  "fiona.g@example.net", "george.m@example.org", "hannah.b@example.com",
  "ian.s@example.net", "jane.doe@example.org", "kevin.hart@example.com",
  "lara.c@example.net", "michael.scott@example.org", "nina.d@example.com",
  "oscar.w@example.net", "paula.p@example.org", "quincy.j@example.com",
  "rachel.g@example.net", "steve.r@example.org", "tina.f@example.com",
  "uma.t@example.net", "victor.h@example.org", "wendy.w@example.com",
  "xander.c@example.net", "yara.s@example.org", "zachary.q@example.com",
  "abigail.a@example.net", "brian.c@example.org", "catherine.z@example.com",
  "david.b@example.net", "elena.g@example.org", "frank.c@example.com",
  "grace.h@example.net", "harold.f@example.org", "isla.f@example.com",
  "jack.r@example.net", "katherine.p@example.org", "leonardo.d@example.com",
  "maggie.s@example.net", "noah.b@example.org"
]

};

figma.ui.onmessage = msg => {
  if (msg.type === 'fill-data') {
    const { category } = msg;
    const dataList = sampleData[category];

    if (!dataList) {
      figma.notify('Unknown category');
      return;
    }

    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify('Select one or more text layers to fill');
      return;
    }

    let filledCount = 0;

    for (const node of selection) {
      if (node.type === 'TEXT') {
        const randomIndex = Math.floor(Math.random() * dataList.length);
        const randomText = dataList[randomIndex];

        // Load font then set text
        figma.loadFontAsync(node.fontName).then(() => {
          node.characters = randomText;
        });

        filledCount++;
      }
    }

    figma.notify(`Filled ${filledCount} text layer${filledCount !== 1 ? 's' : ''} with ${category}`);
  }
};
