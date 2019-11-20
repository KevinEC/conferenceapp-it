import React from "react";

export const DisplayRoom = (props) => {
    return(
        <>
            <div className="ui container">
                <div className="ui grid">
                    <div className="row">
                        <div className="column">
                            <h1>
                                {props.roomNumber}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
