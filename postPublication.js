


function createPublicationElements() {


    // Obtener el nombre de usuario del selector
    const nftusername = document.getElementById('selector_NFTs').value;



    getImageNFTUsername("publication-post-container");

    const container = document.getElementById('publication-post-container');
    container.innerHTML = '';
    
    const form = document.createElement('form');

    // Textarea
    const textareaDiv = document.createElement('div');
    textareaDiv.classList.add('form-group');
    const textarea = document.createElement('textarea');
    textarea.classList.add('form-control');
    textarea.id = 'publicacion';
    textarea.rows = '3';
    textarea.placeholder = `"${nftusername}" ¿Que quieres publicar hoy?`;
    textarea.required = true;
    textarea.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; margin-bottom: 10px; height: 160px; font-size: 18px;';
    textareaDiv.appendChild(textarea);
    form.appendChild(textareaDiv);

    // Controls container
    const controlsDiv = document.createElement('div');
    controlsDiv.style.cssText = 'display: flex; align-items: center;';

    const selectDiv = document.createElement('div');
    selectDiv.classList.add('form-group');
    const select = document.createElement('select');
    select.classList.add('form-control');
    select.id = 'filter-privacidad';
    select.innerHTML = '<option>*</option><option>>12</option><option>>18</option>';
    select.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; margin-bottom: 10px; height: 40px;';
    selectDiv.appendChild(select);
    controlsDiv.appendChild(selectDiv);

    // Image button
    const button = document.createElement('button');
    button.setAttribute('data-toggle', 'collapse');
    button.setAttribute('data-target', '#demo');
    button.innerHTML = '<span class="glyphicon glyphicon-picture"></span>';
    button.style.cssText = 'margin-left: 20px; margin-bottom: 10px;';
    controlsDiv.appendChild(button);

    // Character count
    const charCount = document.createElement('h4');
    charCount.innerHTML = '<font color="red"><p id="char-count" style="display:inline-block; margin-left: 30px;"></p></font>';
    controlsDiv.appendChild(charCount);

    // Submit button
    const submitLink = document.createElement('a');
    submitLink.href = '#';
    submitLink.id = 'btn-publication';
    submitLink.style.cssText = 'padding: 10px 20px; font-size: 16px; background-color: black; color: white; border: 2px solid lime; border-radius: 20px; cursor: pointer;';
    submitLink.innerHTML = 'Publicar';
    controlsDiv.appendChild(submitLink);

    form.appendChild(controlsDiv);

    // Collapsible media input
    const collapseDiv = document.createElement('div');
    collapseDiv.id = 'demo';
    collapseDiv.classList.add('collapse');
    const mediaInput = document.createElement('input');
    mediaInput.type = 'text';
    mediaInput.id = 'media-publication';
    mediaInput.placeholder = 'Link to media publication';
    mediaInput.style.cssText = 'border: 2px solid black; border-radius: 20px; width: 100%; margin-bottom: 10px; height: 40px;';
    collapseDiv.appendChild(mediaInput);
    form.appendChild(collapseDiv);

    container.appendChild(form);

    // Loading animation
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingAnimation-publication';
    loadingDiv.style.display = 'none';
    loadingDiv.innerHTML = '<div class="spinner"></div>';
    container.appendChild(loadingDiv);
}

// Call function to generate elements when needed
createPublicationElements();