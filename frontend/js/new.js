/** author tag: Hailey Chen  */
"use strict";

const PAGE_LIMIT = 12;
const url = "http://localhost:3000/blogs";
const form = document.querySelector('form');
let blog;
let blogNum;
let id_value;
const Title = form.querySelector('#title');
const Author = form.querySelector('#author');
const Content = form.querySelector('#content');
const submitBtn = form.querySelector('button');

// document.addEventListener('DOMContentLoaded', fetchBlogs());

async function fetchBlogs(){
    try{
        const response = await fetch(`${url}?_start=0&_limit=${PAGE_LIMIT}`);
        if(!response.ok){
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        blogNum = response.headers.get('x-total-count');
        id_value = parseInt(blogNum)+1;

    } catch(error){
        console.log(error.message);
    }
}


form.addEventListener('submit', submitBlog);


async function submitBlog(e){

    if(form.reportValidity()){

        e.preventDefault();
        // wait for fetchBlogs 
        await fetchBlogs();

        blog = {
            id: id_value,
            title: Title.value,
            author: Author.value,
            date: new Date().toDateString(),
            profile: "images/default.jpeg",
            content: Content.value
        };


        try{

            const response = await fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(blog)
            });
            if(!response.ok){
                throw Error(`Error ${response.url} ${response.statusText}`);
            }

            window.location.href = '/frontend/index.html';

        }catch(error){
            
            console.log(error.message);
        }
        
    }
}


/**test1 */