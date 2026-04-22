console.log('Hier komt je server voor Sprint 10.')

console.log('Gebruik uit Sprint 9 alleen de code die je mee wilt nemen.')

// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

//Haalt alle stories op.
async function getStories() {
  //haalt data op 
  const res = await fetch("https://fdnd-agency.directus.app/items/buurtcampuskrant_stories");
  //zet om in data
  const data = await res.json();
  return data.data;
}

//Haalt alle doelgroepen op.
async function getCategories() {
  const res = await fetch("https://fdnd-agency.directus.app/items/buurtcampuskrant_categories");
  const data = await res.json();
  return data.data;
}

//Haalt alle comments op.
async function getComments() {
  const res = await fetch("https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments?limit=500");
  const data = await res.json();
  return data.data;
}

app.get('/', async function (req, res) {

  const stories = await getStories();
  const categories = await getCategories();
  const search = req.query.search;

  let algemeenStory = stories
    .filter(function(story) {
      return story.date !== null && story.district === "algemeen";
    })

    if (search) {
      algemeenStory = algemeenStory.filter(function(story) {
        return story.title.toLowerCase().includes(search.toLowerCase());
      });
    }

    algemeenStory = algemeenStory.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

  res.render('index.liquid', { 
    stories: algemeenStory,
    categories: categories,
    search: search
  });

});

app.get('/nieuw-west', async function (req, res) {

  const stories = await getStories();
  const categories = await getCategories();

  const selectedTargetGroup = req.query.targetgroup;

  const filteredStories = stories.filter(function(story) {

    const isCorrectDistrict = story.district === "nieuw-west";
    const hasTargetGroup = story.target_group !== null;

    if (!selectedTargetGroup) {
      return isCorrectDistrict && hasTargetGroup;
    }

    if (!hasTargetGroup) {
      return false;
    }

    const isCorrectTargetGroup =
      story.target_group.toLowerCase() === selectedTargetGroup.toLowerCase();

    return isCorrectDistrict && isCorrectTargetGroup;
  });

  res.render('nieuw-west.liquid', { 
    stories: filteredStories,
    categories: categories,
    selectedTargetGroup: selectedTargetGroup 
  });

});


app.get('/zuidoost', async function (req, res) {

  const stories = await getStories();
  const categories = await getCategories();

  const selectedTargetGroup = req.query.targetgroup;

  const filteredStories = stories.filter(function(story) {

    const isCorrectDistrict = story.district === "zuidoost";
    const hasTargetGroup = story.target_group !== null;

    if (!selectedTargetGroup) {
      return isCorrectDistrict && hasTargetGroup;
    }

    if (!hasTargetGroup) {
      return false;
    }

    const isCorrectTargetGroup =
      story.target_group.toLowerCase() === selectedTargetGroup.toLowerCase();

    return isCorrectDistrict && isCorrectTargetGroup;
  });

  res.render('zuidoost.liquid', { 
    stories: filteredStories,
    categories: categories,
    selectedTargetGroup: selectedTargetGroup 
  });
  
})

app.get('/oost', async function (req, res) {

  const stories = await getStories();
  const categories = await getCategories();

  const selectedTargetGroup = req.query.targetgroup;

  const filteredStories = stories.filter(function(story) {

    const isCorrectDistrict = story.district === "oost";
    const hasTargetGroup = story.target_group !== null;

    if (!selectedTargetGroup) {
      return isCorrectDistrict && hasTargetGroup;
    }

    if (!hasTargetGroup) {
      return false;
    }

    const isCorrectTargetGroup =
      story.target_group.toLowerCase() === selectedTargetGroup.toLowerCase();

    return isCorrectDistrict && isCorrectTargetGroup;
  });

  res.render('oost.liquid', { 
    stories: filteredStories,
    categories: categories,
    selectedTargetGroup: selectedTargetGroup 
  });
  
})

app.get('/details/:id', async function (req, res) {

  const success = req.query.success === 'true';
  const error = req.query.error === 'true';
  const stories = await getStories();
  const categories = await getCategories();

  const story = stories.find(function(story) {
    return story.id == req.params.id;
  });

  const comments = await getComments();

  const filteredComments = comments.filter(function(comment) {
    return comment.story == req.params.id;
  });

  const hasComments = filteredComments.length > 0;

  res.render('details.liquid', { 
    story: story,
    categories: categories,
    reacties: filteredComments,
    hasComments: hasComments,
    success: success,
    error: error
  });

});

app.get('/archief', async function (req, res) {
  res.render('archief.liquid')
})

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  const fetchResponse = await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  // Als de POST niet gelukt is, kun je de response loggen. Sowieso een goede debugging strategie.
  // console.log(fetchResponse)

  // Eventueel kun je de JSON van die response nog debuggen
  // const fetchResponseJSON = await fetchResponse.json()
  // console.log(fetchResponseJSON)

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/


app.post('/reacties', async function (request, response) {

  console.log(request.body);

  const name = request.body.name
  const comment = request.body.comment
  const storyId = request.body.story_id
  
  try {
    const apiResponse = await fetch(
      'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          name: name,
          comment: comment,
          story: storyId
        })
      }
    )
    
    console.log(apiResponse.status);

    response.redirect(303, `/details/${storyId}?success=true`)

  } catch (error) {
      response.redirect(303, `/details/${storyId}?error=true`)
  }
 
})


// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})

//error page

app.use((req, res) => {
  res.status(404).render("404.liquid")
})

console.log('Zet \'m op!')