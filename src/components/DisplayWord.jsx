import axios from "axios";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
const DisplayWord = ()=>{
    const [allData, setAllData] = useState({data:[{japanese:'no word',
    english:'no word',
    id:0,
    learned:1
}]});
    const navigate = useNavigate();
    const getAllDataAPI = () =>{
        axios.get('http://localhost:4000/getAllWords/').then((response)=>{
            setAllData(response);
            console.log(response);
        });
    }

    
    const DeleteButton = ({rowId})=>{
        const deleteWord=function(){
            console.log(rowId);
            axios.post('http://localhost:4000/deleteWord/',
            {
            rowId
            },
            {headers:{"Content-Type": "application/json"}});
            getAllDataAPI();
        }
    
        return (
            <Button variant ="outlined" onClick = {deleteWord}>delete</Button>
        );
    }

    const columns = [
        {
            field: 'delete',
            width: 90,
            renderCell: (params)=> <DeleteButton rowId = {params.id}/>
        },
        { field: 'id'},
        { field: 'learned'},
        { field:'japanese'},
        { field: 'english'}
    ]
    useEffect(()=>{
        getAllDataAPI();
    },[]);
    return (
        <div>
            <button onClick={()=>{navigate('/')}}>home</button>
            <DataGrid
            rows = {allData.data}
            columns = {columns}
            sx={{width: "600px", height:"1200px", fontSize:18, border:"none"}}
            />
        </div>
        
    )
}

export default DisplayWord