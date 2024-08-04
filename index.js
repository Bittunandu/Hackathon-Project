import React from "react";

const ShowSuggestion = (props) => {
    const {suggestionsData} = props;
    return(
        <>
            <h3><u>CO<sub>2</sub> Analysis</u></h3>
            <table>
                <thead>
                    <tr>
                        <th>Object</th>
                        <th>Carbon Footprint</th>
                        <th>View Suggestions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(suggestionsData).map(key=>(
                        <tr key={key}>
                            <td>{suggestionsData[key].label}</td>
                            <td dangerouslySetInnerHTML={{ __html: suggestionsData[key]['Carbon Footprints']}}></td>
                            <td dangerouslySetInnerHTML={{ __html: suggestionsData[key]['Alternative Idea']}}></td>
                        </tr>))
                    }
                </tbody>
            </table>
        </>
    )
}

export default ShowSuggestion;