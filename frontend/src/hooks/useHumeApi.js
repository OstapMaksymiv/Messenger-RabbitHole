import axios from 'axios';

const useHumeApi = () => {

  const analyzeEmotion = async (text) => {
    try {
      const response = await axios.post('https://api.hume.ai/analyze', {
        data: { text: text },
        headers: {
          'Authorization': `CIpV0KO3MAj9ub4gKjmhnXVS9XFRJu7RfX024A9rKsRVbu2t`, 
          'Content-Type': 'application/json',
        }
      });
      return response.data;  
    } catch (error) {
      console.error('Error analyzing emotion:', error);
      throw error; 
    }
  };

  return { analyzeEmotion };
};

export default useHumeApi;