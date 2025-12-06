// // // src/app.js
// // import { signIn, getUser } from './auth';
// // import { getUserFragments, createUserFragment } from './api';

// // async function init() {
 
// //   const userSection = document.querySelector('#user');
// //   const loginBtn = document.querySelector('#login');
// //   //const logoutBtn = document.querySelector('#logout');
// //   const fragmentsSection = document.querySelector('#fragments');
// //   const fragmentInput = document.querySelector('#fragment-input');
// //   const fragmentTypeSelect = document.querySelector('#fragment-type'); // new drop-down
// //   const createFragmentBtn = document.querySelector('#create-fragment');
// //   const fragmentsOutput = document.querySelector('#fragments-output');

  
// //   loginBtn.onclick = () => signIn();
  

  
// //   const user = await getUser();
// //   if (!user) {
// //     userSection.hidden = true;
    
// //     fragmentsSection.hidden = true;
// //     return;
// //   }
  
// //   userSection.hidden = false;  
// //   loginBtn.style.display = 'none'; 
// //   fragmentsSection.hidden = false;
  
// //   userSection.querySelector('.username').innerText = user.username;

  
// //   createFragmentBtn.onclick = async () => {
// //     const content = fragmentInput.value.trim();
// //     const type = fragmentTypeSelect.value; // get selected type
// //     if (!content) {
// //       alert('Please enter some text before creating a fragment.');
// //       return;
// //     }

// //     try {
// //       const newFragment = await createUserFragment(user, content, type);
// //       console.log('Created fragment:', newFragment);

      
// //       const updatedFragments = await getUserFragments(user);
// //       renderFragments(updatedFragments, fragmentsOutput);
// //       fragmentInput.value = '';
// //     } catch (err) {
// //       console.error('Failed to create fragment:', err);
// //       alert('Error creating fragment, check console.');
// //     }
// //   };

  
// //   try {
// //     const fragments = await getUserFragments(user);    
// //     renderFragments(fragments, fragmentsOutput);
// //   } catch (err) {
// //     console.error('Failed to fetch fragments:', err);
// //   }
// // }

// // function renderFragments(fragments, container) {
// //   container.innerHTML = '';
// //   if (!fragments || fragments.length === 0) {
// //     container.innerHTML = '<p> No fragments found </p>';
// //     return;
// //   }

// //    const table = document.createElement('table');
// //   table.innerHTML = `
// //     <thead>
// //       <tr>
// //         <th>ID</th>
// //         <th>Type</th>
// //         <th>Size (bytes)</th>
// //       </tr>
// //     </thead>
// //     <tbody>
// //       ${fragments.map(frag => `
// //         <tr>
// //           <td>${frag.id}</td>
// //           <td>${frag.type}</td>
// //           <td>${frag.size}</td>
// //         </tr>
// //       `).join('')}
// //     </tbody>
// //   `;
// //   container.appendChild(table);
// // }

// // addEventListener('DOMContentLoaded', init);


// // src/app.js
// import { signIn, getUser } from './auth';
// import { getUserFragments, createUserFragment } from './api';
// import { API_BASE_URL } from './api';

// async function init() {
//   const userSection = document.querySelector('#user');
//   const loginBtn = document.querySelector('#login');
//   const fragmentsSection = document.querySelector('#fragments');

//   const fragmentInput = document.querySelector('#fragment-input');
//   const fragmentTypeSelect = document.querySelector('#fragment-type');
//   const createFragmentBtn = document.querySelector('#create-fragment');
//   const fragmentsOutput = document.querySelector('#fragments-output');

//   // File upload elements
//   const dropZone = document.querySelector('#drop-zone');
//   const fileInput = document.querySelector('#file-input');
//   const uploadBtn = document.querySelector('#upload-file-btn');

//   loginBtn.onclick = () => signIn();

//   const user = await getUser();
//   if (!user) {
//     userSection.hidden = true;
//     fragmentsSection.hidden = true;
//     return;
//   }

//   // Logged in
//   userSection.hidden = false;
//   loginBtn.style.display = 'none';
//   fragmentsSection.hidden = false;
//   userSection.querySelector('.username').innerText = user.username;

//   // ==============================
//   // CREATE TEXT / JSON FRAGMENT
//   // ==============================
//   createFragmentBtn.onclick = async () => {
//     const content = fragmentInput.value.trim();
//     const type = fragmentTypeSelect.value;

//     if (!content) {
//       alert('Please enter some text before creating a fragment.');
//       return;
//     }

//     try {
//       await createUserFragment(user, content, type);

//       const updatedFragments = await getUserFragments(user);
//       renderFragments(updatedFragments, fragmentsOutput);
//       fragmentInput.value = '';
//     } catch (err) {
//       console.error('Failed to create fragment:', err);
//       alert('Error creating fragment, check console.');
//     }
//   };

//   // ==============================
//   // FILE UPLOAD + DRAG / DROP
//   // ==============================
//   if (dropZone && fileInput && uploadBtn) {

//     // Clicking drop zone → open picker
//     dropZone.addEventListener('click', () => fileInput.click());

//     // Prevent default browser behavior
//     ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//       dropZone.addEventListener(eventName, (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//       });
//     });

//     // Visual feedback
//     dropZone.addEventListener('dragover', () => {
//       dropZone.style.backgroundColor = '#e9ecef';
//     });

//     dropZone.addEventListener('dragleave', () => {
//       dropZone.style.backgroundColor = '#f8f9fa';
//     });

//     // HANDLE DROPPED FILE
//     dropZone.addEventListener('drop', (e) => {
//       dropZone.style.backgroundColor = '#f8f9fa';

//       const droppedFile = e.dataTransfer.files[0];
//       if (!droppedFile) return;

//       // Instead of assigning to fileInput.files (DISALLOWED),
//       // we manually upload the dropped file:
//       uploadFile(droppedFile, user, fragmentsOutput);
//     });

//     // HANDLE FILE-INPUT SELECTION
//     fileInput.addEventListener('change', () => {
//       if (!fileInput.files.length) return;
//       const file = fileInput.files[0];
//       // ✅ Put it RIGHT HERE
//   console.log("Uploading:", file.type);
//       uploadFile(file, user, fragmentsOutput);
//     });

//     // UPLOAD BUTTON (manual trigger)
//     uploadBtn.addEventListener('click', () => fileInput.click());
//   }

//   // Initial load
//   try {
//     const fragments = await getUserFragments(user);
//     renderFragments(fragments, fragmentsOutput);
//   } catch (err) {
//     console.error('Failed to fetch fragments:', err);
//   }
// }

// // ==============================
// // SHARED UPLOAD FUNCTION
// // ==============================
// async function uploadFile() {
//   const file = document.querySelector('#fragment-input').files[0];

//   if (!file) {
//     alert('Pick a file first!');
//     return;
//   }

//   console.log('Uploading with type:', file.type);

//   const user = await getUser();

//   const res = await fetch(`${API_URL}/v1/fragments`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Basic ${user.authorization}`,
//       'Content-Type': file.type
//     },
//     body: file
//   });

//   if (!res.ok) {
//     console.error('Upload failed:', await res.text());
//     return;
//   }

//   console.log('Uploaded fragment successfully');
// }


// // ==============================
// // RENDER FRAGMENTS TABLE
// // ==============================
// function renderFragments(fragments, container) {
//   container.innerHTML = '';

//   if (!fragments || fragments.length === 0) {
//     container.innerHTML = '<p>No fragments found</p>';
//     return;
//   }

//   const table = document.createElement('table');
//   table.classList.add("fragments-table");

//   table.innerHTML = `
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Type</th>
//         <th>Size (bytes)</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${fragments
//         .map(
//           (frag) => `
//         <tr>
//           <td>${frag.id}</td>
//           <td>${frag.type}</td>
//           <td>${frag.size}</td>
//         </tr>`
//         )
//         .join('')}
//     </tbody>
//   `;

//   container.appendChild(table);
// }

// addEventListener('DOMContentLoaded', init);


// src/app.js -v2 works
// import { signIn, getUser } from './auth';
// import { getUserFragments, createUserFragment } from './api';
// import { uploadUserFile } from './api.js';

// async function init() {
//   const userSection = document.querySelector('#user');
//   const loginBtn = document.querySelector('#login');
//   const fragmentsSection = document.querySelector('#fragments');

//   const fragmentInput = document.querySelector('#fragment-input');
//   const fragmentTypeSelect = document.querySelector('#fragment-type');
//   const createFragmentBtn = document.querySelector('#create-fragment');
//   const fragmentsOutput = document.querySelector('#fragments-output');

//   // File upload elements
//   const dropZone = document.querySelector('#drop-zone');
//   const fileInput = document.querySelector('#file-input');
//   const uploadBtn = document.querySelector('#upload-file-btn');

//   loginBtn.onclick = () => signIn();

//   const user = await getUser();
//   if (!user) {
//     userSection.hidden = true;
//     fragmentsSection.hidden = true;
//     return;
//   }

//   userSection.hidden = false;
//   loginBtn.style.display = 'none';
//   fragmentsSection.hidden = false;
//   userSection.querySelector('.username').innerText = user.username;

//   // ==============================
//   // CREATE TEXT / JSON FRAGMENT
//   // ==============================
//   createFragmentBtn.onclick = async () => {
//     const content = fragmentInput.value.trim();
//     const type = fragmentTypeSelect.value;

//     if (!content) {
//       alert('Please enter some text before creating a fragment.');
//       return;
//     }

//     try {
//       await createUserFragment(user, content, type);

//       const updatedFragments = await getUserFragments(user);
//       renderFragments(updatedFragments, fragmentsOutput);
//       fragmentInput.value = '';
//     } catch (err) {
//       console.error('Failed to create fragment:', err);
//       alert('Error creating fragment, check console.');
//     }
//   };

//   // ==============================
//   // FILE UPLOAD + DRAG / DROP
//   // ==============================
//   if (dropZone && fileInput && uploadBtn) {
//     dropZone.addEventListener('click', () => fileInput.click());

//     ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//       dropZone.addEventListener(eventName, e => {
//         e.preventDefault();
//         e.stopPropagation();
//       });
//     });

//     dropZone.addEventListener('dragover', () => {
//       dropZone.style.backgroundColor = '#e9ecef';
//     });

//     dropZone.addEventListener('dragleave', () => {
//       dropZone.style.backgroundColor = '#f8f9fa';
//     });

//     dropZone.addEventListener('drop', e => {
//       dropZone.style.backgroundColor = '#f8f9fa';

//       const droppedFile = e.dataTransfer.files[0];
//       if (!droppedFile) return;

//       uploadFile(droppedFile, user, fragmentsOutput);
//     });

//     fileInput.addEventListener('change', () => {
//       if (!fileInput.files.length) return;
//       const file = fileInput.files[0];
//       uploadFile(file, user, fragmentsOutput);
//     });

//     uploadBtn.addEventListener('click', () => fileInput.click());
//   }

//   // Initial load
//   try {
//     const fragments = await getUserFragments(user);
//     renderFragments(fragments, fragmentsOutput);
//   } catch (err) {
//     console.error('Failed to fetch fragments:', err);
//   }
// }

// // ==============================
// // SHARED UPLOAD FUNCTION
// // ==============================

// // Example function to handle file uploads
// async function uploadFile(file, user, fragmentsOutput) {
//   if (!file) return;

//   try {
//     console.log('Uploading file:', file.name, 'Type:', file.type, 'Size:', file.size);

//     // Convert the File (Blob) into an ArrayBuffer
//     const arrayBuffer = await file.arrayBuffer();

//     // Create fragment with the correct MIME type
//     const newFragment = await createUserFragment(user, arrayBuffer, file.type);

//     console.log('Uploaded file fragment:', newFragment);

//     // Refresh and render updated fragments list
//     const updatedFragments = await getUserFragments(user);
//     renderFragments(updatedFragments, fragmentsOutput);

//   } catch (err) {
//     console.error('Upload failed:', err);
//     alert('Failed to upload file. Check console.');
//   }
// }



// // ==============================
// // RENDER FRAGMENTS TABLE
// // ==============================
// function renderFragments(fragments, container) {
//   container.innerHTML = '';

//   if (!fragments || fragments.length === 0) {
//     container.innerHTML = '<p>No fragments found</p>';
//     return;
//   }

//   const table = document.createElement('table');
//   table.classList.add("fragments-table");

//   table.innerHTML = `
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Type</th>
//         <th>Size (bytes)</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${fragments
//         .map(
//           frag => `
//         <tr>
//           <td>${frag.id}</td>
//           <td>${frag.type}</td>
//           <td>${frag.size}</td>
//         </tr>`
//         )
//         .join('')}
//     </tbody>
//   `;

//   container.appendChild(table);
// }

// addEventListener('DOMContentLoaded', init);

//v3 
// src/app.js
import { signIn, getUser } from './auth';
import {
  getUserFragments,
  createUserFragment,
  deleteUserFragment,
  updateUserFragment,
  getUserFragment
} from './api';

async function init() {
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const fragmentsSection = document.querySelector('#fragments');

  const fragmentInput = document.querySelector('#fragment-input');
  const fragmentTypeSelect = document.querySelector('#fragment-type');
  const createFragmentBtn = document.querySelector('#create-fragment');
  const fragmentsOutput = document.querySelector('#fragments-output');

  // File upload UI
  const dropZone = document.querySelector('#drop-zone');
  const fileInput = document.querySelector('#file-input');
  const uploadBtn = document.querySelector('#upload-file-btn');

  loginBtn.onclick = () => signIn();

  const user = await getUser();
  if (!user) {
    userSection.hidden = true;
    fragmentsSection.hidden = true;
    return;
  }

  userSection.hidden = false;
  loginBtn.style.display = 'none';
  fragmentsSection.hidden = false;
  userSection.querySelector('.username').innerText = user.username;

  // ==============================
  // CREATE TEXT FRAGMENT
  // ==============================
  createFragmentBtn.onclick = async () => {
    const content = fragmentInput.value.trim();
    const type = fragmentTypeSelect.value;

    if (!content) {
      alert('Please enter text.');
      return;
    }

    try {
      await createUserFragment(user, content, type);
      renderFragments(await getUserFragments(user), fragmentsOutput);
      fragmentInput.value = '';
    } catch (err) {
      console.error(err);
      alert('Failed to create fragment.');
    }
  };

  // ==============================
  // DRAG / DROP + FILE UPLOAD
  // ==============================
  if (dropZone && fileInput && uploadBtn) {
    dropZone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
      dropZone.addEventListener(ev, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    dropZone.addEventListener('dragover', () => {
      dropZone.style.backgroundColor = '#e9ecef';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.backgroundColor = '#f8f9fa';
    });

    dropZone.addEventListener('drop', e => {
      dropZone.style.backgroundColor = '#f8f9fa';
      const dropped = e.dataTransfer.files[0];
      if (dropped) uploadFile(dropped, user, fragmentsOutput);
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length)
        uploadFile(fileInput.files[0], user, fragmentsOutput);
    });

    uploadBtn.addEventListener('click', () => fileInput.click());
  }

  // Initial load
  try {
    renderFragments(await getUserFragments(user), fragmentsOutput);
  } catch (err) {
    console.error('Failed to fetch fragments:', err);
  }
}

// ==============================
// UPLOAD FILE
// ==============================
async function uploadFile(file, user, fragmentsOutput) {
  if (!file) return;

  try {
    console.log('Uploading:', file.name, file.type);

    const arrayBuffer = await file.arrayBuffer();
    await createUserFragment(user, arrayBuffer, file.type);

    renderFragments(await getUserFragments(user), fragmentsOutput);
  } catch (err) {
    console.error('Upload failed:', err);
    alert('Upload failed, check console.');
  }
}

// ==============================
// UPDATE EXISTING FRAGMENT (PUT)
// ==============================
async function updateFragment(id, oldType, user) {
  // Text update mode
  if (oldType.startsWith('text/')) {
    const newContent = prompt('Enter new content to replace fragment:');
    if (!newContent) return;

    try {
      await updateUserFragment(user, id, newContent, oldType);
      renderFragments(await getUserFragments(user), document.querySelector('#fragments-output'));
    } catch (err) {
      console.error(err);
      alert('Failed to update fragment.');
    }
    return;
  }

  // File replace mode
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  fileInput.onchange = async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    try {
      await updateUserFragment(user, id, arrayBuffer, file.type);
      renderFragments(await getUserFragments(user), document.querySelector('#fragments-output'));
    } catch (err) {
      console.error(err);
      alert('Failed to update fragment.');
    }
  };

  fileInput.click();
}

// ==============================
// RENDER TABLE
// ==============================
// function renderFragments(fragments, container) {
//   container.innerHTML = '';

//   if (!fragments.length) {
//     container.innerHTML = '<p>No fragments found</p>';
//     return;
//   }

//   const user = getUser(); // async would complicate, trust cache

//   const table = document.createElement('table');
//   table.classList.add('fragments-table');

//   table.innerHTML = `
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Type</th>
//         <th>Size</th>
//         <th>Created</th>
//         <th>Updated</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${fragments
//         .map(
//           frag => `
//         <tr>
//           <td>${frag.id}</td>
//           <td>${frag.type}</td>
//           <td>${frag.size}</td>
//           <td>${new Date(frag.created).toLocaleString()}</td>
//           <td>${new Date(frag.updated).toLocaleString()}</td>
//           <td>
//             <button class="update-btn" data-id="${frag.id}" data-type="${frag.type}">Update</button>
//             <button class="delete-btn" data-id="${frag.id}">Delete</button>
//           </td>
//         </tr>`
//         )
//         .join('')}
//     </tbody>
//   `;

//   container.appendChild(table);

//   // ADD EVENT LISTENERS FOR BUTTONS
//   document.querySelectorAll('.delete-btn').forEach(btn =>
//     btn.addEventListener('click', async e => {
//       const id = e.target.dataset.id;
//       if (!confirm('Delete this fragment?')) return;

//       try {
//         await deleteUserFragment(await getUser(), id);
//         renderFragments(await getUserFragments(await getUser()), container);
//       } catch (err) {
//         alert('Delete failed.');
//         console.error(err);
//       }
//     })
//   );

//   document.querySelectorAll('.update-btn').forEach(btn =>
//     btn.addEventListener('click', async e => {
//       const id = e.target.dataset.id;
//       const type = e.target.dataset.type;
//       updateFragment(id, type, await getUser());
//     })
//   );
// }

function renderFragments(fragments, container) {
  container.innerHTML = '';

  if (!fragments.length) {
    container.innerHTML = '<p>No fragments found</p>';
    return;
  }

  const table = document.createElement('table');
  table.classList.add('fragments-table');

  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>Size</th>
        <th>Created</th>
        <th>Updated</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${fragments.map(frag => `
        <tr>
          <td>
            <a href="viewer.html?fragment=${frag.id}"
               class="fragment-link">
               ${frag.id}
            </a>
          </td>

          <td>${frag.type}</td>

          <td>${frag.size}</td>

          <td>${new Date(frag.created).toLocaleString()}</td>

          <td>${new Date(frag.updated).toLocaleString()}</td>

          <td>
            <button class="view-btn" data-id="${frag.id}" data-type="${frag.type}">View</button>

            <button class="update-btn" 
                    data-id="${frag.id}" 
                    data-type="${frag.type}">
              Update
            </button>

            <button class="delete-btn" 
                    data-id="${frag.id}">
              Delete
            </button>
          </td>
        </tr>`).join('')}
    </tbody>
  `;

  container.appendChild(table);

  // DELETE BUTTON HANDLER
  document.querySelectorAll('.delete-btn').forEach(btn =>
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      if (!confirm('Delete this fragment?')) return;

      try {
        await deleteUserFragment(await getUser(), id);
        renderFragments(await getUserFragments(await getUser()), container);
      } catch (err) {
        console.error(err);
        alert('Delete failed.');
      }
    })
  );

  // UPDATE BUTTON HANDLER
  document.querySelectorAll('.update-btn').forEach(btn =>
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      const type = e.target.dataset.type;
      updateFragment(id, type, await getUser());
    })
  );

// VIEW BUTTON HANDLER

//in page image (no ext ??)
// document.querySelectorAll('.view-btn').forEach(btn =>
//   btn.addEventListener('click', async (e) => {
//     console.log("trying to getUserFragment1");
//     const id = e.target.dataset.id;
//     const user = await getUser();
//     const contentDiv = document.getElementById('fragments-output'); // or dedicated div

//     try {
//       console.log("trying to getUserFragment2");
//       const { data, type } = await getUserFragment(user, id);

//       if (type.startsWith('image/')) {
//         const url = URL.createObjectURL(data);
//         contentDiv.innerHTML = `<img src="${url}" style="max-width:100%; display:block; margin:auto">`;
//         return;
//       }

//       if (type === 'text/markdown') {
//         contentDiv.innerHTML = marked.parse(data);
//         return;
//       }

//       if (type === 'application/json') {
//         contentDiv.textContent = JSON.stringify(data, null, 2);
//         return;
//       }

//       contentDiv.textContent = data; // plain text
//     } catch (err) {
//       console.error(err);
//       contentDiv.textContent = 'Error loading fragment.';
//     }
//   })
// );
//new page (doesnt work)
// document.querySelectorAll('.view-btn').forEach(btn =>
//   btn.addEventListener('click', async (e) => {
//     const id = e.target.dataset.id;
//     const type = e.target.dataset.type;

//     // Ask the user which format they want
//     let ext = '';
//     if (type.startsWith('image/')) {
//       ext = prompt('Enter image extension (png, jpeg, webp, gif):', 'jpeg');
//     } else if (type === 'text/markdown') {
//       ext = prompt('Enter extension (md, html, txt):', 'html');
//     } else if (type === 'application/json') {
//       ext = prompt('Enter extension (json, txt):', 'json');
//     } else {
//       ext = prompt('Enter extension (txt recommended):', 'txt');
//     }

//     if (!ext) return;
//     const API_BASE_URL = 'http://fragments-lb-2056188198.us-east-1.elb.amazonaws.com'
//     // Open in a new tab using the backend conversion
//     const url = `${API_BASE_URL}/v1/fragments/${id}.${ext}`;
//     window.open(url, '_blank');
//   })
// );

// VIEW BUTTON HANDLER (NEw-prof)
// VIEW BUTTON HANDLER - inline modal approach
document.querySelectorAll('.view-btn').forEach(btn =>
  btn.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    const type = e.target.dataset.type;
    const user = await getUser();
    if (!user) return alert('Not logged in');

    // Ask for optional conversion if needed
    let ext = '';
    if (type.startsWith('image/')) {
      ext = prompt('Enter image extension to convert (png, jpeg, webp, gif, avif):', type.split('/')[1]);
    } else if (type === 'text/markdown') {
      ext = prompt('Enter extension (md, html, txt):', 'html');
    } else if (type === 'application/json') {
      ext = prompt('Enter extension (json, txt):', 'txt');
    } else if (type === 'text/html') {
      ext = prompt('Enter extension (html, txt):', 'txt');
    }else {
      ext = 'txt';
    }

    try {

      const API_BASE_URL = 'http://fragments-lb-2056188198.us-east-1.elb.amazonaws.com';

const res = await fetch(`${API_BASE_URL}/v1/fragments/${id}.${ext}`, {
  headers: user.authorizationHeaders(),
});

      

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const container = document.getElementById('viewer-container');
      const content = document.getElementById('viewer-content');

      // Clear previous content
      content.innerHTML = '';

      if (blob.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = blobUrl;
        img.style.maxWidth = '100%';
        img.style.display = 'block';
        img.style.margin = 'auto';
        content.appendChild(img);
      } else if (blob.type === 'text/markdown') {
        const text = await blob.text();
        //const div = document.createElement('div');

        const pre = document.createElement('pre');
        pre.textContent = text;
        content.appendChild(pre);
        //console.log(text,'zzz');
        //div.innerHTML = JSON.stringify(text);
        //content.appendChild(div);
      } else if (blob.type === 'application/json') {
        const text = await blob.text();
        const pre = document.createElement('pre');
        pre.textContent = JSON.stringify(JSON.parse(text), null, 2);
        content.appendChild(pre);
      } else {
        const text = await blob.text();
        const pre = document.createElement('pre');
        pre.textContent = text;
        content.appendChild(pre);
      }

      // Show modal
      container.style.display = 'block';

    } catch (err) {
      console.error(err);
      alert('Failed to load fragment: ' + err.message);
    }
  })
);

// CLOSE VIEWER BUTTON
document.getElementById('close-viewer').addEventListener('click', () => {
  document.getElementById('viewer-container').style.display = 'none';
  document.getElementById('viewer-content').innerHTML = '';
});


}


addEventListener('DOMContentLoaded', init);
