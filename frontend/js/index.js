/** author tag: Hailey Chen  */

"use strict";
const MAX_LENGTH = 50;//maximum length of the blog content shown on the page, i.e., if the blog content is longer, truncate it.
const PAGE_LIMIT = 12;//number of blogs per page

const url = "http://localhost:3000/blogs";
let blogs;
const articleWrapper = document.querySelector('.articles-wrapper');
const paginationContainer = document.querySelector('.pagination-container');
const search = document.querySelector("input");
const errorContainer = document.querySelector('.notification-container');
const message = errorContainer.querySelector('.notification');
const closeBtn = errorContainer.querySelector('button');
let searchContent = ""; // default: no filter 
let pageNum = 1; // default: loading first set of blogs 
                // default: first button is active


document.addEventListener('DOMContentLoaded', fetchBlogs());

async function fetchBlogs(){
    try{
        let new_url = `${url}`;
        // if search content not empty
        if(searchContent != ""){ // if search content has input
            new_url += `?q=${searchContent}&`; // filter blogs
        }
        else{ // if search content is empty or input an empty string
            new_url+=`?`; // no filter effect
        }
        new_url += `_sort=date&_order=desc&_start=0&_limit=${PAGE_LIMIT}&_page=${pageNum}`;
        const response = await fetch(`${new_url}`);
        blogs = await response.json();
        if(!response.ok){
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        const blogNum = response.headers.get('x-total-count');
        loadBlogs();
        createPagination(blogNum,pageNum);
    } catch(error){
        console.log(error.message);
        errorMessage();
    }
}

function loadBlogs(){
    /**clean container */
    articleWrapper.textContent="";
    for(let i = 0; i < blogs.length; i++){ 
        /*creates card */
        const card = document.createElement('article');
        card.classList.add('card');
        /*creates card-header*/
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        /*creates card-body*/
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        /*creates img*/
        const imgAvatar = document.createElement('img');
        imgAvatar.classList.add('avatar');
        imgAvatar.src = `${blogs[i].profile}`
        /**creates div to name & date description */
        const nameDate = document.createElement('div');
        const date = new Date(blogs[i].date);
        nameDate.textContent = `${blogs[i].author} · ${date.toDateString()}`;
        /**creates title */
        const title = document.createElement('h3');
        title.textContent = `${blogs[i].title}`;

        let truncatedContent;
        if(blogs[i].content.length > MAX_LENGTH){
            truncatedContent = blogs[i].content.substring(0, MAX_LENGTH)+" ...";
        }else{
            truncatedContent = blogs[i].content;
        }
        /**creates content  */
        const content = document.createElement('p');
        content.textContent = `${truncatedContent}`;

        /**append */
        cardHeader.append(imgAvatar,nameDate);
        cardBody.append(title, content);
        card.append(cardHeader, cardBody);
        articleWrapper.appendChild(card);

        /**add listener, redirect page to details.html + id*/
        card.addEventListener('click',()=>{
            window.location.href=`details.html?id=${blogs[i].id}`});


    }
   
    
}

function createPagination(blogNum, pageNum){

    let buttonNum = blogNum / PAGE_LIMIT;

    /** clear container*/ 
    paginationContainer.textContent = "";


    for(let i = 0; i<buttonNum; i++){
        let num = i+1;
        const button = document.createElement('button');
        button.classList.add('page-btn');
        button.textContent = `${i+1}`;
        // set correspond page button active
        if(num == pageNum){
            button.classList.add('active');
        }
        //append
        paginationContainer.appendChild(button);
    }
     
}

function errorMessage(){
    message.textContent = "Failed to fetch";
    errorContainer.classList.remove('hidden');
    closeBtn.addEventListener('click', ()=>{
        errorContainer.classList.add('hidden');
    })
}


// event listeners 
paginationContainer.addEventListener('click', (e)=>{
    const buttons = paginationContainer.querySelectorAll('button');
    pageNum = e.target.textContent;
    fetchBlogs();
});

search.addEventListener('change', ()=>{
    searchContent = search.value;
    
    pageNum = 1; // jumps to first page whether search content is empty or not
    
    fetchBlogs();
});