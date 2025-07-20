// const { createElement } = require("react");

const formbuilder = document.getElementById('form-builder');
let submitButton = null;

const draggables = document.querySelectorAll('.draggable');

draggables.forEach(draggable =>{
  draggable.addEventListener('dragstart', dragStart)
})


formbuilder.addEventListener('dragover', dragOver);
formbuilder.addEventListener('drop', drop);

function dragStart(e){
  e.dataTransfer.setData('type', e.target.getAttribute('data-type'));
}

function dragOver(e){
  e.preventDefault();
}

function drop(e){
  e.preventDefault();
  const type = e.dataTransfer.getData('type');

  let newElement;
  switch (type){
    // case 'text':
    //   newElement = createEditableTextInput();

    case 'big-heading':
      newElement = createText('bigHead');
      break;

    case 'small-heading':
      newElement = createText('smallHead');
      break;

    case 'paragraph':
      newElement = createText('paragraph');
      break;

    case 'text':
      newElement = createEditableTextInput('textinput');
      break;
    
    case 'textarea':
      newElement = createEditableTextInput('textarea');
      break;
    
    case 'select':
      newElement = createEditableMCQ('select');
      break;

    case 'radio':
      newElement = createEditableMCQ('radio');
      break;
    
    case 'checkbox':
      newElement = createEditableMCQ('checkbox');
      break;

    default: 
      break;
  }

  if(newElement){
    formbuilder.appendChild(newElement);
    makeElementDraggable(newElement);
    toggleSubmitButton();
  }

  // console.log(formbuilder);
}



function createText(type){
  const div = document.createElement('div');
  div.setAttribute('draggable', true);
  div.classList.add(`${type}Div`);

  const labelInput = document.createElement('input');
  labelInput.type='text';
  labelInput.classList.add(`${type}Input`);
  labelInput.value = '--Change this Big Heading--';
  if(type == 'smallHead') labelInput.value = '--Change this Small Heading--';
  if(type == 'paragraph') labelInput.value = '--Change this Paragraph--'

  div.appendChild(labelInput);
  const deleteButton = createDeleteButton();
  div.appendChild(deleteButton);

  return div;
}

// function createSmallHeading(){
//   const div = document.createElement('div');
//   div.setAttribute('draggable', true);
//   div.classList.add('smallHeadDiv');

//   const labelInput = document.createElement('input');
//   labelInput.type='text';
//   labelInput.classList.add('smallHeadInput');
//   labelInput.value = '--Change this Small Heading--';

//   div.appendChild(labelInput);
//   const deleteButton = createDeleteButton();
//   div.appendChild(deleteButton);

//   return div;
// }

// function createParagraph(){
//   const div = document.createElement('div');
//   div.setAttribute('draggable', true);
//   div.classList.add('paragraphDiv');

//   const labelInput = document.createElement('input');
//   labelInput.type='text';
//   labelInput.classList.add('paragraphInput');
//   labelInput.value = '--Change this Paragraph--';

//   div.appendChild(labelInput);
//   const deleteButton = createDeleteButton();
//   div.appendChild(deleteButton);

//   return div;
// }

function createEditableTextInput(type){
  if(type == 'textarea'){
    divname = 'textAreaDiv';
  }else{
    divname = 'textInputDiv';
  }

  const div = document.createElement('div');
  div.setAttribute('draggable', true);
  div.classList.add('form-element', divname);

  /**input for admin i.e the question */
  const labelInput = document.createElement('input');
  labelInput.type='text';
  labelInput.classList.add('label-edit');
  labelInput.value = 'Edit this '+ type +' label--';

  /**answer for user */
  let inputElement = document.createElement('input');
  if(type == 'textarea'){
    inputElement = document.createElement('textarea');
  }
  inputElement.type ='text';
  inputElement.placeholder = 'Sample Field (non-editable)';
  inputElement.disabled = true;

  div.appendChild(labelInput);
  div.appendChild(inputElement);
  const deleteButton = createDeleteButton();
  div.appendChild(deleteButton);

  return div;
}

// function createEditableTextArea(){
//   const div = document.createElement('div');
//   div.setAttribute('draggable', true);
//   div.classList.add('form-element', 'textAreaDiv');

//   const labelInput = document.createElement('input');
//   labelInput.type='text';
//   labelInput.classList.add('label-edit');
//   labelInput.value = '--Text Area Label--';

//   const inputElement = document.createElement('textarea');
//   inputElement.type ='text';
//   inputElement.placeholder = 'Sample Field (non-editable)';
//   inputElement.disabled = true;

//   div.appendChild(labelInput);
//   div.appendChild(inputElement);
//   const deleteButton = createDeleteButton();
//   div.appendChild(deleteButton);

//   return div;
// }

function createEditableMCQ(type){
  let divname = 'SelectDiv'
  if(type == 'radio') divname = 'RadioDiv';
  if(type == 'checkbox') divname = 'CheckBoxDiv';

  const div = document.createElement('div');
  div.setAttribute('draggable', true);
  div.classList.add('form-element', divname);

  const labelInput = document.createElement('input');
  labelInput.type = 'text';
  labelInput.classList.add('label-edit');
  labelInput.value = type.toUpperCase() + ' LABEL';

  const optionsContainer = document.createElement('div');
  optionsContainer.classList.add('options-container');

  const option1 = createOption('Option 1');
  const option2 = createOption('Option 2');

  optionsContainer.appendChild(option1);
  optionsContainer.appendChild(option2);

  const addOptionButton = document.createElement('button');
  addOptionButton.type = 'button';
  addOptionButton.textContent = 'Add Option';

  addOptionButton.onclick = () => {
    const newOption = createOption(`Option ${optionsContainer.children.length + 1}`);
    optionsContainer.appendChild(newOption);
  }
    const deleteButton = createDeleteButton();
     
    div.appendChild(labelInput);
    div.appendChild(optionsContainer);
    div.appendChild(addOptionButton);
    div.appendChild(deleteButton);

  return div;
}

function createOption(defaultText){
  const optionDiv = document.createElement('div');
  optionDiv.classList.add('option-edit');

  const optionInput = document.createElement('input');
  optionInput.type = 'text';
  optionInput.value = defaultText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove';
  deleteButton.type = 'button';
  deleteButton.classList.add('delete-button');

  deleteButton.onclick = function(){
    optionDiv.remove();
  }

  optionDiv.appendChild(optionInput);
  optionDiv.appendChild(deleteButton);

  return optionDiv;
}

function createDeleteButton(){
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.type = 'button';
  deleteButton.classList.add('delete-button');
  deleteButton.onclick = function (){
    this.parentElement.remove();
    toggleSubmitButton();
  }
  return deleteButton;
}

function toggleSubmitButton(){
  if(formbuilder.children.length > 0){
    if(!submitButton){
      submitButton = document.createElement('button');
      submitButton.textContent = 'SUBMIT';
      submitButton.type = 'button';
      submitButton.classList.add('submit-button')
      submitButton.onclick = handleSubmit;
    }
    formbuilder.appendChild(submitButton);
  }
  else{
    submitButton.remove();
    submitButton = null;
  }
}

function handleSubmit(){
  const formData = [];

  Array.from(formbuilder.children).forEach((child) => {
    if((child.classList.contains('bigHeadDiv') && child.querySelector('.bigHeadInput')) ||
    (child.classList.contains('smallHeadDiv') && child.querySelector('.smallHeadInput')) ||
    (child.classList.contains('paragraphDiv') && child.querySelector('.paragraphInput'))
  ){
    let label = '';
    let elementType = '';

    if(child.querySelector('.bigHeadInput')){
      label = child.querySelector('.bigHeadInput').value;
      elementType = 'bigHead';
    }

    if(child.querySelector('.smallHeadInput')){
      label = child.querySelector('.smallHeadInput').value;
      elementType = 'smallHead';
    }

    else if(child.querySelector('.paragraphInput')){
      label = child.querySelector('.paragraphInput').value;
      elementType = 'paragraph';
    }

    formData.push({
      value: label,
      type: elementType
    })
  }

  if(child.classList.contains('textInputDiv') || child.classList.contains('textAreaDiv')){
    const label = child.querySelector('.label-edit').value;
    let elementType = '';
    if(child.classList.contains('textInputDiv')) elementType = 'textInput';
    if(child.classList.contains('textAreaDiv')) elementType = 'textArea';

    formData.push({
      value: label,
      type: elementType
    })
  }

  if((child.classList.contains('SelectDiv'))||
  (child.classList.contains('RadioDiv')) || 
  (child.classList.contains('CheckBoxDiv'))){
    const label = child.querySelector('.label-edit').value;
    const optionValues = [];

    const AllOptionsList = child.querySelector('.options-container');
    const options = AllOptionsList.querySelectorAll('.option-edit');
    options.forEach(option => {
      const optionValue = option.querySelector('input').value;
      optionValues.push(optionValue);
    })

    let elementType = '';
    if(child.classList.contains('SelectDiv')) elementType = 'select';
    else if(child.classList.contains('RadioDiv')) elementType = 'radio';
    else if(child.classList.contains('CheckBoxDiv')) elementType = 'checkbox';

    formData.push({
      value: label,
      type: elementType,
      options: optionValues
    })
  }

  })
  console.log(formData);

  localStorage.setItem('formData', JSON.stringify(formData));
  window.location.href = 'index1.html';
}

function makeElementDraggable(element){
  element.setAttribute('draggable', true);

  element.addEventListener('dragstart', function(e){
    e.dataTransfer.setData('draggedElementId', e.target.id);
    e.target.classList.add('dragging');
  })

  element.addEventListener('dragend', function(e){
    e.target.classList.remove('dragging');
  })

  formbuilder.addEventListener('dragover', function(e){
    e.preventDefault();

    const afterElement = getDragAfterElement(formbuilder, e.clientY);
    const draggable = document.querySelector('.dragging');

    if(afterElement == null){
      formbuilder.appendChild(draggable);
      toggleSubmitButton();
    }
    else{
      formbuilder.insertBefore(draggable, afterElement);
      toggleSubmitButton();
    }
  })
}

function getDragAfterElement(container, y){
  const draggabbleElements = [...container.querySelectorAll('.form-element:not(.dragging')];

  return draggabbleElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height/2;

    if(offset < 0 && offset > closest.offset){
      return {offset:offset, element:child};
    }
    else{
      return closest;
    }
  }, {offset : Number.NEGATIVE_INFINITY}).element;
}