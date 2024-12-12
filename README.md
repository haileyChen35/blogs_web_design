# user interface web design project 

# blogs webside 

## Overview 

Clients are able to filter, add and edit the blogs. Clients are able to view correspond page by clicking the pagination. Blogs are sorted in descending order based on blog date. 

## Features:

1. **Pagination**
    page loads correspond page of blogs by clicking on pagination button.
2. **Add, Remove, Edit**
    clients can add a new blog, remove the existing blog, or edit the existing blog. 
3. **Filter**
    blogs can be filterd by entering search content, and always jump to the first page. 
4. **Error Message**
    the project has specific CSS and HTML to the error message. If server breaks or blog id is non-exist, the page loads the error message box. 
5. **Blog Details**
    Clients are able to read more details to blog by clicking blox box. 

## Prerequisites

- **Development Environment:** json-server version 0.17.4
    to download it, command on terminal: 
```
npm uninstall -g json-server
npm install -g json-server@0.17.4
```
- **Language:** HTML, CSS, JavaScript.  
- **IDE:** Visual Studio (recommended).  

## Command to connect server

```
cd server
```
```
json-server --watch db.json
```
