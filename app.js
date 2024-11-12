const express = require('express');
const { v4: uuidv4 } = require('uuid');
const data = require('./data');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

 

 
const blogPost = data;

app.get('/',(req, res)=>{ /*--------------------Root*/
    res.render("index.ejs",{post: blogPost});
});
app.get('/blogs',(req, res)=> {
    res.render("blogs.ejs",{post:blogPost})
})
 
app.get('/blog/:id',(req, res)=>{ /*--------------------Get blog*/
    const formId = req.params.id;
    const getPost =  blogPost.find((p)=> p.id === formId);
    res.render("blog.ejs",getPost);
}) 

app.post('/form',(req, res)=>{ /*--------------------Create new post*/
const paragraph = req.body.description;
const preview = cutParagraph(paragraph);
    const newPost = {
        id: generateUniqueId(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        preview: preview,
        author: req.body.author,
        category: req.body.category,
        date: formattedDate
    };
    blogPost.unshift(newPost);
    res.render("index.ejs",{post: blogPost});
})
app.get('/form',(req, res)=>{
    res.render("form.ejs");
})


app.get('/:id',(req, res)=>{ /*--------------------Get form*/
    const formId = req.params.id;
    const getPost =  blogPost.find((p)=> p.id === formId);
    res.render("edit.ejs",getPost);
})  
 
app.post('/:id',(req, res)=>{ /*--------------------Update*/
const formId = req.params.id;
const paragraph = req.body.description;
const preview = cutParagraph(paragraph);
    const editPost = {
        id:  req.params.id,
        title: req.body.title,
        subtitle: req.body.subtitle,
        preview: preview,
        description: req.body.description,
        author: req.body.author,
        category: req.body.category,
        date: formattedDate
    };
    const index = blogPost.findIndex(p => p.id !== formId);
    blogPost.splice(index, 1);
    blogPost.unshift(editPost);
    res.render("index.ejs",{post: blogPost});
})
app.delete('/:id', (req, res) => { /*--------------------Delete*/
    const formId = req.params.id;
    const index = blogPost.findIndex(p => p.id == formId); 
    if(index !== -1){
        blogPost.splice(index, 1);
    }
   res.render("index.ejs",{post: blogPost});
});




const currentDate = new Date();
const monthIndex = currentDate.getMonth();
const date = currentDate.getDate();
const year = currentDate.getFullYear();
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const monthName = monthNames[monthIndex];
const formattedDate = `${monthName} ${date}, ${year}`;



function cutParagraph(paragraph) {
  
    const halfwayPoint = Math.floor(paragraph.length / 2);
    const newParagraph = paragraph.substring(0, halfwayPoint);
    return newParagraph;
}



function generateUniqueId() {
    return uuidv4();
}

 


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})









 
