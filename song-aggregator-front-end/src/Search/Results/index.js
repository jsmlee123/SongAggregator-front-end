import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchBar from "../SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';


function Results() {
    const { searchCriteria } = useParams();
    return (
        <div className="container d-flex ">
            <SearchBar search={searchCriteria} /> 
            <div>
                {searchCriteria}
            </div>
            
        </div>
    )
}

export default Results;