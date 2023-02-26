const { db } = require("./db");
const { Campus, Student } = require("./db").models;

// demo data for campuses
const demoCampuses = [
  {
    name: "Essex College",
    imageUrl:
      "https://live.staticflickr.com/65535/51688929182_6e591b7c76_o.jpg",
    address: "Vermont",
    description:
      "Four 18-year-old freshman roommates at Essex College in Vermont. A bundle of contradictions and hormones, these sexually active college girls are equal parts lovable and infuriating.",
  },
  {
    name: "Stanford Law School",
    imageUrl:
      "https://law.stanford.edu/wp-content/uploads/2021/02/giving-new-design-7-840x610.jpg",
    address: "559 Nathan Abbott Way, Stanford, CA 94305",
    description:
      "Elle Woods, a fashionable sorority queen, is dumped by her boyfriend. She decides to follow him to law school. While she is there, she figures out that there is more to her than just looks.",
  },
  {
    name: "North Shore High School",
    imageUrl:
      "https://static.wikia.nocookie.net/meangirls/images/0/0a/The_Back_of_the_Building.png",
    address: "Evanston, Illinois",
    description:
      "Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.",
  },
  {
    name: "Moordale Secondary School",
    imageUrl:
      "https://static.wikia.nocookie.net/sex-education-netflix/images/8/82/School.jpg",
    address: "Moordale, United Kingdom",
    description:
      "A teenage boy with a sex therapist mother teams up with a high school classmate to set up an underground sex therapy clinic at school.",
  },
  {
    name: "Abbott Elementary",
    imageUrl:
      "https://static.wikia.nocookie.net/abbottelementary/images/c/c4/Willard_R._Abbott_Elementary.png",
    address: "Philadelphia",
    description:
      "Follows a group of teachers brought together in one of the worst public schools in the country, simply because they love teaching.",
  },
  {
    name: "Wagstaff School",
    imageUrl:
      "https://static.wikia.nocookie.net/bobsburgerpedia/images/9/95/Wagstaff.png",
    address: "Seymour's Bay",
    description:
      "Bob Belcher runs his dream restaurant with his wife and three children as their last hope of holding the family together.",
  },
  {
    name: "Our Lady Immaculate College",
    imageUrl:
      "https://static.wikia.nocookie.net/derry/images/5/53/Our_Lady_Immaculate_College.png",
    address: "Derry, Northern Ireland",
    description:
      "The personal exploits of a 16-year-old girl and her family and friends during the Troubles in the early 1990s.",
  },
  {
    name: "Grove High School",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/59e7ad0cd7bdce1a63515d5c/1508528582170-U45BW5B6KLLDWUC8L4OA/princessdiares2.jpg",
    address: "San Francisco",
    description:
      "Mia Thermopolis has just found out that she is the heir apparent to the throne of Genovia. With her friends Lilly and Michael Moscovitz in tow, she tries to navigate through the rest of her sixteenth year.",
  },
  {
    name: "Monsters University",
    imageUrl:
      "https://i.insider.com/51d31f27eab8ea5137000000?width=1000&format=jpeg&auto=webp",
    address: "Monstropolis",
    description:
      'A look at the relationship between Mike Wazowski and James P. "Sully" Sullivan during their days at Monsters University, when they weren\'t necessarily the best of friends.',
  },
  {
    name: "Lone Moose School",
    imageUrl:
      "https://static.wikia.nocookie.net/greatnorth/images/3/39/Lone_Moose_School_%28Daytime%29.png",
    address: "Lone Moose, Alaska",
    description: "The adventures of a single dad and his weird Alaskan family.",
  },
];

// demo data for students
const demoStudents = [
  {
    firstName: "Kimberly",
    lastName: "Finkle",
    email: "kimberly@finkle.com",
    imageUrl:
      "https://static.tvmaze.com/uploads/images/medium_portrait/378/945031.jpg",
    gpa: 3.4,
    campusId: 1,
  },
  {
    firstName: "Bela",
    lastName: "Malhotra",
    email: "bela@malhotra.com",
    imageUrl:
      "https://static.tvmaze.com/uploads/images/medium_portrait/378/945028.jpg",
    gpa: 1.3,
    campusId: 1,
  },
  {
    firstName: "Leighton",
    lastName: "Murray",
    email: "leighton@murray.com",
    imageUrl:
      "https://static.tvmaze.com/uploads/images/medium_portrait/378/945027.jpg",
    gpa: 0.2,
    campusId: 1,
  },
  {
    firstName: "Whitney",
    lastName: "Chase",
    email: "whitney@chase.com",
    imageUrl:
      "https://static.tvmaze.com/uploads/images/medium_portrait/378/945029.jpg",
    gpa: 0.3,
    campusId: 1,
  },
  {
    firstName: "Elle",
    lastName: "Woods",
    email: "elle@woods.com",
    imageUrl:
      "https://media1.popsugar-assets.com/files/thumbor/YN5HMVHuMrFhsJ0IEQIIs2NCzaY/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/06/08/659/n/1922283/02ba55eb7871cef9_MCDLEBL_EC002/i/Reese-Witherspoon-Elle-Woods.jpg",
    gpa: 3.4,
    campusId: 2,
  },
  {
    firstName: "Vivian",
    lastName: "Kensington",
    email: "vivian@kensington.com",
    imageUrl:
      "https://static.wikia.nocookie.net/legallyblonde/images/9/91/Vivian.jpg/",
    gpa: 4,
    campusId: 2,
  },
  {
    firstName: "Warner",
    lastName: "Hungtinton",
    email: "warner@huntington.com",
    imageUrl:
      "https://static.wikia.nocookie.net/legallyblonde/images/0/03/Warner.jpg/",
    gpa: 0,
    campusId: 2,
  },
  {
    firstName: "Cady",
    lastName: "Heron",
    email: "cady@heron.com",
    imageUrl:
      "https://www.giantbomb.com/a/uploads/scale_small/46/462814/3180756-1085559866-97711.jpg",
    gpa: 3,
    campusId: 3,
  },
  {
    firstName: "Regina",
    lastName: "George",
    email: "regina@george.com",
    imageUrl:
      "https://static.wikia.nocookie.net/meangirls/images/4/42/018.jpg/",
    gpa: 3.8,
    campusId: 3,
  },
  {
    firstName: "Damian",
    lastName: "Leigh",
    email: "damian@leigh.com",
    imageUrl:
      "https://openpsychometrics.org/tests/characters/test-resources/pics/MG/6.jpg",
    gpa: 1.1,
    campusId: 3,
  },
  {
    firstName: "Janis",
    lastName: "Ian",
    email: "janis@ian.com",
    imageUrl:
      "https://img.buzzfeed.com/buzzfeed-static/static/2019-04/30/13/asset/buzzfeed-prod-web-05/sub-buzz-9466-1556644994-5.jpg",
    gpa: 3.4,
    campusId: 3,
  },
  {
    firstName: "Otis",
    lastName: "Milburn",
    email: "otis@milburn.com",
    imageUrl:
      "https://static.wikia.nocookie.net/sex-education-netflix/images/4/43/Otis_Milburn_Season_1_Portrait.jpg",
    gpa: 0.4,
    campusId: 4,
  },
  {
    firstName: "Eric",
    lastName: "Effiong",
    email: "eric@effiong.com",
    imageUrl:
      "https://static.wikia.nocookie.net/sex-education-netflix/images/9/9c/Eric_Effiong_Season_1_Portrait.jpg",
    gpa: 1.2,
    campusId: 4,
  },
  {
    firstName: "Maeve",
    lastName: "Wiley",
    email: "maeve@wiley.com",
    imageUrl:
      "https://static.wikia.nocookie.net/sex-education-netflix/images/a/a8/Maeve_Wiley_Season_1_Portrait.jpg",
    gpa: 3,
    campusId: 4,
  },
  {
    firstName: "Janine",
    lastName: "Teagues",
    email: "janine@teagues.com",
    imageUrl:
      "https://static.wikia.nocookie.net/abbottelementary/images/6/6d/Janine_S2_portrait.jpg",
    gpa: 4,
    campusId: 5,
  },
  {
    firstName: "Ava",
    lastName: "Coleman",
    email: "ava@coleman.com",
    imageUrl:
      "https://static.wikia.nocookie.net/abbottelementary/images/1/1e/Ava_S2_portrait.jpg",
    gpa: 3.5,
    campusId: 5,
  },
  {
    firstName: "Tina",
    lastName: "Belcher",
    email: "tina@belcher.com",
    imageUrl:
      "https://static.wikia.nocookie.net/bobsburgerpedia/images/2/27/Tina-1.jpg",
    gpa: 1.7,
    campusId: 6,
  },
  {
    firstName: "Gene",
    lastName: "Belcher",
    email: "gene@belcher.com",
    imageUrl:
      "https://static.wikia.nocookie.net/bobsburgerpedia/images/9/99/Gene-2.jpg",
    gpa: 2.1,
    campusId: 6,
  },
  {
    firstName: "Louise",
    lastName: "Belcher",
    email: "louise@belcher.com",
    imageUrl:
      "https://static.wikia.nocookie.net/bobsburgerpedia/images/8/85/Louise-1.jpg",
    gpa: 0.4,
    campusId: 6,
  },
  {
    firstName: "Erin",
    lastName: "Quinn",
    email: "erin@quinn.com",
    imageUrl:
      "https://cdn.comedy.co.uk/images/library/people/900x450/d/derry_girls_erin.jpg",
    gpa: 3.4,
    campusId: 7,
  },
  {
    firstName: "Orla",
    lastName: "McCool",
    email: "orla@mccool.com",
    imageUrl:
      "https://images.immediate.co.uk/production/volatile/sites/3/2018/01/OrlaDerryGirls-2d8d696.jpg",
    gpa: 1.2,
    campusId: 7,
  },
  {
    firstName: "Clare",
    lastName: "Devlin",
    email: "clare@devlin.com",
    imageUrl:
      "https://i0.wp.com/lezwatchtv.com/wp-content/uploads/2018/05/Clare-Devlin.jpg",
    gpa: 2.2,
    campusId: 7,
  },
  {
    firstName: "Michelle",
    lastName: "Mallon",
    email: "michelle@mallon.com",
    imageUrl:
      "https://static.tvmaze.com/uploads/images/medium_portrait/146/365101.jpg",
    gpa: 0.2,
    campusId: 7,
  },
  {
    firstName: "James",
    lastName: "Maguire",
    email: "james@maguire.com",
    imageUrl:
      "https://static.tvmaze.com/uploads/images/medium_portrait/146/365104.jpg",
    gpa: 0.8,
    campusId: 7,
  },
  {
    firstName: "Mia",
    lastName: "Thermopolis",
    email: "mia@thermopolis.com",
    imageUrl:
      "https://images.saymedia-content.com/.image/t_share/MTg1Nzk1Mjk1MDEwMjM1Nzk2/mia-thermopolis-top-ten-outfits-from-the-princess-diaries-films.jpg",
    gpa: 4,
    campusId: 8,
  },
  {
    firstName: "Lilly",
    lastName: "Moscovitz",
    email: "lilly@moscovitz.com",
    imageUrl:
      "https://static.wikia.nocookie.net/princessdiaries/images/1/1e/Lilly_Moscovitz.jpg",
    gpa: 3.8,
    campusId: 8,
  },
  {
    firstName: "Mike",
    lastName: "Wazowski",
    email: "mike@wazowski.com",
    imageUrl:
      "https://static.wikia.nocookie.net/pixar/images/0/08/MikeWazowski.png",
    gpa: 2.4,
    campusId: 9,
  },
  {
    firstName: 'James P. "Sulley"',
    lastName: "Sullivan",
    email: "sulley@sullivan.com",
    imageUrl:
      "https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-127wc3f_b5f0a9f4.jpeg",
    gpa: 0.8,
    campusId: 9,
  },
  {
    firstName: "Ham",
    lastName: "Tobin",
    email: "ham@tobin.com",
    imageUrl:
      "https://64.media.tumblr.com/fff6426ee5a4ebc7e65d882a03fae11c/e454b5893ff54129-05/s1280x1920/e6f0173a3f112164f56a8a0fc25ae064d148b2a9.jpg",
    gpa: 2.1,
    campusId: 10,
  },
  {
    firstName: "Crispin",
    lastName: "Cienfuegos",
    email: "crispin@cienfuegos.com",
    imageUrl:
      "https://static.wikia.nocookie.net/greatnorth/images/4/43/Crispin.png",
    gpa: 3.2,
    campusId: 10,
  },
];

/**
 * seed function that is exported into our index.js and called each time on startup
 */
const seed = async () => {
  try {
    // drops the tables if they already exist and creates them again
    await db.sync({ force: true });

    // randomly generate campuses from the demo data = the first 10 will be created exactly as specified in the demoData
    for (let i = 0; i < 110; i++) {
      if (i < 10) {
        await Campus.create(demoCampuses[i]);
      } else {
        await Campus.create({
          name: demoCampuses[Math.floor(Math.random() * 10)].name,
          imageUrl: demoCampuses[Math.floor(Math.random() * 10)].imageUrl,
          address: demoCampuses[Math.floor(Math.random() * 10)].address,
          description: demoCampuses[Math.floor(Math.random() * 10)].description,
        });
      }
    }

    // now randomly generate students from the demo data, the first 30 will be created based on demo data
    for (let i = 0; i < 130; i++) {
      if (i < 30) {
        await Student.create(demoStudents[i]);
      } else {
        await Student.create({
          firstName: demoStudents[Math.floor(Math.random() * 30)].firstName,
          lastName: demoStudents[Math.floor(Math.random() * 30)].lastName,
          email: demoStudents[Math.floor(Math.random() * 30)].email,
          imageUrl: demoStudents[Math.floor(Math.random() * 30)].imageUrl,
          gpa: Math.random() * 4.0,
          campusId: Math.ceil(Math.random() * (110 - 10)) + 10,
        });
      }
    }

    console.log("Seeding successful");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  seed,
};
