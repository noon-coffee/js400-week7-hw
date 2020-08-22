const { Router } = require('express');
const router = Router();


router.use('/weather', require('./weather'));

router.get("/", 
  (req, res, next) => {
    // res.send(`
    //   <html>
    //     <body>
    //       <h1>Hello, Class!</h1>
    //     </body>
    //   </html>
    // `); 

    const timeStamp = new Date().toTimeString();
    res.render('index', { 
      time: timeStamp,
      items: ['item one', 'other', 'new item'],
    });
  }
);

/*
 * Middleware for error handling
 */
router.use(async (err, req, res, next) => {
  if (err.message.includes("Cast to ObjectId failed")) //db: invalid ObjectId
  {    
    res.status(400).send('Invalid id provided.');
  }
  else if (err.message.includes("E11000 duplicate key error")) //db: unique index error
  {
    res.sendStatus(409);
  } 
  else 
  {    
    console.log('500 error', err.message, err.stack);
    res.status(500).send('An unexpected error occurred.')  
  } 
});


module.exports = router;