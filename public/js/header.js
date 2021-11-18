'use strict';

const classNavList = document.getElementById('classNavList');
if (classNavList) {
    // todo: retrieve list of classes from database and add accordingly
}

function addClass(className) {
    const li = document.createElement('li');
    li.classList.add('nav-item');
    const a = document.createElement('a');
    a.classList.add('nav-link');
    a.appendChild(document.createTextNode(className));
    li.append(a);
    classNavList.append(li);
}