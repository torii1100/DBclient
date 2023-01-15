import { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import './../App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const SendWord = () => {
  const navigate= useNavigate();
  const [sendJapanese, setSendJapanese] = useState("りんご");
  const [sendEnglish, setSendEnglish] = useState("apple");
  const [japanese, setJapanese] = useState("りんご");
  const [english, setEnglish] = useState("apple");
  const [answer, setAnswer] = useState("???");
  const [id , setID] = useState(0);

  const handleSubmit  = (e) =>{
    e.preventDefault();
    console.log(japanese);
    axios.post('http://localhost:4000/addWord/',
    {
      sendJapanese,
      sendEnglish
    },
    {headers:{"Content-Type": "application/json"}});
  }

  const changeJapanese = (e)=>{
    setSendJapanese(e.target.value);
  }

  const changeEnglish=(e)=>{
    setSendEnglish(e.target.value);
  }

  const hideJapanese = ()=>{
    setJapanese("???");
  }
  const openJapanese = ()=>{
    setAnswer(japanese);
  }

  const getWord = (e)=>{
    console.log("get word");
    axios.get('http://localhost:4000/getWord/').then((response)=>{
      console.log(response.data);
      setJapanese(response.data[0].japanese);
      setEnglish(response.data[0].english);
      setID(response.data[0].id);
    });
    hideJapanese();
  }

  const changeLearned = (e)=>{
    axios.post('http://localhost:4000/changeLearned/',
    {
      sendJapanese,
      sendEnglish,
      id,
      learned:1
    },
    {headers:{"Content-Type": "application/json"}});
    getWord();
  }

  const changeUnlearned = (e)=>{
    getWord();
  }

  useEffect( () =>{
    getWord();
  }, []);

  return (
    <Container maxWidth="sm">
      <button onClick = {()=>{navigate('/DisplayWord');}}>displayAllWords</button>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
          required
          id="outlined-required"
          label="english"
          defaultValue="apple"
          onChange = {changeEnglish}
        />
        <TextField
          required
          id="outlined-required"
          label="japanese"
          defaultValue="りんご"
          onChange = {changeJapanese}
        />
        <Button type = "submit" variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
    <Box>
    <Typography variant="h3" gutterBottom>
        {english}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {answer}
      </Typography>
      <Button variant="contained" sx ={{ m:1 }} onClick={openJapanese}>open</Button>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" size="medium" onClick={changeLearned}>
          learned
        </Button>
        <Button variant="outlined" size="medium" onClick={getWord}>
          unlearned
        </Button>
      </Stack>
    </Box>
    </Container>
  )
}

export default SendWord
