/** author tag: Hailey Chen  */

"use strict";
const id = new URLSearchParams(window.location.search).get('id');
const url = `http://localhost:3000/blogs/${id}`;
let blog;
const articleWrapper = document.querySelector(".wrapper");
const errorContainer = document.querySelector('.notification-container');
const message = errorContainer.querySelector('.notification');
const closeBtn = errorContainer.querySelector('button');

document.addEventListener('DOMContentLoaded', fetchBlog());

async function fetchBlog(){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        blog = await response.json();
        loadDetails();
    } catch(error){
        console.log(error.message);
        errorMessage(id);
    }
}

function loadDetails(){
    console.log(blog);
    // create tags 
    const title = document.createElement("h2");
    title.textContent = blog.title;
    const articleHeader = document.createElement("div");
    articleHeader.classList.add("article-header");
    const avatar = document.createElement("img");
    avatar.src = `${blog.profile}`;
    avatar.classList.add("avatar");
    const nameDate = document.createElement('div');
    const date = new Date(blog.date);
    nameDate.textContent = `${blog.author} · ${date.toDateString()}`;
    // btn container
    const btnContainer = document.createElement('div');
    btnContainer.classList.add("btn-container");
    const btnOne = document.createElement('a');
    btnOne.classList.add('btn');
    btnOne.href = `/frontend/edit.html?id=${id}`;
    const iconOne = document.createElement("i");
    iconOne.classList.add("fa-solid", "fa-pen");
    btnOne.appendChild(iconOne);
    // delete btn
    const btnTwo = document.createElement("button");
    btnTwo.classList.add("btn");
    const iconTwo = document.createElement("i");
    iconTwo.classList.add("fa-solid", "fa-trash-can");
    btnTwo.appendChild(iconTwo);
    // add function to delete btn
    btnTwo.addEventListener('click', async ()=>{
        await deleteBlog(blog.id);
    });
    btnContainer.append(btnOne,btnTwo);
    // append img, nameDate and btn-container to article header
    articleHeader.append(avatar, nameDate,btnContainer);
    //article-body
    const articleBody = document.createElement("p");
    articleBody.classList.add("article-body");
    articleBody.textContent = `${blog.content}`;
    // apend title, article-header and article-body to wrapper
    articleWrapper.append(title, articleHeader, articleBody);
    
}

function errorMessage(id){
    message.textContent = `Cannot find blog with id ${id}`;
    errorContainer.classList.remove('hidden');
    closeBtn.addEventListener('click', ()=>{
        errorContainer.classList.add('hidden');
    })
}

async function deleteBlog(id) {
    const response = await fetch(`${url}`, {
        method: 'DELETE'
    });
    if(!response.ok){
        throw Error(`Error ${response.url} ${response.statusText}`);
    }
    
    window.location.href = '/frontend/index.html';
}