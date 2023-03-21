const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
const key = 'j9gWflgyCduUULTGmKMfahoaNAbzAULMkGGuu9jN';
const startDate = '2023-03-20';
const endDate = '2023-04-06';
const url = `${baseUrl}${key}&start_date=${startDate}&end_date=${endDate}`;

const getPictures = async () => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};

export default getPictures;