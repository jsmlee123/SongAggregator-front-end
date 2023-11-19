import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchBar from "../SearchBar";

function Results() {
    const { searchCriteria } = useParams();
    return (
        <div className="d-flex ">
            <SearchBar search={searchCriteria} /> 
            <div>
                {searchCriteria}
            </div>
            
        </div>
    )
}

export default Results;