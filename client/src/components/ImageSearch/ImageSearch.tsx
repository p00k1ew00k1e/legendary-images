import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

function ImageSearch (props:{searchCallback: (search:string) => void}) {
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        props.searchCallback(searchInput);
    }, [searchInput, props.searchCallback])
    
    return (
    <TextField 
        placeholder="Search images..."
        size="small"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        slotProps={{
          htmlInput:{
            'aria-label':"Search by filename with partial matches"}}
          }
        id="search-filename" 
      />
    );
}

export default ImageSearch;