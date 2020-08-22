const { Router } = require("express");
const router = Router();
const weatherDAO = require('../daos/weather');


/*
 * Test Data: POST /weather - 
 * Creates some weather data for manual testing.
 */
router.post("/", 
  async (req, res, next) => {
    try
    {
      let created = [];
      for (let i = 1; i <= 10; i++) {
        created.push(await weatherDAO.create({ "name": `place${i}`, "temperature": i }));
      }

      res.json(created);
    }
    catch(err)
    {
      next(err);
    }
  }
);

/*
 * Landing: GET /weather - 
 * get a web page that allows you to enter a location name in a form for submission.
 */
router.get("/",
  async (req, res, next) => {
    try
    {
      res.render('weather/form');
    }
    catch(err)
    {
      next(err);
    }
  }
);

/*
 * Location: GET /weather/location?name=<location name> - 
 * get the temperature for a provided location using a weather mongo collection.
 */
router.get("/location",
  async (req, res, next) => {
    try
    {
      const { name } = req.query;
      if (!name || name === '') { 
        res.status(302).redirect('/weather'); 
        return; 
      }

      const weather = await weatherDAO.getByName(name);
      if (!weather) {
        res.status(404).render('weather/404', { name });
      } else {
        const { temperature } = weather;
        res.render('weather/temperature', { name, temperature });
      }
    }
    catch(err)
    {
      next(err);
    }
  }
);


module.exports = router;