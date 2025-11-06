// src/app.js
import { signIn, getUser } from './auth';
import { getUserFragments, createUserFragment } from './api';

async function init() {
 
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  const fragmentsSection = document.querySelector('#fragments');
  const fragmentInput = document.querySelector('#fragment-input');
  const createFragmentBtn = document.querySelector('#create-fragment');
  //const fragmentList = document.querySelector('#fragment-list');
  const fragmentsOutput = document.querySelector('#fragments-output');

  
  loginBtn.onclick = () => signIn();
  

  
  const user = await getUser();
  if (!user) {
    userSection.hidden = true;
    
    fragmentsSection.hidden = true;
    //fragmentList.hidden = true;
    return;
  }

  
  userSection.hidden = false;  
  loginBtn.style.display = 'none'; 
  fragmentsSection.hidden = false;
  //fragmentList.hidden = false;

  
  userSection.querySelector('.username').innerText = user.username;

  
  createFragmentBtn.onclick = async () => {
    const content = fragmentInput.value.trim();
    if (!content) {
      alert('Please enter some text before creating a fragment.');

      return;
    }

    try {
      const newFragment = await createUserFragment(user, content);
      console.log('Created fragment:', newFragment);

      
      const updatedFragments = await getUserFragments(user);
      renderFragments(updatedFragments, fragmentsOutput);
      fragmentInput.value = '';
    } catch (err) {
      console.error('Failed to create fragment:', err);
      alert('Error creating fragment, check console.');
    }
  };

  
  try {
    const fragments = await getUserFragments(user);
    
    renderFragments(fragments, fragmentsOutput);
  } catch (err) {
    console.error('Failed to fetch fragments:', err);
  }
}

function renderFragments(fragments, container) {
  container.innerHTML = '';
  if (!fragments || fragments.length === 0) {
    container.innerHTML = '<p> No fragments found </p>';
    return;
  }

  fragments.forEach((frag) => {
    const div = document.createElement('div');
     div.classList.add('fragment-item');
    div.innerHTML = `
      <p><strong>ID:</strong> ${frag.id}</p>
      <p><strong>Type:</strong> ${frag.type}</p>
      <p><strong>Size:</strong> ${frag.size} bytes</p>
      <hr>
    `;
    container.appendChild(div);
  });
}


addEventListener('DOMContentLoaded', init);