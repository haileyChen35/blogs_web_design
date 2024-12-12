/** author tag: Hailey Chen  */

"use strict";

const id = new URLSearchParams(window.location.search).get('id');
const url = `http://localhost:3000/blogs/${id}`;
let blog;

const form = document.querySelector('form');
const title = form.querySelector('#title');
const content = form.querySelector('#content');
const submitBtn = form.querySelector('button');

document.addEventListener('DOMContentLoaded', fetchBlog);

async function fetchBlog(){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        blog = await response.json();
        loadForm();
    } catch(error){
        console.log(error.message);
    }
}

function loadForm(){
    title.value = `${blog.title}`;
    content.value = `${blog.content}`;
}

form.addEventListener('submit', submitForm);

async function submitForm(e){
    if(form.reportValidity()){
        e.preventDefault();
        blog.title = `${title.value}`;
        blog.content = `${content.value}`;

        try{
            const response = await fetch(url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(blog)
            });
            if(!response.ok){
                throw Error(`Error ${response.url} ${response.statusText}`);
            }

            window.location.href = `/frontend/details.html?id=${id}`;

        }catch(error){
            
            console.log(error.message);
        }
    }
}