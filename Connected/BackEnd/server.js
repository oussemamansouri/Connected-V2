const express = require('express')
const db=require('./models')
const cors=require('cors')
const path = require("path");
const client_router=require(path.join(__dirname,'routers','client-router'))
const centre_router=require('./routers/centre-router')
const admin_router=require('./routers/admin-router')
const formation_router=require('./routers/formation-router')
const ebook_router=require('./routers/ebook-router')
const participation_router=require('./routers/participation-router')
const achat_router=require('./routers/achat-router')
const login_router=require('./routers/login-router')
const dashboard_router=require('./routers/dashboard-router')



const app =express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/public/images",express.static(path.join(__dirname,'public','images'))); 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
  });

  
app.use(
    cors({
      origin: true,
      credentials: true,
      methods: "POST,GET,PUT,PATCH,OPTIONS,DELETE", 
      
    })
  )

app.use('/',login_router)
app.use('/client',client_router)
app.use('/centre',centre_router)
app.use('/admin',admin_router)
app.use('/',formation_router)
app.use('/',ebook_router)
app.use('/',participation_router)
app.use('/',achat_router)
app.use('/',dashboard_router)


///////////////////////////////////////////////////////

app.get('/download-book/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Retrieve the ebook with the specified ID from the database
    const ebook = await db.Ebook.findByPk(id);
    if (!ebook) {
      return res.status(404).send('Ebook not found');
    }
    // Construct the file path to the ebook file
    const filePath = path.join(__dirname, ebook.book);

    // Set the Content-Disposition header to force the browser to download the file
    const fileName = `Ebook.${path.extname(filePath).split('.').pop()}`;

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Send the file to the client
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error sending file');
      } else {
        console.log(`Sent ${fileName}`);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


//////////////////////////////////////////////////////////////////////////////


const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(()=>{

    app.listen(PORT,()=>console.log("server running in port 3000"))
})
