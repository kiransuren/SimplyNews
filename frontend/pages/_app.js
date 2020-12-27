import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from 'react';
const axios = require('axios').default;

/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}*/

function MyApp() {
  const [article, articleSet] = useState([]);
  const [isLoad, setIsLoad] = useState(true);


  useEffect(() => {

    const fetchData = async () => {
      const reutersArticles = await axios(
        "http://localhost:5000/api/articles/reuters",axiosConfig
      );
      const APArticles = await axios(
        "http://localhost:5000/api/articles/ap",axiosConfig
      );
      articleSet([...reutersArticles.data,...APArticles.data]);
      setIsLoad(false)
    };

    fetchData();
    //getReutersNews()
    //getAPNews()
  }, []);

  if (isLoad)
  {
    return <span class="w-full h-full object-center"><p class="text-center object-center">Loading</p></span>;
  }
  else{
    return (
      <>
      <h1 class="dark:text-gray-50 font-custom underline text-3xl absolute text-left md:sticky left-0 top-0 pl-4 pt-2">SimplyNews</h1>
      <div class="flex flex-col items-center justify-center flex-grow mt-6">
        {
          article.map((c_art) =>
            <div class="dark:bg-grisaille dark:text-white border-blue-400 border-l-8 transition transform hover:-translate-y-1 flex flex-col inline-block rounded-md p-5 m-10 w-10/12 md:w-6/12 h-100 shadow-xl">
              <span class="self-end relative inline-flex rounded-full h-3 w-3 bg-green-500 bottom-0 right-0 "><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span></span>
              <a href={c_art.link} target="_blank"><h2 class="md:text-base font-semibold">{c_art.title}</h2></a>
              <p class="text-gray-400">{c_art.time}</p>
              <br/>
              <img src={c_art.src} />
              <p class="md:text-sm">{c_art.content}</p>
              <p class="text-right text-gray-400">{c_art.organization}</p>
            </div>
          )
        }
        </div>
      <a href="https://github.com/kiransuren"><p class="font-sans text-lg dark:text-gray-50 absolute text-right sticky left-0 bottom-0 pr-5 pb-2">Created by Kiran Surendran</p></a>
      </>
    )
  }
}

let axiosConfig = {
  header : {
    "origin":"http://www.yourpage.com",
    'Access-Control-Allow-Origin': '*'
  }
}


export default MyApp
 