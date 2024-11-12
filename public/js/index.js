const deleteBtn = document.getElementById('delete');
const delId = deleteBtn.dataset.id; 

deleteBtn.addEventListener('click',()=> deleteData(delId));


async function deleteData(postId) {
    const options = {
        method: 'DELETE'
    }
    try {
        const response = await fetch(`/${postId}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } 
    } catch (error) {
        console.error('There was a problem with the delete request:', error);
    }
}


 
