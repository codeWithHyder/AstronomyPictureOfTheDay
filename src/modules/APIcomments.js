const getComments = async (itemId) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO/comments?item_id=${itemId}`);
  const data = await response.json();
  return data;
};

const addComments = async (username, comment, itemID) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemID,
      username: username,
      comment: comment,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return response.text();
};

export default { getComments, addComments };