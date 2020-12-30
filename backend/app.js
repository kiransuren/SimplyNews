const express = require('express')
const app = express()
const axios = require('axios').default;
const cheerio = require('cheerio');
const PORT = process.env.PORT || 5000
const asyncify = require('express-asyncify');

var cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.get('/', (req,res) =>
{
    res.send("Hello World! sd");
})

/* API REQUESTS
    @params: org, numOfArticles
    - getAPNews 
    - getReuters
*/

var router = asyncify(express.Router())

router.route('/articles/:org')
    // Get request for articles
    .get(async (req,res) =>
    {
        // switch based off requested organization
        switch(req.params.org)
        {
            case "reuters":
                ponse = await getReutersNews()
                break;
            case "ap":
                ponse = await getAPNews()
                break;
            default:
                ponse = ["INVALID ORGANIZATION"]
                break;
        }
        res.json(ponse)
    });

//All routes will be prefixed by /api
app.use('/api', router)

async function getReutersNews(){
    var temp_arr = [];
    const response = await axios.get("http://www.reuters.com/theWire",axiosConfig)
    const $ = cheerio.load(response.data);
    $('.story-content').each(function(i, elem){
      temp_arr.push({title: $(this).find('.story-title')[0].children[0].data.trim(), content:$(this).find('p')[0].children[0].data.trim(), link:"https://www.reuters.com"+$(this).find("a")[0].attribs.href, time:$(this).find(".timestamp")[0].children[0].data.trim(), organization:"Reuters"})
    })
    return temp_arr
}

async function getAPNews() {
    var temp_arr = [];
    const response = await axios.get("http://apnews.com/hub/ap-top-news",axiosConfig)
    const $ = cheerio.load(response.data);
    $('.FeedCard').each(function(i, elem){
      try{
        var title = $(this).find('h1')[0].children[0].data;
        var content = $(this).find(".content")[0].children[0].children[0].data;
        var link = "https://www.apnews.com"+$(this).find("a")[0].attribs.href;
        var time = $(this).find(".Timestamp")[0].children[0].data;
        temp_arr.push({title: title, content:content, link:link, time:time, organization:"Associated Press"})
      }
      catch (err)
      {}
    })
    return temp_arr
  }

const client_address = "http://192.168.0.175:3000/"
let axiosConfig = {
    header : {
      "origin":client_address,
      'Access-Control-Allow-Origin': '*'
    }
}
  

app.listen(PORT, () => console.log("SERVER STARTED"))
