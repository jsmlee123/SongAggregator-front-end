import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchBar from "../SearchBar";

function Results() {
    const { searchCriteria } = useParams();
    return (
        <div>
            <SearchBar search={searchCriteria} />
            {searchCriteria}
        </div>
    )
}

export default Results;